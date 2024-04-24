import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {
    return (
        <header>
            <Navbar expand="lg" collapseOnSelect className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Junky Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/cart" className="ms-auto">
                                <i className="fas fa-shopping-cart" />
                                &nbsp;Cart
                            </Nav.Link>
                            <Nav.Link href="/sign-in" className="ms-auto">
                                <i className="fas fa-user" />
                                &nbsp;Sign In
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
