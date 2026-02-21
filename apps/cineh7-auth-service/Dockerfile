# Giai đoạn 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy các file cấu hình package và lock
COPY package*.json ./

# Cài đặt toàn bộ dependencies (bao gồm cả devDependencies để build)
RUN npm install

# Copy toàn bộ code vào để build
COPY . .

# Build đúng service cụ thể trong monorepo
RUN npx nest build cineh7-auth-service

# Giai đoạn 2: Production (Runner)
FROM node:22-alpine

WORKDIR /app

# Chỉ copy package.json để cài production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy bản build từ stage builder qua
COPY --from=builder /app/dist/apps/cineh7-auth-service ./dist

# Mở port (auth-service thường dùng 3001)
EXPOSE 3001

# Chạy bản build đã compile
CMD ["node", "dist/main"]
