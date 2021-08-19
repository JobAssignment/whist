const express = require("express");
const { json } = require("sequelize");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/shoopingdb");

const axios = require("axios");
const LIMIT = 20;
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

router.get("/test", async function (req, res) {
  const dummyData = await getDummyProducts();
  await migrateDummyData(dummyData);
  res.send(filterDummyData(dummyData));

  //   console.log(rowsData);
});

router.get("/products", function (req, res) {
  sequelize
    .query(
      `SELECT * FROM products 
  `
    )
    .then(function ([clients, metadata]) {
      res.send(clients);
    });
});

router.put("/products/:id", function (req, res) {
  console.log(" want to edit ", req.params.id);
  const { product } = req.body;
  console.log(" product", product);
  sequelize
    .query(
      `
  UPDATE products
  SET
  title='${product.title}',
  description='${product.description}',
  price=${product.price},
  image='${product.image}'
  WHERE id = ${req.params.id};

  `
    )
    .then(function ([clients, metadata]) {
      res.send("updated");
    });
});
router.post("/products", function (req, res) {
  const { product } = req.body;
  console.log("post ", product);

  try {
    sequelize
      .query(
        `
        INSERT INTO products
         VALUES(
             ${null},
            '${product.title}',
            ${product.price},
             '${product.description}',
            '${product.image}'
            )
        `
      )
      .then(function ([results, metadata]) {
        res.status(201);
        res.send("added ok ");
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/products/:id", function (req, res) {
  console.log(" want to delete ", req.params.id);

  sequelize.query(`
  delete 
  from products
  where id=${req.params.id} 

  `);
  res.send("delete");
});

function getDummyProducts() {
  const res = axios
    .get(`https://fakestoreapi.com/products?limit=${LIMIT}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  return res;
}

function filterDummyData(arr) {
  return arr.map((item) => {
    return {
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
    };
  });
}

async function migrateDummyData(arr) {
  arr.forEach((item) => {
    try {
      sequelize
        .query(
          `
INSERT INTO products VALUES (null,
  '${item.title}',
  ${item.price},
  '${item.description}'
  ,'${item.image}')
`
        )
        .then(function ([items, metadata]) {});
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
}

module.exports = router;
