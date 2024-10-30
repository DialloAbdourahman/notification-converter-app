# Stage 1: Build
FROM node:20 AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm install 
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist /app/dist
EXPOSE 3000

CMD ["npm", "start"]
