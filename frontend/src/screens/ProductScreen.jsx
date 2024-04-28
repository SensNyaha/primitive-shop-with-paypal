import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    addLoadingID,
    filterLoadingID,
    getProductsInfoById,
} from "../redux/slices/productsSlice";
import {
    changeProductQuantity,
    removeProduct,
} from "../redux/slices/cartSlice";

import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";

import Rating from "../components/Rating";
import SpinnerWrapper from "../components/SpinnerWrapper";
import QuantityControl from "../components/QuantityControl";

function ProductScreen() {
    const { id } = useParams();

    const { productList, loadingIDs, error } = useSelector(
        (state) => state.products
    );
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const found = cart.find((e) => e._id === product._id);
        if (found) setQuantity(found.quantity);
    }, [cart, product._id]);

    useEffect(() => {
        setIsLoading(loadingIDs?.includes(id));
    }, [loadingIDs, id]);

    useEffect(() => {
        const existProduct = productList.find((e) => e._id === id);

        if (existProduct) setProduct(existProduct);
        else {
            dispatch(addLoadingID(id));
            dispatch(getProductsInfoById(id));

            setErrorMessage("");

            setTimeout(() => {
                if (error) {
                    dispatch(filterLoadingID(id));
                    setErrorMessage(error);
                }
            }, 10000);
        }
    }, [dispatch, productList, id]);

    function handleDecreaseQuantity() {
        if (quantity > 1) setQuantity((qnt) => qnt - 1);
        else setQuantity(1);

        if (cart.find((e) => e._id === product._id))
            dispatch(
                changeProductQuantity([
                    { _id: product?._id, quantity: quantity - 1 },
                ])
            );
    }
    function handleIncreaseQuantity() {
        if (quantity < product.countInStock) setQuantity((qnt) => qnt + 1);
        else setQuantity(product.countInStock);

        if (cart.find((e) => e._id === product._id))
            dispatch(
                changeProductQuantity([
                    { _id: product?._id, quantity: quantity + 1 },
                ])
            );
    }
    function handleChangeQuantityInCart(e) {
        if (cart.find((e) => e._id === product._id))
            dispatch(removeProduct({ _id: product?._id }));
        else dispatch(changeProductQuantity([{ _id: product?._id, quantity }]));
    }
    function handleMouseEnterAddToCartButton(e) {
        if (cart.find((e) => e._id === product._id))
            e.target.innerText = "Remove";
    }
    function handleMouseOutAddToCartButton(e) {
        if (cart.find((e) => e._id === product._id))
            e.target.innerText = "Added";
    }

    return (
        <>
            <Link className="btn btn-dark my-3 btn-w-hover" to="/">
                Go Back
            </Link>
            <SpinnerWrapper
                isLoading={isLoading}
                className={"spinner-wrapper"}
            />
            {product && (
                <Row>
                    <Col sm={12} md={6} lg={8}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            width="100%"
                        />
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>{product.name}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {product.description}
                            </ListGroup.Item>
                            <ListGroup.Item
                                className="mb-1 text-end"
                                style={{ fontWeight: 800 }}
                            >
                                Available:{" "}
                                {product.countInStock > 0
                                    ? `${product.countInStock} pieces`
                                    : "Out of stock"}
                            </ListGroup.Item>
                            <ListGroup.Item
                                sm={12}
                                className="d-flex align-items-center justify-content-end gap-4 flex-wrap"
                            >
                                {product.countInStock > 0 && (
                                    <QuantityControl
                                        quantity={quantity}
                                        onIncrease={handleIncreaseQuantity}
                                        onDecrease={handleDecreaseQuantity}
                                        maxCount={product.countInStock}
                                    />
                                )}
                                <Button
                                    className="btn-block btn-w-hover d-block"
                                    type="button"
                                    disabled={product.countInStock <= 0}
                                    onClick={handleChangeQuantityInCart}
                                    onMouseEnter={
                                        handleMouseEnterAddToCartButton
                                    }
                                    onMouseOut={handleMouseOutAddToCartButton}
                                >
                                    {cart.find((pr) => pr._id === product._id)
                                        ? "Added"
                                        : "Add to cart"}
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )}
            {error && !isLoading && (
                <h3 className="text-center">
                    Sorry, we've not found that product <br /> {errorMessage}
                </h3>
            )}
        </>
    );
}

export default ProductScreen;
