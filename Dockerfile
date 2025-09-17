# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install build tools for sqlite
RUN apk add --no-cache python3 make g++

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Build
RUN yarn build

# ---- Production Stage ----
FROM node:20-alpine AS production

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache sqlite

# Copy built app and node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/db.sqlite ./

ENV NODE_ENV=production
ENV BASE_URL=http://localhost:8000
ENV PORT=8000
EXPOSE 8000

CMD ["node", "dist/main"]
    