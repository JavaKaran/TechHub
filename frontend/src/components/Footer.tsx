import React from "react";
import { Col, Container, Row } from "react-bootstrap";

interface Props {}

const Footer = (props: Props) => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Karan Sharma</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;