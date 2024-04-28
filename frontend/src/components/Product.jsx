import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    addLoadingID,
    getProductsInfoById,
} from "../redux/slices/productsSlice";
import SpinnerWrapper from "./SpinnerWrapper";

function Product({ _id: pID }) {
    const { productList, loadingIDs } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(null);
    const [product, setProduct] = useState(false);

    useEffect(() => {
        setIsLoading(loadingIDs?.includes(pID));
    }, [loadingIDs, pID]);

    useEffect(() => {
        const existProduct = productList.find((e) => e._id === pID);

        if (existProduct) setProduct(existProduct);
        else {
            dispatch(addLoadingID(pID));
            dispatch(getProductsInfoById(pID));
        }
    }, [dispatch, productList, pID]);

    return (
        <Card
            className="my-3 p-3 rounded"
            style={{ height: "100%", position: "relative" }}
        >
            <div
                className="d-flex"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <SpinnerWrapper
                    isLoading={isImageLoaded === false || isLoading}
                    className="spinner-wrapper__card"
                />
            </div>
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant="top"
                    onLoad={() => {
                        setTimeout(() => {
                            setIsImageLoaded(true);
                        }, 200);
                    }}
                />
            </Link>
            <Card.Body
                className="d-flex flex-column"
                style={{ padding: "10px 8px 0" }}
            >
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name || " "}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div" style={{ marginTop: "auto" }}>
                    <Rating
                        value={product.rating || 3.5}
                        text={`${product.numReviews || 0} reviews`}
                        color={
                            product.rating < 1.5
                                ? "red"
                                : product.rating >= 3.5
                                ? "darkgreen"
                                : "#ff8300"
                        }
                    />
                </Card.Text>
                <Card.Text as="h3" className="text-end">
                    ${product.price || 0}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
