FROM node:20-alpine

WORKDIR /app

COPY package*.json /

RUN npm install 

COPY . .

RUN npm run build

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]