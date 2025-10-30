# ---- Base Image ----
FROM node:20-alpine AS base
WORKDIR /app

# Enable Corepack (for PNPM)
RUN corepack enable

# Copy only package files for dependency install
COPY package.json pnpm-lock.yaml ./

# ---- Build Stage ----
FROM base AS builder

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the project
RUN pnpm run build

# ---- Production Stage ----
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Enable Corepack for PNPM runtime if needed
RUN corepack enable

# Copy only necessary runtime files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/main.js"]
