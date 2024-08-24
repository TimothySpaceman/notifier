FROM node:latest

WORKDIR /var/www/notifier/fe

COPY ./fe/package*.json ./

RUN npm install

COPY ./fe/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

CMD npm run build; npm start