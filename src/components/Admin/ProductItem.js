import React from "react";
import "./style/item.css";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import { observer, inject } from "mobx-react";

import Swal from "sweetalert2";

const ProductItem = inject("ShoppingStore")(
  observer((props) => {
    const handleEdit = () => {
      props.handleSelectedItem(props.item);
      props.handleModalChange();
    };
    const handleDelete = (e) => {
      conformAlert();
      const name = e.target.name;
      // props.ShoppingStore[name](props.item); // this wile be used for both handle
      // console.log(props.item.id, "clicked");
      props.handleModalChange();
    };

    // const handleModalChange = () => {};
    // const handleSelectedItem = () => {
    //   props.handleSelectedItem(props.item);
    //   props.handleModalChange();
    // };

    const conformAlert = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          props.ShoppingStore.deleteProduct(props.item);

          Swal.fire("Deleted!", `The data has been deleted. 😔`, "success");
        }
      });
    };

    return (
      <tr>
        <td>{props.item.title}</td>

        <td>{props.item.price} $</td>
        <td>
          <span>{props.item.description} </span>
        </td>
        <td>
          <Image
            className="product-image"
            src={props.item.image}
            fluid
            rounded
          />
        </td>
        <td>
          <Button variant="success" name="editProduct" onClick={handleEdit}>
            edit
          </Button>{" "}
          <Button variant="danger" name="deleteProduct" onClick={handleDelete}>
            delete
          </Button>{" "}
        </td>
      </tr>
    );
  })
);

export default ProductItem;
