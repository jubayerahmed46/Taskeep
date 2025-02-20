const { getDB } = require("../db/db");

const todoCollection = () => getDB().collection("todo");

module.exports = { todoCollection };
