FROM node:18

WORKDIR /app

# Copiamos los archivos del proyecto
COPY package*.json ./

# Instalamos dentro del contenedor (no en Windows)
RUN npm install

COPY . .

EXPOSE 3005

CMD ["node", "src/index.js"]

