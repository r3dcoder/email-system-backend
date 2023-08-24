const { getDB } = require("./db");


const createUser = async (user) => {
  const db = getDB();
  await db.collection("users").insertOne(user);
};

const findUserByEmail = async (email) => {
  const db = getDB();
  return db.collection("users").findOne({ email });
};

module.exports = { createUser, findUserByEmail };
