#!/bin/sh

echo "Esperando a que MySQL esté disponible en $DB_HOST:$DB_PORT..."

# Espera real hasta que el puerto esté abierto
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "MySQL está listo. Iniciando el servicio..."

exec node src/index.js
