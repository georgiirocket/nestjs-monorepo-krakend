FROM node:20.16.0 As production

WORKDIR /app

COPY package*.json ./
COPY /prisma ./prisma
COPY migration.sh ./migration.sh

RUN npm install --only=production

RUN chmod +x /app/migration.sh
ENTRYPOINT ["/app/migration.sh"]

CMD echo 'Migration end!'