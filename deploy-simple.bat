@echo off
echo ============================================
echo DEPLOIEMENT SIMPLIFIE SUR GITHUB PAGES
echo ============================================
echo.
echo Ce script va vous guider etape par etape.
echo Il reste ouvert jusqu'a la fin.
echo.
echo Appuyez sur une touche pour commencer...
pause > nul
cls
echo.
echo ETAPE 1 : VERIFICATION DES FICHIERS
echo ============================================
dir /b *.html *.css *.js 2>nul
if errorlevel 1 (
    echo ERREUR: Fichiers principaux manquants !
    echo Assurez-vous que index.html, styles.css et script.js sont presents.
    pause
    exit /b 1
)
echo.
echo ✓ Fichiers principaux trouves
echo.
echo ETAPE 2 : VERIFICATION DE GIT
echo ============================================
git --version >nul 2>&1
if errorlevel 1 (
    echo ERREUR: Git n'est pas installe !
    echo.
    echo SOLUTION:
    echo 1. Telechargez Git : https://git-scm.com/downloads
    echo 2. Installez-le
    echo 3. Relancez ce script
    echo.
    echo Ou utilisez la methode manuelle dans le guide.
    pause
    exit /b 1
)
echo ✓ Git est installe
echo.
echo ETAPE 3 : PREPARATION DU DEPOT
echo ============================================
if exist .git (
    echo ✓ Depot Git deja initialise
) else (
    echo Initialisation du depot Git...
    git init
    if errorlevel 1 (
        echo ERREUR lors de l'initialisation Git
        pause
        exit /b 1
    )
    echo ✓ Depot initialise
)
echo.
echo Ajout de tous les fichiers...
git add .
if errorlevel 1 (
    echo ERREUR lors de l'ajout des fichiers
    pause
    exit /b 1
)
echo ✓ Fichiers ajoutes
echo.
echo Creation du commit...
git commit -m "Site HOUSE PAINTING - %date% %time%" --allow-empty
if errorlevel 1 (
    echo ERREUR lors du commit
    echo (Cela peut etre normal si aucun changement)
)
echo ✓ Commit cree
echo.
echo ============================================
echo PRET POUR GITHUB !
echo ============================================
echo.
echo INSTRUCTIONS DETAILLEES :
echo.
echo 1. OUVREZ VOTRE NAVIGATEUR WEB
echo    Allez sur : https://github.com/
echo.
echo 2. CREEZ UN NOUVEAU REPOSITORY :
echo    - Cliquez le bouton vert "New repository"
echo    - Repository name : house-painting-site
echo    - Description : Site web professionnel HOUSE PAINTING
echo    - Laissez PUBLIC (gratuit)
echo    - DECOCHEZ "Add a README file"
echo    - Cliquez "Create repository"
echo.
echo 3. COPIEZ L'URL DU REPOSITORY :
echo    - Apres creation, vous verrez une URL comme :
echo      https://github.com/VOTRE-NOM/house-painting-site.git
echo    - Cliquez le bouton copie (ou Ctrl+C)
echo.
echo 4. REVENEZ ICI et collez l'URL :
echo.
:ask_url
set /p repo_url="COLLEZ L'URL ICI: "
if "%repo_url%"=="" (
    echo.
    echo URL vide ! Reessayez.
    goto ask_url
)
echo.
echo URL saisie: %repo_url%
echo.
echo ETAPE 4 : CONNEXION A GITHUB
echo ============================================
echo Suppression de l'ancien remote (si existe)...
git remote remove origin 2>nul
echo.
echo Ajout du nouveau remote...
git remote add origin "%repo_url%"
if errorlevel 1 (
    echo ERREUR: Impossible d'ajouter le remote
    echo Verifiez que l'URL est correcte
    pause
    exit /b 1
)
echo ✓ Remote ajoute
echo.
echo ETAPE 5 : ENVOI VERS GITHUB
echo ============================================
echo Envoi en cours... (patientez)
echo.
git push -u origin master 2>&1
if errorlevel 1 (
    echo.
    echo ============================================
    echo ERREUR LORS DE L'ENVOI !
    echo ============================================
    echo.
    echo CAUSES POSSIBLES :
    echo.
    echo 1. MAUVAISE URL :
    echo    - Verifiez que c'est l'URL HTTPS du repository
    echo    - Pas l'URL de la page web
    echo.
    echo 2. AUTHENTIFICATION :
    echo    - Vous devez etre connecte a GitHub
    echo    - Creez un Personal Access Token si necessaire
    echo.
    echo 3. REPOSITORY INEXISTANT :
    echo    - Verifiez que le repository existe sur GitHub
    echo.
    echo SOLUTION POUR TOKEN :
    echo 1. Allez dans GitHub Settings -^> Developer settings -^> Personal access tokens
    echo 2. Generate new token (classic)
    echo 3. Cochez "repo" (full control)
    echo 4. Copiez le token
    echo 5. Utilisez l'URL : https://TOKEN@github.com/votre-nom/repository.git
    echo.
    echo Voulez-vous reessayer avec une nouvelle URL ?
    set /p retry="O/N: "
    if /i "%retry%"=="O" goto ask_url
    echo.
    echo Annulation. Consultez le guide GITHUB-DEPLOY-GUIDE.md pour l'aide.
    pause
    exit /b 1
)
echo.
echo ============================================
echo SUCCES ! FICHIERS ENVOYES SUR GITHUB
echo ============================================
echo.
echo DERNIERES ETAPES (2 minutes) :
echo.
echo 1. ALLEZ DANS VOTRE REPOSITORY GITHUB
echo    https://github.com/votre-nom/house-painting-site
echo.
echo 2. CLIQUEZ "Settings" (icone engrenage en haut)
echo.
echo 3. DANS LE MENU GAUCHE : "Pages"
echo.
echo 4. SOUS "Source" : selectionnez "Deploy from a branch"
echo.
echo 5. SOUS "Branch" : selectionnez "master" puis "Save"
echo.
echo 6. ATTENDEZ 2-3 minutes et rafraichissez la page
echo.
echo 7. VOTRE SITE SERA ACCESSIBLE A L'ADRESSE INDIQUEE !
echo.
echo ============================================
echo FELICITATIONS !
echo ============================================
echo.
echo Votre site sera bientot en ligne a :
echo https://votre-nom.github.io/house-painting-site
echo.
echo Partagez cette adresse a vos clients !
echo.
echo Appuyez sur une touche pour ouvrir votre repository...
pause > nul
start %repo_url%
echo.
echo Script termine avec succes !
pause