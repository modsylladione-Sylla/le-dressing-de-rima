# Guide — Ajouter ou modifier des photos, vidéos et produits

Ce site est organisé pour que tu puisses changer les produits **sans toucher au code**.

## Où se trouve quoi

```
index.html         → le site (ne pas modifier sauf si tu sais ce que tu fais)
products.js        → la liste des produits (photos, vidéos, prix, description) → C'EST ICI QUE TU TRAVAILLES
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

## Remettre le site en ligne après une modification

Comme le site est hébergé via Netlify Drop, chaque modification nécessite de renvoyer le dossier complet :

1. Va sur https://app.netlify.com/drop
2. Glisse-dépose **tout le dossier** (index.html + products.js + images + videos + les autres fichiers)
3. Netlify remplace l'ancienne version par la nouvelle

### Pour éviter de tout renvoyer à chaque fois
Si tu fais souvent des changements, il vaut mieux connecter le site à un compte Netlify (gratuit) relié à GitHub : chaque modification se met à jour automatiquement en ligne, sans glisser-déposer. Dis-le-moi si tu veux qu'on mette ça en place, c'est un peu plus long à configurer la première fois mais bien plus pratique ensuite.
