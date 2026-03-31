# Guide pour ajouter des images au site web HOUSE PAINTING SERVICES CENTER

## Configuration du formulaire de contact (IMPORTANT)

### Étape 1 : Créer un compte Formspree
1. Allez sur https://formspree.io/
2. Créez un compte gratuit
3. Vérifiez votre email

### Étape 2 : Créer un nouveau formulaire
1. Dans votre dashboard Formspree, cliquez sur "New Form"
2. Nommez-le "HOUSE PAINTING - Contact"
3. Copiez l'endpoint qui ressemble à : `https://formspree.io/f/xxxxxxxx`

### Étape 3 : Configurer l'email de destination
1. Dans les paramètres du formulaire, ajoutez votre email : `bleould@gmail.com`
2. Sauvegardez les changements

### Étape 4 : Mettre à jour le code du site
1. Ouvrez `index.html`
2. Trouvez cette ligne : `<form action="https://formspree.io/f/xpznqkgj" method="POST" id="contact-form">`
3. Remplacez `xpznqkgj` par votre propre ID de formulaire
4. Sauvegardez et testez !

### Avantages de Formspree :
- ✅ Gratuit (50 emails/mois)
- ✅ Pas de back-end nécessaire
- ✅ Sécurisé et fiable
- ✅ Interface d'administration
- ✅ Notifications par email

## Structure des images nécessaires

### Logo de l'atelier
- `logo-atelier.png` ou `logo-atelier.jpg` ou `logo-atelier.svg`
- Dimensions recommandées : 100x100px (carré)
- Format : PNG transparent préféré
- Utilisation : Header, footer, section À propos

Placez vos images dans le dossier `images/` avec les noms suivants :

### Images du portfolio (section Réalisations)
- `projet-residentiel-1.jpg` - Projet résidentiel 1
- `projet-commercial-1.jpg` - Projet commercial 1
- `projet-industriel-1.jpg` - Projet industriel 1
- `projet-decoratif-1.jpg` - Projet décoratif 1

### Images générales
- `equipe-professionnelle.jpg` - Photo de l'équipe (section Accueil)
- `atelier-professionnel.jpg` - Photo de l'atelier (section À propos)

## Formats recommandés
- **Format** : JPG ou PNG
- **Taille** :
  - Images portfolio : 800x600px minimum (ratio 4:3)
  - Images équipe/atelier : 1000x800px minimum
- **Qualité** : Haute résolution pour le web (72-96 DPI)
- **Taille fichier** : Max 2MB par image pour un chargement rapide

## Comment remplacer les placeholders

1. Ajoutez vos images dans le dossier `images/`
2. Le code HTML utilisera automatiquement les vraies images si elles portent les bons noms

## Exemple d'ajout d'image

Si vous voulez ajouter une nouvelle image dans le portfolio :

1. Placez votre image dans `images/nouvelle-image.jpg`
2. Ajoutez ce code HTML dans la section portfolio :

```html
<div class="portfolio-item">
    <img src="images/nouvelle-image.jpg" alt="Description de l'image">
    <div class="portfolio-overlay">
        <h4>Titre du projet</h4>
        <p>Description du projet</p>
    </div>
</div>
```

## Optimisation des images

Pour optimiser vos images pour le web :
- Utilisez des outils comme TinyPNG ou ImageOptim
- Compressez les images sans perdre trop de qualité
- Utilisez le format WebP si possible (support moderne)

## Alternatives aux images locales

Si vous préférez utiliser des URLs externes :
- Remplacez `src="images/image.jpg"` par `src="https://votredomaine.com/image.jpg"`
- Assurez-vous que les images sont accessibles publiquement