FROM nikolaik/python-nodejs:python2.7-nodejs12	

ARG JWT_SECRET_KEY
ARG MONGO_DB_URL
ARG HTTP_PORT


ENV MONGO_DB_URL $MONGO_DB_URL
ENV NODE_ENV production
ENV JWT_SECRET_KEY $JWT_SECRET_KEY
ENV HTTP_PORT ${HTTP_PORT}

COPY package.json /srv/auth/
COPY package-lock.json /srv/auth/
WORKDIR /srv/auth

RUN npm install
COPY src /srv/auth/src

EXPOSE ${HTTP_PORT}
CMD npm start 
