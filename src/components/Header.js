import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import pic from "../images/pexels-lisa-fotios-16129703.jpg"
import pic1 from "../images/carousel/pexels-christina-morillo-1181676.jpg"
import pic2 from "../images/carousel/pexels-cottonbro-studio-6804604.jpg"
import pic3 from "../images/carousel/pexels-lisa-fotios-16129724.jpg"
import pic4 from "../images/carousel/pexels-mikhail-fesenko-9553909.jpg"

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

    function styles(image) {
        return {
            height: "100vh",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
            backgroundPositionY: "15%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover" 
        }
    }

    // const slideImg = {
    //     height: "100vh",
    //     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${pic})`,
    //     backgroundPositionY: "15%",
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover"
    // }

    return (
        <div id='header'>
            <Navbar fixed="top" expand="lg" className="navbar pt-0" style={props.state.scroll ? afterScroll : initialStyle}>
                <Container>
                    <Link to="/" style={{textDecoration: "none"}}>
                        <Navbar.Brand className='fs-1 text-white'><span id='logoFirst'>Code</span><span id='logoSecond' className='fw-light'>Pilot</span></Navbar.Brand>
                    </Link>
                    <span className='' style={{display: "flex", flexDirection: "column", rowGap: "7px"}}>
                        <span className="line d-lg-none d-block"></span>
                        <Navbar.Toggle className="d-lg-none d-block'" bsPrefix="collaps" aria-controls={`offcanvasNavbar-expand-lg`} />
                        <span className="line d-lg-none d-block"></span>
                    </span>
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                    // style={{backgroundColor: "transparent"}}
                    >
                    <Offcanvas.Header closeButton closeVariant='white' className='sidebar'>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="sidebar">
                        <Nav className="justify-content-center flex-grow-1 pe-3">
                            <Nav.Link style={{borderBottom: !props.state.large ? "1px solid white" : ""}} className='link text-white'><Link className='fs-5 me-4 text-white' style={{textDecoration: "none"}} to="/editor">Playground</Link></Nav.Link>
                            {/* <Link style={{color: "white", textDecoration: "none"}} to="/editor">Playground</Link> */}
                            {/* <Link to="/editor">Profile</Link> */}
                            <Nav.Link href="#action2" style={{borderBottom: !props.state.large ? "1px solid white" : ""}} className='fs-5 link me-4 text-white'>Github</Nav.Link>
                            <Nav.Link href="#action2" style={{borderBottom: !props.state.large ? "1px solid white" : ""}} className='fs-5 link text-white'>Suggestion</Nav.Link>
                            {/* {!props.state.large && <Nav.Link href="#signin" style={{borderBottom: !props.state.large ? "1px solid white" : ""}} className="fs-5 link text-white">Log In</Nav.Link>} */}
                        </Nav>
                        {/* {props.state.large && <Nav.Link href="#signin" id="signin" className="fs-4 text-white">Log In</Nav.Link>} */}
                        <div className="mt-4 mt-lg-0" style={{display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "8px", alignItems: "center"}}>
                            <Link to="/sign"><Button className="px-3 w-100" style={{borderRadius: "26px"}} variant="outline-light btn">Log In</Button></Link>
                            <Link to="/sign"><Button className="px-3 w-100" style={{borderRadius: "26px"}} variant="light">Sign Up</Button></Link>
                        </div>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <Carousel interval={1500} fade pause={false} className="h-100">
            <Carousel.Item className='h-100'>
                <img
                className="d-block w-100 slide h-100"
                src={pic}
                alt="First slide"
                style={{objectFit: "cover", objectPosition: "50% 15%"}}
                />
                {/* <div className='title row-gap-3' style={{zIndex: "8"}}>
                    <h1 className='display-3 display-md-1 fw-normal'>Introducing CodePilot, a developer’s co-pilot</h1>
                    <div id="try">
                        <Link to="/editor"><Button variant="outline-light btn-lg btn">Try it Online</Button></Link>
                    </div>
                </div> */}
                <div style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)", }}></div>
            </Carousel.Item>
            <Carousel.Item className='h-100'>
                <img
                className="d-block w-100 slide h-100"
                src={pic1}
                alt="Second slide"
                style={{objectFit: "cover", objectPosition: "50% 15%"}}
                />
                {/* <div className='title row-gap-3' style={{zIndex: "8"}}>
                    <h1 className='display-3 display-md-1 fw-normal'>Introducing CodePilot, a developer’s co-pilot</h1>
                    <div id="try">
                        <Link to="/editor"><Button variant="outline-light btn-lg btn">Try it Online</Button></Link>
                    </div>
                </div> */}
                <div style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)", }}></div>
            </Carousel.Item>
            <Carousel.Item className='h-100'>
                <img
                className="d-block w-100 slide h-100"
                src={pic2}
                alt="Third slide"
                style={{objectFit: "cover", objectPosition: "50% 15%"}}
                />
                {/* <div className='title row-gap-3' style={{zIndex: "8"}}>
                    <h1 className='display-3 display-md-1 fw-normal'>Introducing CodePilot, a developer’s co-pilot</h1>
                    <div id="try">
                        <Link to="/editor"><Button variant="outline-light btn-lg btn">Try it Online</Button></Link>
                    </div>
                </div> */}
                <div style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)", }}></div>
            </Carousel.Item>
            <Carousel.Item className='h-100'>
                <img
                className="d-block w-100 slide h-100"
                src={pic3}
                alt="Fourth slide"
                style={{objectFit: "cover", objectPosition: "50% 15%"}}
                />
                {/* <div className='title row-gap-3' style={{zIndex: "8"}}>
                    <h1 className='display-3 display-md-1 fw-normal'>Introducing CodePilot, a developer’s co-pilot</h1>
                    <div id="try">
                        <Link to="/editor"><Button variant="outline-light btn-lg btn">Try it Online</Button></Link>
                    </div>
                </div> */}
                <div style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)", }}></div>
            </Carousel.Item>
            <Carousel.Item className='h-100'>
                <img
                className="d-block w-100 slide h-100"
                src={pic4}
                alt="Fifth slide"
                style={{objectFit: "cover", objectPosition: "50% 15%"}}
                />
                {/* <div className='title row-gap-3' style={{zIndex: "8"}}>
                    <h1 className='display-3 display-md-1 fw-normal'>Introducing CodePilot, a developer’s co-pilot</h1>
                    <div id="try">
                        <Link to="/editor"><Button variant="outline-light btn-lg btn">Try it Online</Button></Link>
                    </div>
                </div> */}
                <div style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", }}></div>
            </Carousel.Item>
            </Carousel>
            
            <div className='title row-gap-3' style={{zIndex: "8"}}>
                <h1 className='display-3 display-md-1 fw-normal'>Introducing CodePilot, a developer’s co-pilot</h1>
                <div id="try">
                    <Link to="/editor"><Button variant="outline-light btn-lg btn">Try it Online</Button></Link>
                </div>
            </div>
        </div>
    )
}