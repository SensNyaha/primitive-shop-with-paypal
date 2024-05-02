import { useDispatch, useSelector } from "react-redux";

import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logoutUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

function Header() {
    const cart = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const navi = useNavigate();

    const dispatch = useDispatch();

    return (
        <header>
            <Navbar expand="lg" collapseOnSelect className="bg-body-tertiary">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Junky Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link
                                    className="ms-auto position-relative"
                                    style={{ position: "relative" }}
                                >
                                    {cart && cart.length > 0 && (
                                        <span className="cart__count">
                                            {cart.length}
                                        </span>
                                    )}
                                    <i className="fas fa-shopping-cart" />
                                    &nbsp;Cart
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item
                                        onClick={() => {
                                            dispatch(logoutUser());
                                            dispatch(clearCart());
                                            navi("/");
                                        }}
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link href="/login" className="ms-auto">
                                        <i className="fas fa-user" />
                                        &nbsp;Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
