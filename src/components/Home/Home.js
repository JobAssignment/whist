import { React, useState } from "react";
import ProductCard from "./PoductCard";
import { observer, inject } from "mobx-react";

import "./style/home.css";

import Cart from "./Cart";
const Home = inject("ShoppingStore")(
  observer((props) => {
    return (
      <div>
        <Cart></Cart>
        <div className="grid">
          {props.list.map((item, index) => (
            <ProductCard item={item} key={index}></ProductCard>
          ))}
        </div>
      </div>
    );
  })
);

export default Home;
