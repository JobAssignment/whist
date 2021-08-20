const express = require("express");
const { json } = require("sequelize");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost:3306/shoopingdb");

var dayjs = require("dayjs");

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

router.get("/init", async function (req, res) {
  const dummyData = await getDummyProducts();
  await migrateDummyData(dummyData);
  res.send(filterDummyData(dummyData));
  createTransactionTable();
  createProductTransactionTable();
  res.send(" create table transaction ");
});

router.get("/top", function (req, res) {
  sequelize
    .query(
      `
      
      select  product_id, count ,product_name
      from (
      select  product_id, count(product_id) as count , p.title as product_name
         from product_transaction as pt , products as p
         where p.id=pt.product_id
         group by product_id
          ) as temp
         order by count desc
          limit 5

  `
    )
    .then(function ([products, metadata]) {
      res.send(products);
    });

  //select * from product_transaction group by product_id;
  // select product_id, count(*) as count  from product_transaction group by product_id;
});

router.get("/distinct", function (req, res) {
  sequelize
    .query(
      `
    
      select distinct product_id, count(product_id) as count , p.title as product_name
         from product_transaction as pt , products as p
         where p.id=pt.product_id
         group by pt.transaction_id
         order by count desc
          limit 5
      
     

  `
    )
    .then(function ([products, metadata]) {
      res.send(products);
    });
});

router.get("/products", function (req, res) {
  const top = req.query.top;
  const distinct = req.query.distinct;

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
  const { product } = req.body;
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

router.post("/transaction", function (req, res) {
  const transaction = req.body;
  const currentDate = dayjs(new Date()).format("YYYY-MM-DDThh:mm");
  try {
    sequelize
      .query(
        `
        INSERT INTO transaction
         VALUES(
             ${null},
            ${transaction.total},
            '${currentDate}'

            )
        `
      )
      .then(function ([results, metadata]) {
        res.status(201);
        res.send({ id: results });
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/product_transaction", function (req, res) {
  const productArray = req.body.data.productArray;
  const transaction = req.body.data.transaction;
  productArray.forEach((item) => {
    try {
      sequelize
        .query(
          `
          INSERT INTO product_transaction
           VALUES(
               ${item},
              ${transaction}
              )
          `
        )
        .then(function ([results, metadata]) {});
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  res.send(" productTransaction");
});

router.get("/transaction", function (req, res) {
  sequelize
    .query(
      `SELECT * FROM transaction 
`
    )
    .then(function ([transaction, metadata]) {
      res.send(transaction);
    });
});

router.get("/recentTransaction", function (req, res) {
  sequelize
    .query(
      `SELECT SUM(amount) as amount,  date 
       FROM transaction as t
              group by date(t.date)
     
      `
    )
    .then(function ([transaction, metadata]) {
      let filter = transaction.map((t) => ({
        date: dayjs(t.date).format("DD/MM/YYYY"),
        amount: t.amount,
      }));
      res.send(filter);
    });
});

router.delete("/products/:id", function (req, res) {
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
function createTransactionTable() {
  try {
    sequelize
      .query(
        `
        CREATE TABLE transaction(
          id INT AUTO_INCREMENT PRIMARY KEY,
          amount INT,
          date DATETIME
      )
`
      )
      .then(function ([items, metadata]) {});
  } catch (error) {
    res.status(400).send(error.message);
  }
}

function createProductTransactionTable() {
  try {
    sequelize
      .query(
        `
    CREATE TABLE product_transaction(
      product_id INT,
     transaction_id INT,
     FOREIGN KEY(product_id) REFERENCES products(id),
     FOREIGN KEY(transaction_id) REFERENCES transaction(id)
  )
`
      )
      .then(function ([items, metadata]) {});
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = router;
