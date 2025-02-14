@echo off
REM Sauvegarder uniquement la structure des dossiers (sans les fichiers) dans global_structure.txt
tree /A > global_structure.txt
echo La structure globale du projet a été sauvegardée dans "global_structure.txt".
pause
