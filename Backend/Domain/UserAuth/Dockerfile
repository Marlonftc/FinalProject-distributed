FROM node:18

WORKDIR /app

# Copiamos solo los archivos de dependencias primero
COPY package*.json ./

RUN npm install

# Ahora copiamos el resto del código (incluye src, .env, etc.)
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

