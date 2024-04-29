import React, { useEffect } from "react";

import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

import { useDispatch } from "react-redux";
import { changeProductQuantity } from "./redux/slices/cartSlice";
import CartScreen from "./screens/CartScreen";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const cartFromLocal = localStorage.getItem("cart");
        if (cartFromLocal)
            dispatch(changeProductQuantity(JSON.parse(cartFromLocal)));
    }, [dispatch]);

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
                    </Routes>
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
