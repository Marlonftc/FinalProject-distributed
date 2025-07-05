FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instalar netcat para que el script wait-for-mysql.sh funcione
RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .
RUN chmod +x wait-for-mysql.sh

EXPOSE 3003

CMD ["sh", "./wait-for-mysql.sh"]
