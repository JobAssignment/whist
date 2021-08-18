const express = require("express");
const { json } = require("sequelize");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/crm");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

router.get("/test", function (req, res) {
  res.send("test work ");

  //   console.log(rowsData);
});

module.exports = router;
