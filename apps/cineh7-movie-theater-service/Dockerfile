# Giai đoạn 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx nest build cineh7-movie-theater-service

# Giai đoạn 2: Production
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist/apps/cineh7-movie-theater-service ./dist
EXPOSE 3002
CMD ["node", "dist/main"]
