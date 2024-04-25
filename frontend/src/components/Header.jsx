import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
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
                                    className="ms-auto"
                                    style={{ padding: "2px 5px 0 0" }}
                                >
                                    <i className="fas fa-shopping-cart" />
                                    &nbsp;Cart
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/sign-in">
                                <Nav.Link href="/sign-in" className="ms-auto">
                                    <i className="fas fa-user" />
                                    &nbsp;Sign In
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
