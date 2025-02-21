const express = require("express");
const { tasksCollection } = require("../collections/collections");

const router = express.Router();

const taskRoutes = (io) => {
  router.post("/", async (req, res) => {
    const taskColl = tasksCollection();
    const doc = req.body;
    doc.timestamp = Date.now();

    const result = await taskColl.insertOne(doc);

    if (result.acknowledged) {
      doc._id = result.insertedId;
      io.emit("taskCreated", doc);

      console.log({ message: "Task created", task: doc });

      return res.status(201).send({ message: "Task created", task: doc });
    }
  });

  router.get("/", (req, res) => {
    res.send("Hello, I'm from the database and task route.");
  });

  return router;
};

module.exports = taskRoutes;
