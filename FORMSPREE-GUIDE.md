# 📧 CONFIGURATION FORMSPREE - GUIDE COMPLET

## 🎯 OBJECTIF
Transformer votre formulaire de contact en système d'envoi d'emails réel

## 📋 ÉTAPES DÉTAILLÉES

### 1️⃣ **CRÉATION DU COMPTE FORMSPREE**
```
🌐 Allez sur : https://formspree.io/
📧 Inscrivez-vous avec : bleould@gmail.com
✉️ Vérifiez votre boîte mail
```

### 2️⃣ **CRÉATION DU FORMULAIRE**
```
📝 Dans le dashboard → "New Form"
🏷️ Nommez-le : "HOUSE PAINTING Contact"
✅ Cliquez "Create Form"
```

### 3️⃣ **CONFIGURATION DE L'EMAIL**
```
⚙️ Form Settings → Notifications
📧 Ajoutez : bleould@gmail.com
💾 Sauvegardez
```

### 4️⃣ **RÉCUPÉRATION DE L'ENDPOINT**
```
🔗 Copiez l'URL dans "Your Form's Endpoint"
📄 Ressemble à : https://formspree.io/f/xxxxxxxx
```

### 5️⃣ **MISE À JOUR DU CODE**
```
📝 Ouvrez index.html
🔍 Cherchez : action="https://formspree.io/f/xpznqkgj"
✏️ Remplacez par votre endpoint
💾 Sauvegardez
```

## 🛠️ **OUTILS DISPONIBLES**

### **Guide Automatique**
- Lancez `guide-formspree.bat` pour les instructions détaillées

### **Outil de Mise à Jour**
- Lancez `update-formspree.bat` pour modifier automatiquement l'endpoint

## 📊 **FONCTIONNEMENT**

```
Utilisateur → Remplit formulaire → Clic "Envoyer"
         ↓
   Formspree → Traite données → Anti-spam
         ↓
     Email → Arrive dans bleould@gmail.com
         ↓
  Confirmation → Message vert affiché
```

## 💰 **TARIFS**
- **Gratuit** : 50 soumissions/mois
- **Premium** : $9/mois pour usage illimité

## ✅ **TEST**
Une fois configuré, testez le formulaire sur votre site !

---
**Besoin d'aide ?** Dites-moi à quelle étape vous êtes bloqué ! 🚀