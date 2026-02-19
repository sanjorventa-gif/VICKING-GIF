@echo off
echo ===================================================
echo   INICIANDO SISTEMA CON DOCKER (MODO ESTANDAR)
echo ===================================================

REM Chequear si Docker esta corriendo
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR CRITICO] Docker no parece estar funcionando.
    echo ---------------------------------------------------
    echo Causas probables:
    echo 1. Docker Desktop no esta abierto. (Busca la ballenita en tu barra de tareas)
    echo 2. No tienes Docker instalado.
    echo.
    echo Solucion:
    echo - Abre "Docker Desktop" y espera a que el icono se ponga verde/fijo.
    echo - Si no lo tienes, descargalo de docker.com
    echo.
    pause
    exit /b
)

echo Deteniendo contenedores anteriores...
docker-compose down

echo.
echo Construyendo y levantando servicios...
docker-compose up -d --build

echo.
echo ===================================================
echo   SISTEMA LEVANTADO CON EXITO
echo ===================================================
echo.
echo - Frontend disponible en: http://localhost
echo - Backend API disponible en: http://localhost:8000/docs
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause
