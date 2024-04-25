import { useEffect, useState } from "react";

import axios from "axios";

import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import SpinnerWrapper from "../components/SpinnerWrapper";

function HomeScreen() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/products").then(({ data }) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <h1>Latest Products</h1>
            <SpinnerWrapper isLoading={isLoading} />
            <Row>
                {products.map((p) => (
                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={p} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default HomeScreen;
