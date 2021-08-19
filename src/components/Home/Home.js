import React from "react";
import ProductCard from "./PoductCard";
import { observer, inject } from "mobx-react";

import "./style/home.css";
const Home = inject("ShoppingStore")(
  observer((props) => {
    console.log(props, "home ");
    return (
      <div className="grid">
        {props.list.map((item, index) => (
          <ProductCard item={item} key={index}></ProductCard>
        ))}
      </div>
    );
  })
);

export default Home;
