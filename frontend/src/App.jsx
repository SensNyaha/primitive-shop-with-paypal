import React, { useEffect } from "react";

import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

import { useDispatch, useSelector } from "react-redux";
import { changeProductQuantity } from "./redux/slices/cartSlice";
import CartScreen from "./screens/CartScreen";
import { loginUserSuccess } from "./redux/slices/authSlice";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import axios from "axios";

function App() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        const cartFromLocal = localStorage.getItem("cart");
        if (cartFromLocal)
            dispatch(changeProductQuantity(JSON.parse(cartFromLocal)));

        const userFromLocal = localStorage.getItem("userInfo");
        if (userFromLocal)
            dispatch(loginUserSuccess(JSON.parse(userFromLocal)));
    }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            axios.post(
                "/api/cart/set-new-item",
                { items: cart },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
        }
    }, [cart, userInfo]);

    useEffect(() => {
        if (userInfo && userInfo.cart) {
            const tempCart = [...userInfo.cart];

            if (cart && cart.length) {
                cart.forEach((cartProduct) => {
                    const merge = tempCart.find(
                        (elem) => elem.id === cartProduct._id
                    );

                    if (merge) merge.quantity = cartProduct.quantity;
                });
            }

            dispatch(changeProductQuantity(JSON.parse(tempCart)));
            axios.post(
                "/api/cart/set-new-item",
                { items: tempCart },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
        }
    }, [userInfo]);

    return (
        <>
            <Header />
            <main className="py-3 mb-auto" style={{ flexGrow: 1 }}>
                <Container style={{ height: "100%" }}>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route
                            path="/product/:id"
                            element={<ProductScreen />}
                        />
                        <Route path="/cart" element={<CartScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                    </Routes>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
