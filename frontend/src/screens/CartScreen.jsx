import React, { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import axios from "axios";
import CartItem from "../components/CartItem";

function CartScreen() {
    const cart = useSelector((state) => state.cart);
    const [cartItems, setCartItems] = useState([]);

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

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
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
            <Col md={4}>
                <Card style={{ border: "1px solid #fff" }}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3 className="text-end">
                                Subtotal of{" "}
                                {cart?.reduce(
                                    (prev, cur) => (prev += cur.quantity),
                                    0
                                )}{" "}
                                items
                            </h3>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;
