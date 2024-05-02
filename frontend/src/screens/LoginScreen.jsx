import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import SpinnerWrapper from "../components/SpinnerWrapper";
import FormContainer from "../components/FormContainer";
import { fetchLogin } from "../redux/slices/authSlice";

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navi = useNavigate();
    const dispatch = useDispatch();

    const redirect = window.location.search
        ? window.location.search.split("=")[1]
        : "";

    const { loading, error, userInfo } = useSelector((state) => state.auth);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(fetchLogin({ email, password }));
    };

    useEffect(() => {
        userInfo && navi(`/${redirect}`);
    }, [navi, userInfo, redirect]);

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <SpinnerWrapper isLoading={loading} className={"spinner-wrapper"} />
            {error && <Message variant="warning">{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    className="mt-3 d-block mx-auto btn-w-hover"
                >
                    Sign In
                </Button>
            </Form>
            <Row className="py-3 text-center">
                <Col>
                    New Customer?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        Then Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;
