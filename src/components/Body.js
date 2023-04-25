import React from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import pic from "../images/pexels-scott-webb-2346594.jpg"
import pic2 from "../images/pexels-lucky-5374862.jpg"

export default function Body(props){
    return (
        <div className="body bg-black">
            <Container>
                <Row className="d-flex flex-direction-column justify-content-center align-items-center">
                    <h1 className='display-5 fw-normal mt-5 text-white' style={{textAlign: "center"}}>What is CodePilot?</h1>
                    <p className="fs-4 text-white" style={{textAlign: "center"}}>
                        CodePilot is a system that uses AI to provide automated code optimization and analysis.
                        Basically just fixes all your bugs.
                    </p>
                </Row>
                <div style={{height: "2px", background: "white", margin: "80px 0 80px 0"}}></div>
                <Row className="flex-lg-row flex-column g-5">
                    {
                        props.state.large ? 
                        <>
                            <Col>
                                <img src={pic} alt="picture1" style={{width: "100%", height: "500px"}}/>
                            </Col>
                            <Col>
                                <h1 className='display-5 fw-normal mt-5 text-white' style={{textAlign: "center"}}>What does it do??</h1>
                                <p className="fs-5 text-white" style={{textAlign: "center"}}>
                                    This system takes in code from the user and then returns the corrected version of the code along 
                                    with explanations of the changes implemented and an analysis of the provided code. It was 
                                    designed to support all languages
                                </p>
                            </Col>
                        </>
                        :
                        <>
                            <Col>
                                <h1 className='display-5 fw-normal mt-5 text-white' style={{textAlign: "center"}}>What is CodePilot?</h1>
                                <p className="fs-5 text-white" style={{textAlign: "center"}}>
                                    This system takes in code from the user and then returns the corrected version of the code along 
                                    with explanations of the changes implemented and an analysis of the provided code. It was 
                                    designed to support all languages
                                </p>
                            </Col>
                            <Col>
                                <img src={pic} alt="picture1" style={{width: "100%", height: "500px"}}/>
                            </Col>
                        </>
                    }
                </Row>
                <div style={{height: "2px", background: "white", margin: "80px 0 20px 0"}}></div>
                <Row style={{marginBottom: "70px"}}>
                    <h1 className='display-5 fw-normal mt-5 text-white' style={{textAlign: "center", marginBottom: "30px"}}>System Capabilities</h1>
                    <Row className="flex-lg-row flex-column">
                        <Col>
                            <h1 className="fs-2 text-white fw-light" style={{textAlign: "center"}}>Syntax Correction</h1>
                            <p className="fs-6 text-white" style={{textAlign: "center"}}>
                                Automatically correct syntax errors, missing or misplaced brackets, and other common coding mistakes.
                            </p>
                        </Col>
                        <Col>
                            <h1 className="fs-2 text-white fw-light" style={{textAlign: "center"}}>Code Formatting</h1>
                            <p className="fs-6 text-white" style={{textAlign: "center"}}>
                            Automatically format code to adhere to standard coding conventions and improve readability.
                            </p>
                        </Col>
                        <Col>
                            <h1 className="fs-2 text-white fw-light" style={{textAlign: "center"}}>Multi-Language Support</h1>
                            <p className="fs-6 text-white" style={{textAlign: "center"}}>
                            Provide automated code fixing for multiple programming languages, such as Python, Java, C++, and others.
                            </p></Col>
                    </Row>
                </Row>

                <Row style={{marginBottom: "100px"}} className="justify-content-center">
                    <i className="fa-solid fa-quote-left text-white" style={{fontSize: "5rem", textAlign: "center"}}></i>
                    <div style={{height: "4px", background: "white", marginTop: "15px", marginBottom: "15px", width: "55vw"}}></div>
                    <p className="fs-3 text-white pe-5 ps-5" style={{textAlign: "center", fontStyle: "italic"}}>
                        The computer is incredibly fast, accurate, and stupid. Man is incredibly slow, inaccurate, and 
                        brilliant. The marriage of the two is a force beyond calculation. 
                    </p>
                    <p className="fs-1 fw-light text-white" style={{textAlign: "center"}}>- Leo Cherne</p>
                    <div style={{height: "4px", background: "white", marginTop: "15px", width: "55vw"}}></div>
                </Row>

                <Row style={{paddingBottom: "100px"}} className="flex-lg-row flex-column">
                    {
                        props.state.large ? 
                        <>
                            <Col>
                            <h1 className='display-5 fw-normal mt-5 text-white' style={{textAlign: "center"}}>Why CodePilot?</h1>
                                <p className="fs-5 text-white" style={{textAlign: "center"}}>
                                    CodePilot can assist coders in their work by automating repetitive and time-consuming tasks, 
                                    such as debugging, code testing, and optimization. CodePilot can also help programmers to 
                                    identify errors and vulnerabilities in their code, suggest improvements, and generate code 
                                    snippets that can be used to speed up the development process. With AI assistance, coders 
                                    can work more efficiently, improve code quality, and focus on higher-level tasks that require 
                                    human creativity and problem-solving skills.
                                </p>
                            </Col>
                            <Col>
                                <img src={pic2} alt="picture2" style={{width: "100%", height: "500px"}}/>
                            </Col>
                        </>
                        :
                        <>
                            <Col>
                                <img src={pic2} alt="picture2" style={{width: "100%", height: "500px"}}/>
                            </Col>
                            <Col>
                            <h1 className='display-5 fw-normal mt-5 text-white' style={{textAlign: "center"}}>Why CodePilot?</h1>
                                <p className="fs-5 text-white" style={{textAlign: "center"}}>
                                    CodePilot can assist coders in their work by automating repetitive and time-consuming tasks, 
                                    such as debugging, code testing, and optimization. CodePilot can also help programmers to 
                                    identify errors and vulnerabilities in their code, suggest improvements, and generate code 
                                    snippets that can be used to speed up the development process. With AI assistance, coders 
                                    can work more efficiently, improve code quality, and focus on higher-level tasks that require 
                                    human creativity and problem-solving skills.
                                </p>
                            </Col>
                        </>
                    }
                </Row>
            </Container>
        </div>
    )
}