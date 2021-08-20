import { React, useEffect, useState } from "react";

import ProductsList from "./ProductsList";
import { observer, inject } from "mobx-react";

const Admin = inject("ShoppingStore")(
  observer((props) => {
    const [list, SetList] = useState([]);
    const fetchData = async () => {
      await props.ShoppingStore.getProducts();
      // SetList(props.ShoppingStore.productsListComputed);
    };
    useEffect(() => {
      fetchData();
    }, []);

    return (
      <div>
        <ProductsList
          productsList={props.ShoppingStore.productsListComputed}
        ></ProductsList>
      </div>
    );
  })
);

export default Admin;
