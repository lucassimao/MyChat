const express = require("express");
const router = express.Router();
const service = require("../services/chatroom.service");
const UserDao = require('../dao/user.dao');

const wrapAsync = asyncMiddleware => {
  return (req, res, next) =>
    asyncMiddleware(req, res, next).catch(error => {
      console.error(error);
      next(error);
    });
};

router
  .get(
    "/mine",
    wrapAsync(async (req, res) => {
      const { page = 0 } = req.query;
      const chatrooms = await service.listByUser({ page }, req.user);
      res.status(200).send({ chatrooms });
    })
  )
  .get(
    "/others",
    wrapAsync(async (req, res) => {
      const { page = 0 } = req.query;
      const chatrooms = await service.listByUserOtherThan({ page }, req.user);
      res.status(200).send({ chatrooms });
    })
  )
  .get("/:roomId", wrapAsync(async (req, res) => {
    const chatroom = await service.getById(req.params.roomId);
    if (chatroom) {
      const participants = await UserDao.find({ _id: { $in: chatroom.participants } }, { nickname: 1, profilePic: 1 })
      const { name, description, _id  } = chatroom;
      res.status(200).send({ chatroom: { name, description }, participants });
    } else {
      res.status(404).send('Chat room not found');
    }
  }))
  .post(
    "/:roomId/participants",
    wrapAsync(async (req, res) => {
      const chatroom = await service.getById(req.params.roomId);
      if (chatroom) {
        await service.joinRoom(chatroom, req.user);
        res.sendStatus(200);
      } else {
        res.status(404).send('Chat room not found');
      }
    })
  )
  .post(
    "/",
    express.json({ limit: "10mb" }),
    wrapAsync(async (req, res) => {
      try {
        let chatroom = req.body;
        chatroom = await service.save(chatroom, req.user);
        res.set("Link", `/chatrooms/${chatroom._id}`);
        res.status(201).end();
      } catch (error) {
        if (error.name == "ValidationError") {
          res.status(400).send(error.errors);
        } else if (error.name == "MongoError") {
          if (error.code === 11000 && error.keyPattern.name) {
            res.status(400).send("The name you chose is already in use, please try a new one");
          } else {
            res.status(400).send(error.errmsg);
          }
        } else {
          throw error;
        }
      }
    })
  )
  .delete(
    "/:roomId/participants",
    wrapAsync(async (req, res) => {
      const chatroom = await service.getById(req.params.roomId);
      if (chatroom) {
        await service.exitRoom(chatroom, req.user);
        res.sendStatus(200);
      } else {
        res.status(404).send('Chat room not found');
      }
    })
  )  
  .delete(
    "/:id",
    wrapAsync(async (req, res, next) => {
      const dbResponse = await service.delete(req.params.id, req.user);

      if (dbResponse.ok === 1) {
        if (dbResponse.deletedCount === 1) {
          res.status(204).end();
        } else {
          res.status(404).send("No chatroom found for id " + req.params.id);
        }
      } else {
        next();
      }
    })
  )


module.exports = router;
