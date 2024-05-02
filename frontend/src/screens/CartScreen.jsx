import React, { useEffect, useState } from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import axios from "axios";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

function CartScreen() {
    const cart = useSelector((state) => state.cart);
    const [cartItems, setCartItems] = useState([]);

    const navi = useNavigate();

    useEffect(() => {
        setCartItems(
            cartItems.filter(
                (el) => cart.findIndex((cel) => cel._id === el._id) !== -1
            )
        );
        cart.forEach((prod) => {
            axios.get("/api/products/" + prod._id).then(({ data }) => {
                if (!cartItems.find((elem) => elem._id === prod._id))
                    setCartItems((state) => [...state, data]);
            });
        });
    }, [cart]);

    function checkoutHandler() {
        navi("/login?redirect=shipping");
    }

    return (
        <Row>
            <h1>Shopping Cart</h1>{" "}
            <Col xs={12}>
                <Row
                    style={{ border: "1px solid #fff" }}
                    className="align-items-center p-3 mb-2"
                >
                    <Col xs={9}>
                        <h4 style={{ marginBottom: 0 }}>
                            Subtotal of{" "}
                            {cart?.reduce(
                                (prev, cur) => (prev += cur.quantity),
                                0
                            )}{" "}
                            items :{" "}
                            <span style={{ fontWeight: 700 }}>
                                $
                                {cart
                                    ?.reduce(
                                        (prev, cur) =>
                                            (prev +=
                                                cur.quantity *
                                                    cartItems.find(
                                                        (e) => e._id === cur._id
                                                    )?.price || 0),
                                        0
                                    )
                                    .toFixed(2)}
                            </span>
                        </h4>
                    </Col>{" "}
                    <Col sm={3}>
                        <Button
                            type="button"
                            className="d-block btn-w-hover ms-auto"
                            disabled={cart.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed to Checkout
                        </Button>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                {cart.length === 0 && (
                    <Message variant="info">
                        Your cart is empty! <Link to="/">Go Back shopping</Link>
                    </Message>
                )}
                {cartItems.length > 0 && (
                    <ListGroup variant="flush">
                        {cartItems.map((el) => {
                            return (
                                <ListGroup.Item key={el._id}>
                                    <CartItem
                                        product={el}
                                        quantity={
                                            cart.find(
                                                (product) =>
                                                    product._id === el._id
                                            )?.quantity
                                        }
                                    />
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                )}
            </Col>
        </Row>
    );
}

export default CartScreen;
