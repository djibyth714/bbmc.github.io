# BB MC - Site Web Officiel

Site web officiel de BB MC, ambassadeur du rap peul sénégalais.

## 🎵 À propos

BB MC est un artiste rap peul originaire de Thiemping, région de Matam au Sénégal. Avec 135 concerts au Sénégal et en Mauritanie depuis 2021 et plus de 10,6 millions de vues YouTube, il s'impose comme une figure majeure du rap peul contemporain.

## 🆕 Refonte 2026

Le site a été entièrement redessiné en octobre 2026 avec l'identité visuelle du Press-Book 2026
(noir, crème, or et terracotta · polices Anton, Manrope et Instrument Serif · frise à motifs peuls).

- `css/site-2026.css` et `js/site-2026.js` : nouveau design, menu mobile, lecteur audio, vidéos YouTube chargées au clic, visionneuse photo
- `images_BBMC/web/` : images optimisées pour le web (shooting 2026, concert Douta Seck, détourages, icônes)
- `fonts/2026/` : polices auto-hébergées (avec prise en charge des lettres peules ɓ ɗ)
- `assets/Press-Book-BB-MC-2026.pdf` : press-kit téléchargeable
- Les pages HTML sont générées par `../build_site.py` (hors dépôt) : modifier les données dans ce script puis lancer `python3 build_site.py`

Les anciennes feuilles de style du template (`style.css`, `bbmc-*.css`, `script.js`…) ne sont plus utilisées par les pages.

## 📁 Structure du projet

```
site/
├── index.html              # Page d'accueil
├── about.html              # Biographie de l'artiste
├── discographie.html       # Albums et singles
├── concerts.html           # Historique des concerts (115 concerts)
├── contacts.html           # Informations de contact
├── logo d.f.prod.jpg       # Logo principal
├── assets/                 # Fichiers média organisés
│   ├── Logo Tinddi Tiddi.pdf
│   └── QR Code lien BBMC.png
├── css/                    # Feuilles de style
│   ├── bbmc-custom.css     # Styles personnalisés BB MC
│   ├── bootstrap.css       # Framework Bootstrap
│   ├── fonts.css          # Polices et icônes
│   └── style.css          # Styles du template
├── js/                     # Scripts JavaScript
│   ├── core.min.js        # Librairies principales
│   └── script.js          # Scripts personnalisés
├── images_BBMC/           # Photos et images BB MC
├── music/                 # Fichiers audio (50 fichiers)
├── fonts/                 # Polices web
├── images/                # Images du template
└── bat/                   # Scripts PHP (contact, etc.)
```

## 🚀 Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes + Bootstrap 4
- **JavaScript** - Interactivité et animations
- **FontAwesome** - Icônes vectorielles
- **PHP** - Formulaire de contact
- **Design responsive** - Compatible mobile/desktop

## ✨ Fonctionnalités

### 🎨 Design
- Interface moderne et élégante
- Design 100% responsive
- Animations CSS fluides
- Thème couleurs BB MC (orange/bleu/or)

### 📱 Pages principales
- **Accueil** : Présentation + lecteur Spotify intégré
- **Biographie** : Histoire et parcours de BB MC
- **Discographie** : Albums "Naayi Laddé" et "Tinndi Tiiɗɗi"
- **Concerts** : 115 concerts détaillés (2021-2025)
- **Contact** : Formulaire + réseaux sociaux

### 🎵 Intégrations
- Lecteur Spotify intégré
- Galerie photos interactive
- Liens réseaux sociaux actifs
- QR Code pour partage rapide

## 🛠️ Installation

1. **Télécharger** le projet complet
2. **Placer** dans un serveur web (Apache/Nginx)
3. **Configurer** PHP pour le formulaire de contact
4. **Ouvrir** `index.html` dans un navigateur

## 🌐 Réseaux sociaux

- **YouTube** : [@bb_mc_officiel](https://www.youtube.com/@bb_mc_officiel)
- **Instagram** : [@bb_mc_officiel](https://www.instagram.com/bb_mc_officiel/)
- **Facebook** : [BB.MC.OFFICIELLE](https://www.facebook.com/BB.MC.OFFICIELLE)
- **Spotify** : [BB MC](https://artists.spotify.com/c/artist/29MqBciLksFnFCcSYz8YT8/)

## 📧 Contact

**Production** : D.F.PROD  
**Email** : bb.mc.officiel@gmail.com

---
*Site développé avec ❤️ pour BB MC - Ambassadeur du Rap Peul*
