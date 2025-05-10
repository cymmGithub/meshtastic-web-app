# Use Node.js as base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects anonymous telemetry data - disable it
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user and switch to it
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
