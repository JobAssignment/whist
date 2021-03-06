import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { observer, inject } from "mobx-react";
import "./style/topfive.css";
const BoxList = inject("ShoppingStore")(
  observer((props) => {
    return (
      <div>
        <ListGroup>
          <ListGroup.Item active>{props.title}</ListGroup.Item>

          {props.list.map((item, index) => (
            <ListGroup.Item key={index}>
              {item.product_name} has
              <span>
                {" "}
                <h5 className="item-counter">{item.count} </h5>
              </span>
              <h5 className="item-sales">sales </h5>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  })
);

export default BoxList;
