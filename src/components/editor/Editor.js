// import Sidebar from "./Sidebar"
// import Main from "./Main"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Stack } from 'react-bootstrap';
import {basicSetup} from "codemirror"
import {EditorView, keymap} from "@codemirror/view"
import {indentWithTab} from "@codemirror/commands"
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';

function Editor() {
  const [split, setSplit] = React.useState(false);
  const editorRef = useRef(null);
  const responseRef = useRef(null);
  const spinnerRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showBtns, setShowBtns] = useState(true)
  const [state, setState] = useState({
    color: "white",
    large: window.innerWidth >= 992 ? true : false,
    scroll: false,
    show: false
  })
  console.log('state updated');
  console.log(showBtns);

  let int;

  document.querySelector("#root").style.display = 'flex';
  document.querySelector("#root").style.flexDirection = 'column';
  document.querySelector("#root").style.height = '100vh';
  // flex-direction: column;
  //   height: 100vh;


  useEffect(() => { // in case window is resized
    const handleResize = () => {
      if(window.innerWidth >= 992) {
        setState(prev => {
          return {
            color: "white",
            large: true
          }
        });
      } else {
        setState(prev => {
          return {
            color: "black",
            large: false
          }
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    const chalky = "#e5c07b",
    ivory = "#abb2bf",
    stone = "#7d8799", // Brightened compared to original to increase contrast
    darkBackground = "#21252b",
    highlightBackground = "#2c313a",
    background = "#282c34",
    tooltipBackground = "#353a42",
    selection = "#3E4451",
    cursor = "#528bff"


    let myTheme = EditorView.theme({
        "&": {
          color: ivory,
          backgroundColor: background
        },
      
        ".cm-content": {
          caretColor: cursor
        },
      
        ".cm-cursor, .cm-dropCursor": {borderLeftColor: cursor},
        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {backgroundColor: selection},
      
        ".cm-panels": {backgroundColor: darkBackground, color: ivory},
        ".cm-panels.cm-panels-top": {borderBottom: "2px solid black"},
        ".cm-panels.cm-panels-bottom": {borderTop: "2px solid black"},
      
        ".cm-searchMatch": {
          backgroundColor: "#72a1ff59",
          outline: "1px solid #457dff"
        },
        ".cm-searchMatch.cm-searchMatch-selected": {
          backgroundColor: "#6199ff2f"
        },
      
        ".cm-activeLine": {backgroundColor: "#6699ff0b"},
        ".cm-selectionMatch": {backgroundColor: "#aafe661a"},
      
        "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
          backgroundColor: "#bad0f847"
        },
      
        ".cm-gutters": {
          backgroundColor: background,
          color: stone,
          border: "none"
        },
      
        ".cm-activeLineGutter": {
          backgroundColor: highlightBackground
        },
      
        ".cm-foldPlaceholder": {
          backgroundColor: "transparent",
          border: "none",
          color: "#ddd"
        },
      
        ".cm-tooltip": {
          border: "none",
          backgroundColor: tooltipBackground
        },
        ".cm-tooltip .cm-tooltip-arrow:before": {
          borderTopColor: "transparent",
          borderBottomColor: "transparent"
        },
        ".cm-tooltip .cm-tooltip-arrow:after": {
          borderTopColor: tooltipBackground,
          borderBottomColor: tooltipBackground
        },
        ".cm-tooltip-autocomplete": {
          "& > ul > li[aria-selected]": {
            backgroundColor: highlightBackground,
            color: ivory
          }
        }
      }, {dark: true})

      useEffect(() => {
        if (editorRef.current) {
          new EditorView({
            extensions: [basicSetup, keymap.of([indentWithTab]), myTheme],
            parent: editorRef.current,
          });
        }
        return () => {
          return
        };
      }, []);

      function splitScreen() {
        setSplit(true)
      }

      function call() {
        spinnerRef.current.style.display = 'block';
        setTimeout(() =>  {
          spinnerRef.current.style.display = 'none';
          let newStr = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis voluptatibus consectetur odio non ratione pariatur excepturi, laudantium, quis ipsa, libero modi minima veritatis? Omnis atque temporibus corrupti esse illum? Eligendi a facilis praesentium quia impedit error. Alias nisi odio vitae accusantium natus incidunt aperiam, ipsum corrupti laudantium error officia magni, voluptate, expedita eveniet beatae! Tempore aperiam minus laboriosam modi id dolor architecto enim temporibus asperiores delectus! Aliquid culpa modi iusto quibusdam illum, vitae explicabo saepe fugit, qui repellat corporis ipsa porro similique veniam dolore suscipit vel eum ex ad iure. Commodi at quam atque officiis consequatur aperiam corrupti, amet nostrum!"
          setSplit(true)

          responseRef.current.textContent = '';
          int = setInterval(() => {
            if(newStr && responseRef.current) {
              if(responseRef.current) responseRef.current.textContent += newStr[0];
              newStr = newStr.slice(1)
              console.log('running...');
            }
          }, 10);
        }, 3000)
      }

      function revert() {
        setSplit(false)
      }

      function controlBtns() {
        setShowBtns(!showBtns)
      }

      useEffect(() => {
        return () => {
          clearInterval(int)
        }
      }, []);


    return (
      <>
        <Navbar className="d-lg-none p-0" style={{background: "#232223", borderBottom: "1px solid #b0b1bb"}}>
          <Container fluid className="">
            <h1 onClick={handleShow}><i style={{color: "#B0B1BB", cursor: "pointer"}} className="fs-3 fa-solid fa-bars"></i></h1>
            <div style={{width: "100%", textAlign: "center"}}>
              <Link to="/" style={{textAlign: "center", textDecoration: "none"}} className='fs-1 text-white'><span id='logoFirst'>Code</span><span id='logoSecond' className='fw-light'>Pilot</span></Link>
            </div>
          </Container>
        </Navbar>
        <Container fluid id="container" className="p-0 d-flex" style={{height: "100%"}}>
          <div ref={spinnerRef} id="overlay">
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
          <Offcanvas show={show} onHide={handleClose} style={{background: "#333334"}} className="text-white  p-3">
              <Offcanvas.Header closeButton closeVariant='white'>
                {/* <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title> */}
              </Offcanvas.Header>
              {/* <Offcanvas.Body className="pt-0" style={{height: "100vh"}}> */}
              <h3 className='text-white fw-5 fs-5 mt-4'>History</h3>
                <div className="text-white" style={{overflowY: "auto"}}>
                    <Stack gap={3} className=''>
                      <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Javascript Functions</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Control Flow</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Conditional Statement</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Binary Operator</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Memory Allocator</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Python Variables</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Game Design vs Game Development</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Game Design vs Game Development</span>
                        </div>  
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Game Design vs Game Development</span>
                        </div>  
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Game Design vs Game Development</span>
                        </div>  
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Game Design vs Game Development</span>
                        </div>  
                    </Stack>  
                </div>
                <div>
                    <div className='mb-4 mt-3' style={{height: "1px", background: "white"}}></div>
                    <div className='d-flex flex-column gap-4 text-white'>
                        <div className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                            <i className="fa-solid fa-trash"></i>
                            <a style={{textDecoration: "none"}}  className='fs-5 m-0 text-white'>Clear History</a>
                        </div>
                        <div className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                            <i className="fa-solid fa-gear"></i>
                            <a style={{textDecoration: "none"}}  className='fs-5 m-0 text-white'>Settings</a>
                        </div>
                        <div className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                            <i className="fa-solid fa-house"></i>
                            <Link to="/" style={{textDecoration: "none"}} className='fs-5 m-0 text-white'>Return to Home</Link>
                        </div>
                    </div>
                </div>
              {/* </Offcanvas.Body> */}
            </Offcanvas>
            <Col id='sidebar' lg={3} className='d-lg-flex d-none flex-column justify-content-between h-100 p-4'>
                <Link to="/" style={{textAlign: "center", textDecoration: "none"}} className='fs-1 text-white'><span id='logoFirst'>Code</span><span id='logoSecond' className='fw-light'>Pilot</span></Link>
                <h3 className='text-white fw-5 fs-5 mt-4'>History</h3>
                <div className="text-white" style={{overflowY: "auto"}}>
                    <Stack gap={3} className='pe-2'>
                      <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Javascript Functions</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Control Flow</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Conditional Statement</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Binary Operator</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Memory Allocator</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Python Variables</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Game Design vs Game Development</span>
                        </div>
                        <div className='history-item d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <span className='fs-6'>Game Design vs Game Development</span>
                        </div>  
                    </Stack>  
                </div>
                <div>
                    <div className='mb-4 mt-3' style={{height: "1px", background: "white"}}></div>
                    <div className='d-flex flex-column gap-4 text-white'>
                        <div className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                            <i className="fa-solid fa-trash"></i>
                            <a style={{textDecoration: "none"}}  className='fs-5 m-0 text-white'>Clear History</a>
                        </div>
                        <div className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                            <i className="fa-solid fa-gear"></i>
                            <a style={{textDecoration: "none"}}  className='fs-5 m-0 text-white'>Settings</a>
                        </div>
                        <div className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                            <i className="fa-solid fa-house"></i>
                            <Link to="/" style={{textDecoration: "none"}} className='fs-5 m-0 text-white'>Return to Home</Link>
                        </div>
                    </div>
                </div>
            </Col>
            <Col>
            {
              state.large ?
                <div className='d-flex h-100 w-100'>
                  <div ref={editorRef} className='h-100' style={{position: 'relative', width: !split ? "100%" : "50%", transition: "all 2s"}}>
                    {/* <i onClick={call} style={{position: "absolute", transform: "translateX(-50%)", bottom: "15px", right: "50%", zIndex: "3", cursor: "pointer"}} id="enter" className="fs-3 text-white fa-solid fa-arrow-right"></i> */}
                    <Row className="p-2 gap-2 flex-nowrap" style={{borderRadius: "25px", background: "rgb(51,51,52)", position: "absolute", transform: "translateX(-50%)", bottom: "15px", left: "50%", zIndex: "8", cursor: "pointer"}}>
                      {
                        split && 
                        <>
                          <Col style={{display: showBtns ? "flex" : "none"}} onClick={revert} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                            <i className=" fa-solid fa-arrow-left"></i>
                          </Col>
                          <Col style={{display: showBtns ? "flex" : "none"}}  onClick={call} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                            <i className=" fa-solid fa-rotate-left"></i>
                          </Col>
                        </>
                        
                      }
                      <Col style={{display: showBtns ? "flex" : "none"}}  onClick={call} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                        <i className=" fa-solid fa-paper-plane"></i>
                      </Col>
                      <Col onClick={controlBtns} className="hide d-flex align-items-center justify-content-center">{showBtns ? "Hide" : "Show"}</Col>
                    </Row>
                  </div>
                  <div className='' style={{ width: !split ? "0%" : "50%", transition: "all 2s", maxWidth: "50%"}}>
                    <pre ref={responseRef} className='pre-wrap'></pre>
                  </div>
                </div>
            
                  :

                <div style={{overflow: "hidden"}} className='d-flex flex-column h-100 w-100'>
                  <div ref={editorRef} className='' style={{position: 'relative', height: !split ? "100%" : "45%", transition: "all 2s"}}>
                    {/* <i onClick={call} style={{position: "absolute", transform: "translateX(-50%)", bottom: "15px", right: "50%", zIndex: "3", cursor: "pointer"}} className="fs-3 text-white fa-solid fa-arrow-right"></i> */}
                    <Row className="p-2 gap-2 flex-nowrap" style={{borderRadius: "25px", background: "rgb(51,51,52)", position: "absolute", transform: "translateX(-50%)", bottom: "15px", left: "50%", zIndex: "8", cursor: "pointer"}}>
                      {
                        split && 
                        <>
                          <Col style={{display: showBtns ? "flex" : "none"}}  onClick={revert} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                            <i className=" fa-solid fa-arrow-left"></i>
                          </Col>
                          <Col style={{display: showBtns ? "flex" : "none"}}  onClick={call} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                            <i className=" fa-solid fa-rotate-left"></i>
                          </Col>
                        </>
                        
                      }
                      <Col style={{display: showBtns ? "flex" : "none"}}  onClick={call} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                        <i className=" fa-solid fa-paper-plane"></i>
                      </Col>
                      <Col onClick={controlBtns} className="hide d-flex align-items-center justify-content-center">Hide</Col>
                    </Row>
                  </div>
                  <div className='' style={{ height: !split ? "0%" : "55%", transition: "all 2s", maxHeight: "55%"}}>
                    <pre ref={responseRef} className='pre-wrap'></pre>
                  </div>
                </div>
            }
            </Col>
        </Container>
      </>
    )
}


export default Editor