FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ENV DATABASE_URL="postgresql://placeholder:5432/placeholder"

RUN npx prisma generate 
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma
COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/src/generated/prisma ./src/generated/prisma

COPY prisma.config.ts ./
COPY public ./public

EXPOSE 4000
CMD ["node", "dist/server.js"]