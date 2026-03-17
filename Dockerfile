FROM node:20-alpine

# install git only
RUN apk add --no-cache git

WORKDIR /app

# copy only what we need for runtime (no build step)
COPY . .

EXPOSE 8080

CMD ["node", "scripts/static-supervisor.js"]
