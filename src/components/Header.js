import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Header(props) {
    const afterScroll = {
        backgroundColor: "black",
        // opacity: '1',
        transition: "all .5s"
    }

    const initialStyle = {
        backgroundColor: "transparent",
        // opacity: '0',
        transition: "all .5s"
    }

    return (
        <div id='header'>
            <Navbar fixed="top" expand="lg" className="navbar pt-0" style={props.state.scroll ? afterScroll : initialStyle}>
                <Container>
                    <Navbar.Brand href="#home" className='fs-1 text-white'><span id='logoFirst'>Code</span><span id='logoSecond' className='fw-light'>Pilot</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                    // style={{backgroundColor: "transparent"}}
                    >
                    <Offcanvas.Header closeButton className='sidebar'>
                        {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                        Offcanvas
                        </Offcanvas.Title> */}
                    </Offcanvas.Header>
                    <Offcanvas.Body className="sidebar">
                        <Nav className="justify-content-center flex-grow-1 pe-3">
                            <Nav.Link href="#action1" className='fs-5 link me-4' style={{color: props.state.color}}>Playground</Nav.Link>
                            <Nav.Link href="#action2" className='fs-5 link me-4' style={{color: props.state.color}}>Github</Nav.Link>
                            <Nav.Link href="#action2" className='fs-5 link' style={{color: props.state.color}}>Suggestion</Nav.Link>
                            {!props.state.large && <Nav.Link href="#signin" className="fs-5 link" style={{color: props.state.color}}>Sign In</Nav.Link>}
                        </Nav>
                        {props.state.large && <Nav.Link href="#signin" id="signin" className="fs-4" style={{color: props.state.color}}>Sign In</Nav.Link>}
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <Col className='title row-gap-3'>
                <h1 className='display-3 display-md-1 fw-normal'>Introducing CodePilot, a developer’s co-pilot</h1>
                <div id="try">
                    <Button variant="outline-light btn-lg btn">Try it Online</Button>
                </div>
            </Col>
        </div>
    )
}