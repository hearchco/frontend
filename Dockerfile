# syntax = docker/dockerfile:1

# Build env vars
ARG API_URL
ARG PUBLIC_API_URL
# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.0
ARG PORT=8080
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT="${PORT}"

# Throw-away build stage to reduce size of final image
FROM base as build

# Build env vars
ENV API_URL=${API_URL}
ENV PUBLIC_API_URL=${PUBLIC_API_URL}
# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential 

# Install node modules
COPY --link package.json package-lock.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --production


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Expose port
EXPOSE ${PORT}

# Start the server by default, this can be overwritten at runtime
CMD [ "npm", "run", "start" ]

LABEL org.opencontainers.image.source="https://github.com/tminaorg/prednjica"