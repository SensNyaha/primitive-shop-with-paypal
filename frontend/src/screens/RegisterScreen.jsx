import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import SpinnerWrapper from "../components/SpinnerWrapper";
import FormContainer from "../components/FormContainer";
import { fetchRegister } from "../redux/slices/registerSlice";

function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [message, setMessage] = useState(null);

    const navi = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector((state) => state.register);

    const redirect = window.location.search
        ? window.location.search.split("=")[1]
        : "";

    const submitHandler = (e) => {
        setMessage(null);
        e.preventDefault();

        if (password !== passwordConfirmation)
            return setMessage("Passwords dont match");

        dispatch(fetchRegister({ name, email, password }));
    };

    useEffect(() => {
        userInfo && navi(`/${redirect}`);
    }, [navi, userInfo, redirect]);

    return (
        <FormContainer>
            <h1>Registration</h1>
            <SpinnerWrapper isLoading={loading} className={"spinner-wrapper"} />
            {error && <Message variant="warning">{error}</Message>}
            {message && <Message variant="info">{message}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="mt-3">
                    <Form.Label>name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
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
                <Form.Group controlId="passwordConfirmation" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="password confirmation"
                        value={passwordConfirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                    />
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    className="mt-3 d-block mx-auto btn-w-hover"
                >
                    Register
                </Button>
            </Form>
            <Row className="py-3 text-center">
                <Col>
                    Have an Account?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        Then Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default RegisterScreen;
