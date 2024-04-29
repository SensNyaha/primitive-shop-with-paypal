import React, { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import QuantityControl from "./QuantityControl";
import { useDispatch, useSelector } from "react-redux";
import {
    changeProductQuantity,
    removeProduct,
} from "../redux/slices/cartSlice";

function CartItem({ product, quantity }) {
    const [localQuantity, setLocalQuantity] = useState(quantity);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    function handleDecreaseQuantity() {
        setLocalQuantity(localQuantity - 1);
        if (cart.find((e) => e._id === product._id))
            dispatch(
                changeProductQuantity([
                    { _id: product._id, quantity: localQuantity - 1 },
                ])
            );
    }
    function handleIncreaseQuantity() {
        setLocalQuantity(localQuantity + 1);
        if (cart.find((e) => e._id === product._id))
            dispatch(
                changeProductQuantity([
                    { _id: product._id, quantity: localQuantity + 1 },
                ])
            );
    }
    function handleRemoveCartElement() {
        dispatch(removeProduct({ _id: product._id }));
    }

    return (
        <Row
            className="align-items-center p-2"
            style={{ borderBottom: "1px solid white" }}
        >
            <Col md={2}>
                <Image src={product.image} alt={product.name} fluid rounded />
            </Col>
            <Col md={6}>
                <Link to={`/product/${product._id}`}>{product.name}</Link>
            </Col>
            <Col md={1}>${product.price}</Col>
            <Col md={2}>
                <QuantityControl
                    maxCount={product.countInStock}
                    quantity={quantity}
                    onDecrease={handleDecreaseQuantity}
                    onIncrease={handleIncreaseQuantity}
                />
            </Col>
            <Col md={1}>
                <Button
                    size="sm"
                    className="btn-w-hover"
                    onClick={handleRemoveCartElement}
                >
                    <i className="fa fa-trash" />
                </Button>
            </Col>
        </Row>
    );
}

export default CartItem;
