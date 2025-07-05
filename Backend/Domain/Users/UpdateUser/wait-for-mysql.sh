#!/bin/sh

echo "Waiting for MySQL at $DB_HOST:$DB_PORT..."

# Espera real hasta que el puerto esté abierto
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "MySQL is available — starting the app..."

exec node src/index.js
