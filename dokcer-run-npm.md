docker run --rm -v "$(pwd)":/app -w /app node:22-alpine sh -c "npm ci && npm run build"
