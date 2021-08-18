// import { observable, action, makeObservable, computed } from "mobx";
import { makeObservable } from "mobx";

// import axios from "axios";

// const serverApi = "http://localhost:8080";

export class ShoppingStore {
  constructor() {
    makeObservable(this, {});
  }
}

export default ShoppingStore;
