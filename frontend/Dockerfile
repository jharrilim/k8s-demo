FROM       node:14-alpine
WORKDIR    /app
COPY       package-lock.json .
COPY       package.json .
RUN        npm ci
COPY       . .
ENTRYPOINT [ "node", "." ]
