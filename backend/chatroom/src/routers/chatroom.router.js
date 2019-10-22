const express = require("express");
const router = express.Router();
const service = require("../services/chatroom.service");

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
  .get(
    "/",
    wrapAsync(async (req, res) => {
      const { page = 0 } = req.query;
      const chatrooms = await service.list({ page });
      res.status(200).send({ chatrooms });
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
  .patch(
    "/:id",
    express.json(),
    wrapAsync(async (req, res, next) => {
      const updateResult = await service.update(req.params.id, req.body, req.user);

      if (updateResult.ok === 1 && updateResult.nModified === 1) {
        res.set("Link", `/chatrooms/${req.params.id}`);
        res.status(204).end();
      } else {
        next();
      }
    })
  );

module.exports = router;