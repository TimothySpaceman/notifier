FROM node:latest

WORKDIR /var/www/notifier/be

COPY ./be/package*.json ./

RUN npm install

COPY ./be/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

CMD npm run build; npm start