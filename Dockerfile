# syntax=docker/dockerfile:1.5

########################
# 🔧 Base image for building
########################
FROM --platform=$BUILDPLATFORM node:20-slim AS base
WORKDIR /app

# Install libc compatibility for native modules like sharp and update all packages
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends libc6 && \
    rm -rf /var/lib/apt/lists/*

########################
# 📦 Install dependencies (cached)
########################
FROM base AS deps
WORKDIR /app

# Copy only lock/package files to install dependencies
COPY app/package.json app/package-lock.json* ./

RUN npm ci

########################
# 🛠 Build the Next.js app
########################
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY app .

ENV NODE_ENV=production
RUN npm run build

########################
# 🚀 Production image
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV PORT=3000

# Copy dependencies and build output
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["npx", "next", "start"]
