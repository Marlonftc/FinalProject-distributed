# Etapa 1: Compilar la app con Node
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Servir la app con NGINX
FROM nginx:alpine

# Copiar archivos construidos desde el builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
