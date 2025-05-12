# Primera etapa: construir la aplicación Angular
FROM node:latest AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Segunda etapa: servir con Nginx
FROM nginx:alpine
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/estadistica-front/browser usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
