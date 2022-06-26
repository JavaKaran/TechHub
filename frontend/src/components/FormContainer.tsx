import React, { ReactNode } from "react";
import { FunctionComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface Props {
    children: ReactNode;
  }

const FormContainer: FunctionComponent<Props> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;