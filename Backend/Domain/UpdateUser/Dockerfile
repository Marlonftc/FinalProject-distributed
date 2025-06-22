FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copiar todo el contenido (incluido el script de espera)
COPY . .

# Copiar el script de espera y darle permisos de ejecución
COPY wait-for-mysql.sh .
RUN chmod +x wait-for-mysql.sh

EXPOSE 3003

# Usar el script como punto de entrada
CMD ["./wait-for-mysql.sh"]

