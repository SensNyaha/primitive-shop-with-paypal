import { useEffect, useState } from "react";

import axios from "axios";

import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import SpinnerWrapper from "../components/SpinnerWrapper";

function HomeScreen() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/products")
            .then(({ data }) => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    return (
        <>
            <h1>Latest Products</h1>
            <SpinnerWrapper isLoading={isLoading} />
            {!!products.length && (
                <Row>
                    {products.map((p) => (
                        <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={p} />
                        </Col>
                    ))}
                </Row>
            )}
            {!products.length && !isLoading && (
                <h3 className="text-center mt-5">
                    Sorry, we couldn't get all products list
                </h3>
            )}
        </>
    );
}

export default HomeScreen;
