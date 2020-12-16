# Imagem do Node.js
FROM node:12.18-alpine as angular-app

# Preparando build da aplicação
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

# Preparando servidor Nginx
FROM nginx:alpine
VOLUME /var/cache/nginx

# Pegando conteúdo gerado no build e copiando para pasta do Nginx
COPY --from=angular-app app/dist/angular-app /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# Portas do docker: porta-computador:porta-docker

# Fazer build do projeto (usando o "." no final, a img ficará com mesmo nome atribuido a img do Node): docker build -t angular-app .
# Rodar container: docker run -p 8081:80
