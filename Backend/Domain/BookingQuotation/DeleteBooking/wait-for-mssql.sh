#!/bin/sh

# Espera a que SQL Server esté disponible
echo "Esperando a que SQL Server esté disponible en $1..."

until nc -z -v -w30 $1 $2
do
  echo "Esperando conexión a $1:$2..."
  sleep 3
done

echo "SQL Server está disponible en $1:$2"
exec "$@"
