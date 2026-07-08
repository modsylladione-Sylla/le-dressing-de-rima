# Guide — Ajouter ou modifier des photos, vidéos et produits

Ce site est organisé pour que tu puisses changer les produits depuis une page d'administration, sans modifier le code.

## Ajouter ou modifier un produit

1. Ouvre `admin.html` sur le site publié.
2. Renseigne le jeton administrateur.
3. Clique sur un produit existant pour le modifier, ou remplis le formulaire vide pour en ajouter un nouveau.
4. Clique sur **Enregistrer**.

Le jeton administrateur correspond à la variable d'environnement Netlify `PRODUCT_ADMIN_TOKEN`. Elle doit être configurée dans Netlify avant de pouvoir enregistrer les changements.

## Photos et vidéos

Les champs `Image` et `Vidéo` attendent un chemin de fichier, par exemple `images/robe-rouge.jpg` ou `videos/robe-rouge.mp4`.

## Où se trouve quoi

```
index.html         → le site (ne pas modifier sauf si tu sais ce que tu fais)
admin.html         → la page pour ajouter et modifier les produits
products.js        → liste de secours utilisée si l'API n'est pas encore disponible
images/            → toutes les photos des produits
videos/            → toutes les vidéos des produits
```

## Remplacer la photo d'un produit existant

1. Ouvre le dossier `images`
2. Remplace le fichier concerné (ex: `robe-wax-bogolan.jpg`) par ta propre photo, **en gardant exactement le même nom**
3. Renvoie tout le dossier sur Netlify (voir plus bas)

Si tu préfères donner un nouveau nom à ta photo, ajoute-la simplement dans `images/`, puis ouvre `products.js` et change la ligne `image: "images/ancien-nom.jpg"` par `image: "images/nouveau-nom.jpg"`.

## Ajouter une vidéo à un produit

1. Mets ta vidéo dans le dossier `videos` (format `.mp4`, fichier pas trop lourd pour charger vite)
2. Ouvre `products.js` avec un éditeur de texte (Bloc-notes, TextEdit, ou VS Code)
3. Trouve le produit concerné et change la ligne :
   ```
   video: null
   ```
   en :
   ```
   video: "videos/ma-video.mp4"
   ```
4. Quand une vidéo est présente, elle remplace automatiquement la photo sur le site et se joue en boucle sans son.

## Ajouter un nouveau produit

Dans `products.js`, repère la catégorie concernée (`habits`, `accessoires` ou `soins`) et copie un bloc existant :

```javascript
{
  nom: "Nom du produit",
  description: "Une description courte et vendeuse.",
  prix: "10 000 FCFA",
  image: "images/mon-produit.jpg",
  video: null
},
```

Colle-le juste avant le `]` qui ferme la catégorie, modifie les informations, et n'oublie pas la virgule à la fin de chaque bloc sauf le dernier.

## Supprimer un produit

Supprime tout le bloc `{ ... }` correspondant dans `products.js`, virgule comprise.

## Mise en ligne

Les produits enregistrés depuis `admin.html` sont stockés dans Netlify Database. Une fois le site déployé avec cette version, ajouter ou modifier un produit ne demande plus de redéployer le site.
