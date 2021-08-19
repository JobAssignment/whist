import { React, useEffect, useState } from "react";

import ProductsList from "./ProductsList";
import { observer, inject } from "mobx-react";


const Admin = inject("ShoppingStore")(
  observer((props) => {
    const [list, SetList] = useState([]);
    const fetchData = async () => {
      await props.ShoppingStore.getProducts();
      SetList(props.ShoppingStore.productsList);
    };
    useEffect(() => {
      fetchData();
    }, []);

    const handleAdd = () => {};

    return (
      <div>
        
        <ProductsList productsList={list}></ProductsList>
      </div>
    );
  })
);

export default Admin;
