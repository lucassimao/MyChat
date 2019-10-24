# Real-time online chat

Single page chat application. One or more user(s) log(s) in into a chat room. Messages of a user are broadcasted to the channel.

This project consists of two modules. The backend ( in the subfolder backend) contains the JWT based authentication microservice (written in Node.js) as well as a RESTful API for chatrooms. Both microservices utilizes MongoDB as datastore. For the delivery of messages, this project is using Apache Kafka. The frontend (in the subfolder frontend) contains a React based SPA application.

## Features
- mobile friendly responsive layout
- User sign in
- User sign up
- create a new chat room
- listing of chat rooms created by the user as well as other users
- exclusion of chat room
- join an existing chatroom
- when an user access the chatroom, all previous messages are available
- user can send rich text formatting to each other using HTML tags
- user can embed images in his messages using the HTML IMG tag
- Users see status messages such as "User n typing..." and "User n is online"

## Backend
In order to start all the required backend services, first you have to install Docker and Docker Compose on your machine. After installed, go to the **backend** subfolder and run

### `docker-compose up`

This command starts several services, like the authentication endpoint, the chatrooms endpoint, the Mondodb instance, Apache Kafka, and Apache Kakfa Rest Proxy.<br />

## Frontend

The frontend for this single page application was written with React and Material-UI. In order to start, ensure you have Node version 12 and npm >= 6.10.3. After installed, go to the **frontend** subfolder and run


### `npm install && npm start`

You can access the main page through [http://localhost:3000](http://localhost:3000)


## Tech stack

+ Backend
    - Node.js (v12.10)
    - Express.Js
    - JWT
    - MongoDB
    - mongoose
    - eslint
    - prettier
    - Docker / Docker compose
    - Apache Kafka
    - Confluent Kafka REST Proxy

+ Frontend
    - React
    - Material-UI
    - axios