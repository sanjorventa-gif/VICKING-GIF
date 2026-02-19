@echo off
echo ===================================================
echo   INICIANDO VICKING GIF 2 (MODO DEBUG)
echo ===================================================

echo.
echo [PASO 1] Deteniendo y limpiando...
docker-compose down

echo.
echo [PASO 2] Construyendo y levantando...
echo (Esto puede tardar unos minutos la primera vez)
docker-compose up -d --build

echo.
echo [PASO 3] Mostrando logs del sistema...
echo (Presiona Ctrl+C para salir de los logs, el servidor seguira corriendo)
echo ---------------------------------------------------
docker-compose logs -f
pause
