import type { Config } from "@netlify/functions";
import { asc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { products } from "../../db/schema.js";

const categories = ["habits", "accessoires", "soins"] as const;

type Category = (typeof categories)[number];

type ProductInput = {
  category?: string;
  name?: string;
  description?: string;
  price?: string;
  image?: string;
  video?: string | null;
  active?: boolean;
  position?: number;
};

const initialProducts: Array<Required<Omit<ProductInput, "active" | "video">> & { video: string | null; active: boolean }> = [
  { category: "habits", name: "Robe wax bogolan", description: "Coupe fluide, tissu wax 100% coton, doublure intérieure confortable. Disponible du S au XL.", price: "15 000 FCFA", image: "images/robe-wax-bogolan.jpg", video: null, position: 1, active: true },
  { category: "habits", name: "Ensemble deux pièces satin", description: "Haut cropped et pantalon large assortis, tombé satiné, parfait pour une sortie ou un événement.", price: "21 000 FCFA", image: "images/ensemble-satin.jpg", video: null, position: 2, active: true },
  { category: "habits", name: "Jupe crayon taille haute", description: "Coupe ajustée qui structure la silhouette, tissu extensible, fermeture éclair invisible au dos.", price: "9 500 FCFA", image: "images/jupe-crayon.jpg", video: null, position: 3, active: true },
  { category: "accessoires", name: "Parure dorée fine", description: "Collier et boucles d'oreilles assortis, plaqué or, hypoallergénique. S'accorde avec toutes les tenues.", price: "8 500 FCFA", image: "images/parure-doree.jpg", video: null, position: 1, active: true },
  { category: "accessoires", name: "Sac bandoulière tressé", description: "Fait main, anse ajustable, format idéal pour la journée. Coloris disponibles : camel, noir, bordeaux.", price: "12 000 FCFA", image: "images/sac-tresse.jpg", video: null, position: 2, active: true },
  { category: "accessoires", name: "Foulard soie imprimé", description: "Motif exclusif, se porte en cheveux, en pochette ou noué au sac. Toucher doux, teintes chaudes.", price: "6 000 FCFA", image: "images/foulard-soie.jpg", video: null, position: 3, active: true },
  { category: "soins", name: "Crème karité pure", description: "100% naturelle, nourrit intensément les peaux sèches. Sans parfum ajouté, sans paraben.", price: "6 000 FCFA", image: "images/creme-karite.jpg", video: null, position: 1, active: true },
  { category: "soins", name: "Sérum éclat vitamine C", description: "Texture légère, unifie le teint et illumine la peau au quotidien. Matin ou soir, sous crème.", price: "9 000 FCFA", image: "images/serum-vitamine-c.jpg", video: null, position: 2, active: true },
  { category: "soins", name: "Savon noir gommant", description: "Nettoie en profondeur, affine le grain de peau, s'utilise 2 à 3 fois par semaine au gant.", price: "3 500 FCFA", image: "images/savon-noir.jpg", video: null, position: 3, active: true },
];

const json = (body: unknown, init?: ResponseInit) => Response.json(body, init);

function isCategory(value: string | undefined): value is Category {
  return Boolean(value && categories.includes(value as Category));
}

function requireAdmin(req: Request) {
  const expected = process.env.PRODUCT_ADMIN_TOKEN;
  const provided = req.headers.get("x-admin-token") || "";

  if (!expected) {
    return new Response("PRODUCT_ADMIN_TOKEN is not configured", { status: 503 });
  }

  if (provided !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  return null;
}

async function seedIfEmpty() {
  const existing = await db.select({ id: products.id }).from(products).limit(1);
  if (existing.length === 0) {
    await db.insert(products).values(initialProducts);
  }
}

function serializeProduct(product: typeof products.$inferSelect) {
  return {
    id: product.id,
    category: product.category,
    nom: product.name,
    description: product.description,
    prix: product.price,
    image: product.image,
    video: product.video,
    position: product.position,
    active: product.active,
  };
}

async function listProducts(includeInactive = false) {
  await seedIfEmpty();
  const rows = await db.select().from(products).orderBy(asc(products.category), asc(products.position), asc(products.id));
  const grouped: Record<Category, ReturnType<typeof serializeProduct>[]> = {
    habits: [],
    accessoires: [],
    soins: [],
  };

  for (const row of rows) {
    if (!isCategory(row.category) || (!includeInactive && !row.active)) {
      continue;
    }

    grouped[row.category].push(serializeProduct(row));
  }

  return grouped;
}

function normalizeInput(input: ProductInput) {
  if (!isCategory(input.category)) {
    throw new Error("Catégorie invalide.");
  }

  if (!input.name?.trim()) {
    throw new Error("Le nom est obligatoire.");
  }

  return {
    category: input.category,
    name: input.name.trim(),
    description: input.description?.trim() || "",
    price: input.price?.trim() || "",
    image: input.image?.trim() || "",
    video: input.video?.trim() || null,
    active: input.active !== false,
    position: Number.isFinite(input.position) ? Number(input.position) : 0,
    updatedAt: new Date(),
  };
}

export default async (req: Request) => {
  const url = new URL(req.url);

  if (req.method === "GET") {
    const includeInactive = url.searchParams.get("admin") === "1";
    return json(await listProducts(includeInactive));
  }

  const authError = requireAdmin(req);
  if (authError) {
    return authError;
  }

  try {
    if (req.method === "POST") {
      const input = normalizeInput(await req.json());
      const [created] = await db.insert(products).values(input).returning();
      return json(serializeProduct(created), { status: 201 });
    }

    if (req.method === "PUT") {
      const id = Number(url.searchParams.get("id"));
      if (!Number.isInteger(id) || id < 1) {
        return new Response("Invalid product id", { status: 400 });
      }

      const input = normalizeInput(await req.json());
      const [updated] = await db.update(products).set(input).where(eq(products.id, id)).returning();
      if (!updated) {
        return new Response("Product not found", { status: 404 });
      }

      return json(serializeProduct(updated));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inattendue.";
    return json({ error: message }, { status: 400 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/products",
};
