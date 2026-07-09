# Guide — Ajouter ou modifier des photos, vidéos et produits

## 🆕 Nouvelle méthode recommandée : la page d'administration

Tu peux maintenant ajouter, modifier ou supprimer des produits (texte, prix, photos, vidéos) directement depuis une page web, sans éditer aucun fichier à la main.

### Étape 1 — Créer ta clé d'accès GitHub (une seule fois)

1. Connecte-toi à ton compte GitHub, va sur **https://github.com/settings/tokens?type=beta**
2. Clique **"Generate new token"**
3. Donne-lui un nom, ex: `admin-dressing-rima`
4. Dans "Repository access", choisis **"Only select repositories"** puis sélectionne uniquement `le-dressing-de-rima`
5. Dans "Permissions" → "Repository permissions", trouve **"Contents"** et choisis **"Read and write"**
6. Descends, clique **"Generate token"**
7. **Copie la clé affichée tout de suite** (elle commence par `github_pat_...`) — GitHub ne te la remontrera plus jamais après avoir quitté la page

⚠️ Garde cette clé pour toi, ne la partage avec personne : elle donne accès en écriture à ton dépôt.

### Étape 2 — Utiliser la page d'administration

1. Ouvre `https://TON-SITE.netlify.app/admin.html` (remplace par ton vrai nom de site)
2. Colle ta clé dans le champ prévu, clique **"Se connecter"**
3. Tu verras tes produits classés par catégorie à droite, et un formulaire à gauche pour en ajouter ou en modifier
4. Pour changer une photo ou une vidéo, choisis simplement le nouveau fichier — il est envoyé automatiquement, pas besoin de passer par GitHub
5. Clique **"Enregistrer"** — le site se met à jour tout seul en 1-2 minutes

Ta clé reste enregistrée dans ton navigateur : tu n'as à la coller qu'une seule fois par appareil.

---

## Méthode manuelle (si tu préfères éditer le fichier toi-même)


## Où se trouve quoi

```
index.html         → le site (ne pas modifier sauf si tu sais ce que tu fais)
products.json        → la liste des produits (photos, vidéos, prix, description) → C'EST ICI QUE TU TRAVAILLES
images/            → toutes les photos des produits
videos/            → toutes les vidéos des produits
```

## Remplacer la photo d'un produit existant

1. Ouvre le dossier `images`
2. Remplace le fichier concerné (ex: `robe-wax-bogolan.jpg`) par ta propre photo, **en gardant exactement le même nom**
3. Renvoie tout le dossier sur Netlify (voir plus bas)

Si tu préfères donner un nouveau nom à ta photo, ajoute-la simplement dans `images/`, puis ouvre `products.json` et change la ligne `image: "images/ancien-nom.jpg"` par `image: "images/nouveau-nom.jpg"`.

## Ajouter une vidéo à un produit

1. Mets ta vidéo dans le dossier `videos` (format `.mp4`, fichier pas trop lourd pour charger vite)
2. Ouvre `products.json` avec un éditeur de texte (Bloc-notes, TextEdit, ou VS Code)
3. Trouve le produit concerné et change la ligne :
   ```
   "video": null
   ```
   en :
   ```
   "video": "videos/ma-video.mp4"
   ```
4. Quand une vidéo est présente, elle remplace automatiquement la photo sur le site et se joue en boucle sans son.

## Ajouter un nouveau produit

Dans `products.json`, repère la catégorie concernée (`habits`, `accessoires` ou `soins`) et copie un bloc existant :

```json
{
  "nom": "Nom du produit",
  "description": "Une description courte et vendeuse.",
  "prix": "10 000 FCFA",
  "image": "images/mon-produit.jpg",
  "video": null
}
```

Colle-le juste avant le `]` qui ferme la catégorie, modifie les informations, et n'oublie pas la virgule à la fin de chaque bloc sauf le dernier.

## Supprimer un produit

Supprime tout le bloc `{ ... }` correspondant dans `products.json`, virgule comprise.

## Remettre le site en ligne après une modification

Comme le site est hébergé via Netlify Drop, chaque modification nécessite de renvoyer le dossier complet :

1. Va sur https://app.netlify.com/drop
2. Glisse-dépose **tout le dossier** (index.html + products.json + images + videos + les autres fichiers)
3. Netlify remplace l'ancienne version par la nouvelle

### Pour éviter de tout renvoyer à chaque fois
Si tu fais souvent des changements, il vaut mieux connecter le site à un compte Netlify (gratuit) relié à GitHub : chaque modification se met à jour automatiquement en ligne, sans glisser-déposer. Dis-le-moi si tu veux qu'on mette ça en place, c'est un peu plus long à configurer la première fois mais bien plus pratique ensuite.
