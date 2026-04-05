@echo off
echo ============================================
echo OUTIL DE MISE A JOUR FORMSPREE
echo ============================================
echo.
echo Collez votre endpoint Formspree ci-dessous :
echo https://formspree.io/f/xaqloaav
echo.
set /p endpoint="Endpoint Formspree: "
echo.
echo Endpoint saisi: %endpoint%
echo.
echo Recherche de l'ancien endpoint dans index.html...
echo.
findstr /C:"formspree.io/f/" "index.html"
echo.
echo Mise a jour en cours...
echo.
powershell -Command "(Get-Content index.html) -replace 'https://formspree.io/f/[^\"]*', '%endpoint%' | Set-Content index.html"
echo.
echo ✅ MISE A JOUR TERMINEE !
echo.
echo Verification :
findstr /C:"formspree.io/f/" "index.html"
echo.
echo ============================================
echo Le formulaire est maintenant configure !
echo Testez-le sur votre site web.
echo ============================================
pause
start "" "c:\Users\DELL\OneDrive\Desktop\mon premier site web\index.html#contact"