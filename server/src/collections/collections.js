const { getDB } = require("../db/db");

const todoCollection = () => getDB().collection("todo");
const usersCollection = () => getDB().collection("users");

module.exports = { todoCollection, usersCollection };
