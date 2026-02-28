FROM node:22-alpine

WORKDIR /app

COPY server.js .
COPY index.html .

EXPOSE 3080

CMD ["node", "server.js"]
