/*
  ===========================================================
  FICHIER PRODUITS — Le Dressing de Rima
  ===========================================================
  C'est ICI que tu ajoutes, modifies ou supprimes des produits.
  Tu n'as pas besoin de toucher au reste du site.

  COMMENT AJOUTER UNE PHOTO :
  1. Mets ta photo dans le dossier "images" (formats acceptés : .jpg, .png, .webp)
  2. Donne-lui un nom simple sans espace ni accent, ex: robe-rouge.jpg
  3. Écris ce nom dans le champ "image" du produit ci-dessous, ex: "images/robe-rouge.jpg"

  COMMENT AJOUTER UNE VIDEO :
  1. Mets ta vidéo dans le dossier "videos" (format .mp4 recommandé, fichier léger si possible)
  2. Écris son nom dans le champ "video", ex: "videos/robe-rouge.mp4"
  3. Si tu ne veux pas de vidéo pour ce produit, laisse "video": null
     -> Quand une vidéo est présente, elle remplace la photo sur la fiche produit
        et se joue automatiquement en boucle, sans son.

  COMMENT AJOUTER UN NOUVEAU PRODUIT :
  Copie un bloc { ... } entier, colle-le juste avant la ligne "];" de sa catégorie,
  et modifie les informations (garde bien les virgules).

  COMMENT SUPPRIMER UN PRODUIT :
  Supprime tout le bloc { ... } correspondant (de l'accolade ouvrante à la
  virgule qui suit l'accolade fermante).

  IMPORTANT : après chaque modification, il faut ré-héberger le site
  (renvoyer le dossier complet sur Netlify) pour que les changements soient
  visibles en ligne. Voir le fichier GUIDE-MODIFICATION.md pour le détail.
  ===========================================================
*/

const PRODUITS = {

  habits: [
    {
      nom: "Robe wax bogolan",
      description: "Coupe fluide, tissu wax 100% coton, doublure intérieure confortable. Disponible du S au XL.",
      prix: "15 000 FCFA",
      image: "images/robe-wax-bogolan.jpg",
      video: null
    },
    {
      nom: "Ensemble deux pièces satin",
      description: "Haut cropped et pantalon large assortis, tombé satiné, parfait pour une sortie ou un événement.",
      prix: "21 000 FCFA",
      image: "images/ensemble-satin.jpg",
      video: null
    },
    {
      nom: "Jupe crayon taille haute",
      description: "Coupe ajustée qui structure la silhouette, tissu extensible, fermeture éclair invisible au dos.",
      prix: "9 500 FCFA",
      image: "images/jupe-crayon.jpg",
      video: null
    }
  ],

  accessoires: [
    {
      nom: "Parure dorée fine",
      description: "Collier et boucles d'oreilles assortis, plaqué or, hypoallergénique. S'accorde avec toutes les tenues.",
      prix: "8 500 FCFA",
      image: "images/parure-doree.jpg",
      video: null
    },
    {
      nom: "Sac bandoulière tressé",
      description: "Fait main, anse ajustable, format idéal pour la journée. Coloris disponibles : camel, noir, bordeaux.",
      prix: "12 000 FCFA",
      image: "images/sac-tresse.jpg",
      video: null
    },
    {
      nom: "Foulard soie imprimé",
      description: "Motif exclusif, se porte en cheveux, en pochette ou noué au sac. Toucher doux, teintes chaudes.",
      prix: "6 000 FCFA",
      image: "images/foulard-soie.jpg",
      video: null
    }
  ],

  soins: [
    {
      nom: "Crème karité pure",
      description: "100% naturelle, nourrit intensément les peaux sèches. Sans parfum ajouté, sans paraben.",
      prix: "6 000 FCFA",
      image: "images/creme-karite.jpg",
      video: null
    },
    {
      nom: "Sérum éclat vitamine C",
      description: "Texture légère, unifie le teint et illumine la peau au quotidien. Matin ou soir, sous crème.",
      prix: "9 000 FCFA",
      image: "images/serum-vitamine-c.jpg",
      video: null
    },
    {
      nom: "Savon noir gommant",
      description: "Nettoie en profondeur, affine le grain de peau, s'utilise 2 à 3 fois par semaine au gant.",
      prix: "3 500 FCFA",
      image: "images/savon-noir.jpg",
      video: null
    }
  ]

};
