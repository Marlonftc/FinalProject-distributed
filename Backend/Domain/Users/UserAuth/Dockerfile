FROM node:18

WORKDIR /app

# Copiar y preparar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Copiar script de espera (lo crearás tú ahora)
COPY wait-for-mysql.js .

EXPOSE 3000

# Esperar a MySQL antes de iniciar el servidor
CMD ["sh", "-c", "node wait-for-mysql.js && npm start"]


