FROM nikolaik/python-nodejs:python2.7-nodejs12	

ARG JWT_SECRET_KEY
ARG MONGO_DB_URL
ARG HTTP_PORT


ENV MONGO_DB_URL $MONGO_DB_URL
ENV NODE_ENV production
ENV JWT_SECRET_KEY $JWT_SECRET_KEY
ENV HTTP_PORT ${HTTP_PORT}

COPY package.json /srv/chatrooms/
COPY package-lock.json /srv/chatrooms/
WORKDIR /srv/chatrooms

RUN npm install
COPY src /srv/chatrooms/src

EXPOSE ${HTTP_PORT}
CMD npm start 
