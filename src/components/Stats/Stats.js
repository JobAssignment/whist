import { React, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BoxList from "./BoxList";
import RecentTransaction from "./RecentTransaction";
import { observer, inject } from "mobx-react";
const Stats = inject("ShoppingStore")(
  observer((props) => {
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      props.ShoppingStore.getRecentSales();
      props.ShoppingStore.getTopProduct();
      props.ShoppingStore.getTopDistinct();
    };
    return (
      <div>
        <Container>
          <br></br>
          <Row>
            <Col>
              <RecentTransaction
                list={props.ShoppingStore.recentList}
                title=" last 5 day sales"
              ></RecentTransaction>
            </Col>
            <Col>
              <BoxList
                list={props.ShoppingStore.topProductList}
                title="top five"
              ></BoxList>
            </Col>
            <Col>
              <BoxList
                list={props.ShoppingStore.topDistinctList}
                title="top distinct five"
              ></BoxList>
            </Col>
          </Row>
        </Container>
      </div>
    );
  })
);

export default Stats;
