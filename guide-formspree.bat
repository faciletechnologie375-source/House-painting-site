@echo off
echo ============================================
echo GUIDE DE CONFIGURATION FORMSPREE
echo ============================================
echo.
echo SUIVEZ CES ETAPES DANS VOTRE NAVIGATEUR :
echo.
echo ETAPE 1 : CREATION DU COMPTE
echo 1. Sur https://formspree.io/ cliquez "Get Started"
echo 2. Choisissez "Sign up with Email"
echo 3. Entrez votre email : bleould@gmail.com
echo 4. Creez un mot de passe
echo 5. Verifiez votre email (boite de reception)
echo.
echo ETAPE 2 : CREATION DU FORMULAIRE
echo 1. Dans le dashboard, cliquez "New Form"
echo 2. Nommez-le : "HOUSE PAINTING Contact"
echo 3. Cliquez "Create Form"
echo.
echo ETAPE 3 : CONFIGURATION DE L'EMAIL
echo 1. Dans "Form Settings" cliquez "Notifications"
echo 2. Dans "Send email notifications to" ajoutez : bleould@gmail.com
echo 3. Sauvegardez
echo.
echo ETAPE 4 : RECUPERATION DE L'ENDPOINT
echo 1. Retournez a "Form Settings"
echo 2. Copiez l'URL dans "Your Form's Endpoint"
echo    (ressemble a : https://formspree.io/f/xxxxxxxx)
echo.
echo ETAPE 5 : MISE A JOUR DU SITE
echo 1. Ouvrez index.html dans un editeur
echo 2. Cherchez : action="https://formspree.io/f/xpznqkgj"
echo 3. Remplacez "xpznqkgj" par votre ID personnel
echo 4. Sauvegardez
echo.
echo ============================================
echo EXEMPLE :
echo AVANT : action="https://formspree.io/f/xpznqkgj"
echo APRES : action="https://formspree.io/f/abc123def"
echo ============================================
echo.
pause
start "" "c:\Users\DELL\OneDrive\Desktop\mon premier site web\index.html"
echo.
echo Une fois configure, testez le formulaire !
pause