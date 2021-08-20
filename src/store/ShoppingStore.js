import { observable, action, makeObservable, computed } from "mobx";

import axios from "axios";

const serverApi = "";

export class ShoppingStore {
  constructor() {
    this.productsList = [];
    this.cartList = [];
    this.recentList = [];
    this.topProductList = [];
    this.topDistinctList = [];

    makeObservable(this, {
      getProducts: action,
      productsList: observable,
      productsListComputed: computed,
      recentList: observable,
      cartList: observable,
      topProductList: observable,
      deleteProduct: action,
      editProduct: action,
      createNewProduct: action,
      getTopProduct: action,
      totalCost: computed,
      getRecentSales: action,
    });
  }
  get productsListComputed() {
    return this.productsList;
  }
  getProducts = async () => {
    await axios
      .get(`${serverApi}/products`)
      .then((response) => {
        this.productsList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getRecentSales = async () => {
    await axios
      .get(`${serverApi}/recentTransaction`)
      .then((response) => {
        this.recentList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getTopDistinct = async () => {
    await axios
      .get(`${serverApi}/distinct`)
      .then((response) => {
        this.topDistinctList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getTopProduct = async () => {
    await axios
      .get(`${serverApi}/top`)
      .then((response) => {
        this.topProductList = response.data;
      })
      .catch(function (error) {
      });
  };

  get totalCost() {
    let total = 0;
    this.cartList.forEach((item) => {
      total += item.price;
    });
    return total;
  }
  editProduct = async (product) => {
    await axios
      .put(`${serverApi}/products/${product.id}`, {
        product: product,
      })
      .then(async (response) => {
        await this.getProducts();
      })
      .catch(function (error) {
      });
  };

  createNewProduct = async (product) => {
    await axios
      .post(`${serverApi}/products`, {
        product: product,
      })
      .then(async (response) => {
        await this.getProducts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteProduct = async (product) => {
    await axios
      .delete(`${serverApi}/products/${product.id}`)
      .then(async (response) => {
        await this.getProducts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addNewTransaction = async (total) => {
    const transactionID = await this.addTransaction(total);
    const productArray = this.cartList.map((item) => item.id);
    await this.updateProductTransaction(productArray, transactionID);

    await this.getProducts();
    this.cartList = [];
    this.cartDistinctList = [];
  };

  addToCart = (item) => {
    this.cartList.push(item);
  };

  removeFromCart = (id) => {
    this.cartList = this.cartList.filter((item) => {
      return item.id != id;
    });
  };

  addTransaction = async (total) => {
    return await axios
      .post(`${serverApi}/transaction`, {
        total: total,
      })
      .then(async (response) => {
        const transactionID = response.data.id;
        return transactionID;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateProductTransaction = async (productArray, transaction) => {
    await axios
      .post(`${serverApi}/product_transaction`, {
        data: { productArray, transaction },
      })
      .then(async (response) => {
        await this.getProducts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateDistinctProductTransaction = async (productArray, transaction) => {
    await axios
      .post(`${serverApi}/product_transaction`, {
        data: { productArray, transaction },
      })
      .then(async (response) => {
        await this.getProducts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default ShoppingStore;
