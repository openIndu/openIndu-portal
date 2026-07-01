# Stage 1: Build the application
# Debian-based (not Alpine) — Puppeteer/Chromium for prerender needs glibc.
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm config set registry https://registry.npmmirror.com

# Skip Puppeteer's bundled Chrome download (large, unreliable from China).
# The prerender script gracefully skips when no browser is available.
ENV PUPPETEER_SKIP_DOWNLOAD=true

RUN npm ci

# Copy source code
COPY . .

# Build the application (tsc + vite + puppeteer prerender)
RUN npm run build

# Stage 2: Production image with nginx
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
