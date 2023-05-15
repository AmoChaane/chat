import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Stack } from 'react-bootstrap';
import React, { useRef, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import pic from "../images/7123025_logo_google_g_icon.png"
import pic2 from "../images/undraw_pair_programming_re_or4x.svg"

export default function Sign() {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
            <div className="d-flex p-4" style={{border: "1px solid #CED4DA", borderRadius: "7px"}}>
                <img className='d-lg-block d-none' style={{width: "30em"}} src={pic2} alt=""/>
                <Form className="">
                    <h2 style={{textAlign: "center"}} className="mb-4">Create Account</h2>
                    <Row className="mb-4">
                        <Col>
                            <FloatingLabel label="First Name">
                                <Form.Control placeholder="Katniss"></Form.Control>
                            </FloatingLabel>
                            
                        </Col>
                        <Col>
                            <FloatingLabel label="Last Name">
                                <Form.Control placeholder="Everdeen"></Form.Control>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <FloatingLabel label="Email Address">
                        <Form.Control className="mb-4" type="email" placeholder="katnisseverdeen@gmail.com"></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel label="Password">
                        <Form.Control className="mb-4" type="password" placeholder="Enter password"></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel label="Repeat Password">
                        <Form.Control className="mb-4" type="password" placeholder="Repeat password"></Form.Control>
                    </FloatingLabel>
                    <Button className="w-100 mb-2" variant="dark">Create Account</Button>
                    <Form.Text>Already have an account? <Link to="/log">Log In</Link></Form.Text>
                    <hr/>
                    <Row>
                        <Col>
                            <Button className="w-100 d-flex align-items-center justify-content-center" variant="outline-dark"><img id="google-icon" src={pic} alt="google-icon" />Sign Up with Google</Button>
                        </Col>
                        {/* <Col><Button variant="outline-dark">Dark</Button></Col> */}
                    </Row>
                </Form>
            </div>
        </Container>
    )
}