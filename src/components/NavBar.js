import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import React from "react";

import Admin from "./Admin";
import Home from "./Home";
import Stats from "./Stats";

function NavBar() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark">
        <Container fluid="md">
          <Row className="justify-content-md-center">
            <Col>
              <Link to="/admin">Admin</Link>
            </Col>
            <Col>
              <Link to="/home"> Home </Link>
            </Col>
            <Col>
              <Link to="/stats"> Stats </Link>
            </Col>
          </Row>
        </Container>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/home" exact component={Home} />
        <Route path="/stats" exact component={Stats} />
      </Switch>
    </Router>
  );
}

export default NavBar;
