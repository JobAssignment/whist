import { observable, action, makeObservable, computed } from "mobx";

import axios from "axios";

const serverApi = "http://localhost:8080";

export class ShoppingStore {
  constructor() {
    this.productsList = [];

    makeObservable(this, {
      getProducts: action,
      deleteProduct: action,
      editProduct: action,
      createNewProduct: action,
    });
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

  editProduct = async (product) => {
    console.log(" edit id ", product.id);
    await axios
      .put(`${serverApi}/products/${product.id}`, {
        product: product,
      })
      .then(async (response) => {
        await this.getProducts();
      })
      .catch(function (error) {
        console.log(error);
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
    console.log(" delete clicked ");
    await axios
      .delete(`${serverApi}/products/${product.id}`)
      .then(async (response) => {
        await this.getProducts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default ShoppingStore;
