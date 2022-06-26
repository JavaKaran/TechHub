import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import { ReduxState } from "../types/ReduxState";
import { AppDispatch } from "../store";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state: ReduxState) => state.cart);

  const [address, setAddress] = useState<string>(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setCity] = useState<string>(
    shippingAddress ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState<string>(
    shippingAddress ? shippingAddress.country : ""
  );

  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <Meta title="Shipping" />
      <FormContainer>
        <CheckoutSteps stepTwo />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Link to="/" className="btn btn-dark">
            Back
          </Link>
          <Button type="submit" variant="primary" className="ml-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;