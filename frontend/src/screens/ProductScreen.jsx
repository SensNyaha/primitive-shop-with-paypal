import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";

import Rating from "../components/Rating";
import axios from "axios";
import SpinnerWrapper from "../components/SpinnerWrapper";

function ProductScreen() {
    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/products/" + id).then(({ data }) => {
            setProduct(data);
            setIsLoading(false);
        });
    }, [id]);

    return (
        <>
            <Link className="btn btn-dark my-3 btn-w-hover" to="/">
                Go Back
            </Link>
            <SpinnerWrapper isLoading={isLoading} />
            <Row>
                <Col sm={12} md={6} lg={9}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width="100%"
                    />
                </Col>
                <Col sm={12} md={6} lg={3}>
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
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>{product.description}</ListGroup.Item>
                        <ListGroup.Item
                            className="mb-1 text-end"
                            style={{ fontWeight: 800 }}
                        >
                            Available:{" "}
                            {product.countInStock > 0
                                ? `${product.countInStock} pieces`
                                : "Out of stock"}
                        </ListGroup.Item>
                        <ListGroup.Item sm={12}>
                            <Button
                                className="btn-block btn-w-hover ms-auto d-block"
                                type="button"
                                disabled={product.countInStock <= 0}
                            >
                                Add to cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
}

export default ProductScreen;
