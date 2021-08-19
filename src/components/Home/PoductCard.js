import Button from "react-bootstrap/Button";
import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Swal from "sweetalert2";

function ProductCard(props) {
  const handleBuyClick = () => {
    conformAlert();
    console.log(" item to buy ", props.item);
  };

  const conformAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "this well be added to your cart!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Added!", `The data has been added to your cart.`, "success");
      }
    });
  };

  return (
    <div>
      <Card>
        <Card.Header>{props.item.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <Image className="product-image" src={props.item.image} fluid />

            <footer className="blockquote-footer"></footer>
          </blockquote>
          <Card.Footer className="desc">{props.item.description}</Card.Footer>
        </Card.Body>

        <Button onClick={handleBuyClick}>Buy</Button>
      </Card>
    </div>
  );
}

export default ProductCard;
