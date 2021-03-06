import { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { AppDispatch } from "../store";
import { ProductCreateActionTypes } from "../types/";
import { ReduxState } from "../types/ReduxState";

const ProductListScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const pageNumber = params.pageNumber || "1";

  const dispatch = useDispatch<AppDispatch>();

  const { loading, products, error, page, pages } = useSelector(
    (state: ReduxState) => state.productList
  );

  const { userInfo } = useSelector((state: ReduxState) => state.userLogin);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state: ReduxState) => state.productDelete);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector((state: ReduxState) => state.productCreate);

  useEffect(() => {
    dispatch({ type: ProductCreateActionTypes.PRODUCT_CREATE_RESET });

    if (!userInfo?.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct?._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const productsListDisplay = () => {
    if (loading || loadingDelete || loadingCreate) {
      return <Loader />;
    } else if (error) {
      return <Message variant="danger">{error}</Message>;
    } else if (errorDelete) {
      return <Message variant="danger">{errorDelete}</Message>;
    } else if (errorCreate) {
      return <Message variant="danger">{errorCreate}</Message>;
    } else {
      return (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>???{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {userInfo && page && pages && (
            <Paginate page={page} pages={pages} isAdmin={userInfo.isAdmin} />
          )}
        </>
      );
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>
      {productsListDisplay()}
    </>
  );
};

export default ProductListScreen;