#!/bin/bash
set -e

# Make BACKEND the import root
export PYTHONPATH="$(pwd)"

if [[ "$SQLALCHEMY_DATABASE_URI" == *"sqlite"* ]]; then
    if [ ! -f "/data/vicking.db" ]; then
        echo "Base de datos no encontrada en /data. Copiando la versión inicial pre-cargada (initial.db)..."
        cp initial.db /data/vicking.db || echo "No initial.db found, skipping"
    else
        echo "Base de datos existente encontrada en /data."
    fi
else
    echo "Usando base de datos en red (PostgreSQL). Omitiendo copia de archivos SQLite."
fi

echo "Checking Alembic heads..."
# python -m alembic heads

echo "Running migrations..."
# alembic upgrade head

echo "Seeding database..."
python scripts/seed_all.py
echo "Starting Gunicorn..."
PORT="${PORT:-8000}"
exec gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind "0.0.0.0:$PORT"
