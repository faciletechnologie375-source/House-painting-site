@echo off
echo ============================================
echo DEPLOIEMENT SUR GITHUB PAGES
echo ============================================
echo.
echo Cette operation va :
echo 1. Initialiser un depot Git
echo 2. Ajouter tous vos fichiers
echo 3. Creer un commit
echo 4. Vous donner les instructions pour GitHub
echo.
echo Appuyez sur une touche pour continuer...
pause > nul
echo.
echo Initialisation du depot Git...
git init
echo.
echo Ajout de tous les fichiers...
git add .
echo.
echo Creation du commit...
git commit -m "Site web HOUSE PAINTING SERVICES CENTER"
echo.
echo ============================================
echo DEPOT GIT CREE LOCALEMENT !
echo ============================================
echo.
echo PROCHAINES ETAPES SUR GITHUB.COM :
echo.
echo 1. Creez un nouveau repository :
echo    - Cliquez "New repository"
echo    - Nommez-le : house-painting-site
echo    - NE cochez PAS "Add README"
echo    - Cliquez "Create repository"
echo.
echo 2. Copiez l'URL du depot (HTTPS)
echo    Exemple: https://github.com/votre-nom/house-painting-site.git
echo.
echo 3. Revenez ici et appuyez sur une touche...
pause > nul
echo.
echo Collez l'URL de votre depot GitHub :
set /p repo_url="URL du depot: "
echo.
echo Connexion au depot distant...
git remote add origin %repo_url%
echo.
echo Envoi vers GitHub...
git push -u origin master
echo.
echo ============================================
echo SITE ENVOYE SUR GITHUB !
echo ============================================
echo.
echo DERNIERES ETAPES SUR GITHUB.COM :
echo.
echo 1. Allez dans votre repository
echo 2. Cliquez "Settings" (en haut)
echo 3. Dans le menu gauche, cliquez "Pages"
echo 4. Dans "Source", selectionnez "Deploy from a branch"
echo 5. Dans "Branch", selectionnez "master" puis "Save"
echo.
echo 6. Attendez 2-3 minutes, rafraichissez la page
echo 7. Votre site sera accessible a l'adresse indiquee !
echo.
echo ============================================
echo VOTRE SITE SERA BIENTOT EN LIGNE !
echo ============================================
pause