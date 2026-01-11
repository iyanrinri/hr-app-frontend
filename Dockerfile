# Multi-stage build for Nuxt.js application
FROM node:20-slim AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_SOCKET_URL
ARG NEXT_PUBLIC_API_URL
ARG NUXT_PUBLIC_API_URL

# Set environment variables for build
ENV NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# Include Nuxt specific env vars if needed
ENV NUXT_PUBLIC_API_URL=$NUXT_PUBLIC_API_URL

# Build the application
RUN npm run build

# Production image, copy all the files and run nuxt
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_NO_WARNINGS=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Copy built application
# Nuxt 3 builds to .output
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output

USER nuxtjs

EXPOSE 3000

ENV PORT=3000
ENV HOST="0.0.0.0"

CMD ["node", ".output/server/index.mjs"]
