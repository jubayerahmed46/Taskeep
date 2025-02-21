const express = require("express");
const { tasksCollection } = require("../collections/collections");
const { ObjectId } = require("mongodb");

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

  router.get("/:email", async (req, res) => {
    const taskColl = tasksCollection();
    const email = req.params.email;

    const result = await taskColl.find({ email }).toArray();

    res.json(result);
  });

  router.patch("/:id", async (req, res) => {
    const taskColl = tasksCollection();

    const { status } = req.body;
    const { id } = req.params;

    await taskColl.updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    const updatedTask = { id, status };
    io.emit("taskUpdated", updatedTask);
    res.json({ message: "Task status updated", updatedTask });
  });

  return router;
};

module.exports = taskRoutes;
