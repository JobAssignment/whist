import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { observer, inject } from "mobx-react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import CartItem from "./CartItem";
import "./style/cart.css";
const Cart = inject("ShoppingStore")(
  observer((props) => {
    const handlePay = () => {
      props.ShoppingStore.addNewTransaction(props.ShoppingStore.totalCost);
    };

    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Cart Items
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {props.ShoppingStore.cartList.map((item, index) => (
              <Dropdown.Item key={index + "click"} href="#/action-1">
                <CartItem item={item} key={index}></CartItem>
              </Dropdown.Item>
            ))}
            {}
            {
              <Dropdown.Item key="total" href="#">
                <Row>
                  <Col>
                    <Button onClick={handlePay} variant="primary" size="lg">
                      pay
                    </Button>
                  </Col>
                  <Col>
                    <Row>
                      <Col sm={3}>total:</Col>
                      <Col sm={3}>{props.ShoppingStore.totalCost} $</Col>
                    </Row>
                  </Col>
                </Row>
              </Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  })
);

export default Cart;
