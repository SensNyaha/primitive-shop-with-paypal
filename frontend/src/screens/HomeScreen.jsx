import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import SpinnerWrapper from "../components/SpinnerWrapper";
import { getProductsIDs } from "../redux/slices/productsSlice";
import Message from "../components/Message";

function HomeScreen() {
    const { productIDs, loadingIDs, error } = useSelector(
        (state) => state.products
    );
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [fetchedOnce, setFetchedOnce] = useState(false);

    useEffect(() => {
        setIsLoading(loadingIDs?.includes("all"));
    }, [loadingIDs]);

    useEffect(() => {
        dispatch(getProductsIDs());
        setFetchedOnce(true);
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            <SpinnerWrapper
                isLoading={isLoading}
                className={"spinner-wrapper"}
            />
            {!!productIDs.length && (
                <Row>
                    {productIDs.map((pID) => (
                        <Col key={pID} sm={12} md={6} lg={4} xl={3}>
                            <Product _id={pID} />
                        </Col>
                    ))}
                </Row>
            )}
            {!productIDs.length && !isLoading && fetchedOnce && (
                <Message variant="danger">
                    Sorry, we couldn't get all products list <br />
                    {error}
                </Message>
            )}
        </>
    );
}

export default HomeScreen;
