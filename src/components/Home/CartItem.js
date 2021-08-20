import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { observer, inject } from "mobx-react";

const CartItem = inject("ShoppingStore")(
  observer((props) => {
    const handleRemove = (id) => {
      props.ShoppingStore.removeFromCart(props.item.id);
    };
    return (
      <div>
        <Container>
          <Row sm={4}>
            <Col sm={8}>
              <Row xs={2}>
                <Col sm={1}>item:</Col>
                <Col sm={3}>{props.item.title}</Col>
              </Row>
              <Row xs={1}></Row>
              <Row xs={2}>
                <Col sm={3}>item price:</Col>
                <Col sm={3}>{props.item.price} $</Col>
              </Row>
            </Col>
            <Col sm={4}>
              <Image src={props.item.image} height="100px"></Image>
            </Col>
            <Col>
              <Button onClick={handleRemove} variant="danger">
                remove
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  })
);

export default CartItem;
