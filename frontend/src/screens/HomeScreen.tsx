import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import { AppDispatch } from "../store";
import { Product as ProductType } from "../types";
import { ReduxState } from "../types/ReduxState";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams(); 

  const PageNumber = pageNumber || "1";

  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error, page, pages } = useSelector(
    (state: ReduxState) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, PageNumber));
  }, [dispatch, keyword, PageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !products ? (
        <Message variant="danger">No Products Currently Available</Message>
      ) : (
        <>
          <Row>
            {products.map((product: ProductType) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {pages && page && (
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;