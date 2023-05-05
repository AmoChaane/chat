// import Sidebar from "./Sidebar"
// import Main from "./Main"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Col';
import { Stack } from 'react-bootstrap';
import {basicSetup} from "codemirror"
import {EditorView, keymap} from "@codemirror/view"
import {indentWithTab} from "@codemirror/commands"
import React, { useRef, useEffect } from "react";

function Editor() {
  console.log('editor');
  const [split, setSplit] = React.useState(false);
  const editorRef = useRef(null);
  const responseRef = useRef(null);
  const spinnerRef = useRef(null);


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
        console.log('component mounted');
        // const { basicSetup, indentWithTab, myTheme } = extensions;
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
          let interval;
          setSplit(true)

          responseRef.current.textContent = '';
          interval = setInterval(() => {
            if(newStr) {
              responseRef.current.textContent += newStr[0];
              newStr = newStr.slice(1)
              console.log('running...');
            }
          }, 10);
        }, 3000)

        
      }


    return (
        <Container fluid id="container" className="p-0 d-flex" style={{height: "100vh"}}>
          <div ref={spinnerRef} id="overlay">
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
            <Col id='sidebar' lg={3} className='d-flex flex-column justify-content-between h-100 p-4'>
                <div style={{maxHeight: "50%"}}>
                    <div style={{textAlign: "center"}}>
                      <a href="/code-pilot" style={{textAlign: "center", textDecoration: "none"}} className='fs-1 text-white'><span id='logoFirst'>Code</span><span id='logoSecond' className='fw-light'>Pilot</span></a>
                    </div>
                    <h3 className='text-white fw-5 fs-5 mt-4'>History</h3>
                    <Stack className="text-white justify-content-center" gap={3} style={{maxHeight: "100%", overflow: "auto"}}>
                        {/* <h4>No History Yet -_-</h4> */}
                        <div className='d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <h6>Javascript Functions</h6>
                        </div>
                        <div className='d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <h6>Control Flow</h6>
                        </div>
                        <div className='d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <h6>Conditional Statement</h6>
                        </div>
                        <div className='d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <h6>Binary Operator</h6>
                        </div>
                        <div className='d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <h6>Memory Allocator</h6>
                        </div>
                        <div className='d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <h6>Python Variables</h6>
                        </div>
                        <div className='d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <h6>Game Design vs Game Development</h6>
                        </div>
                        <div className='d-flex align-items-center' style={{columnGap: "20px"}}>
                            <i className="fa-solid fa-message"></i>
                            <h6>Game Design vs Game Development</h6>
                        </div>
                        
                        
                    </Stack>
                </div>
                <div style={{maxHeight: "50%"}}>
                    <div className='mb-4' style={{height: "1px", background: "white"}}></div>
                    <div className='d-flex flex-column gap-4 text-white'>
                        <div className='d-flex align-items-center' style={{columnGap: "25px"}}>
                            <i className="fa-solid fa-trash"></i>
                            <a style={{textDecoration: "none"}}  className='fs-5 m-0 text-white'>Clear History</a>
                        </div>
                        <div className='d-flex align-items-center' style={{columnGap: "25px"}}>
                            <i className="fa-solid fa-gear"></i>
                            <a style={{textDecoration: "none"}}  className='fs-5 m-0 text-white'>Settings</a>
                        </div>
                        <div className='d-flex align-items-center' style={{columnGap: "25px"}}>
                            <i className="fa-solid fa-house"></i>
                            <a style={{textDecoration: "none"}} href="/code-pilot" className='fs-5 m-0 text-white'>Return to Home</a>
                        </div>
                    </div>
                </div>
            </Col>
            <Col id='main' className='d-flex'>
                <div ref={editorRef} id='code' className='h-100' style={{position: 'relative', width: !split ? "100%" : "50%", transition: "all 2s"}}>
                  <i onClick={call} style={{position: "absolute", bottom: "10px", right: "10px", zIndex: "3", cursor: "pointer"}} id="enter" className="fs-3 text-white fa-solid fa-arrow-right"></i>
                </div>
                <div id='response' className='h-100' style={{ width: !split ? "0%" : "50%", transition: "all 2s", maxWidth: "50%"}}>
                  <pre ref={responseRef} className='pre-wrap'></pre>
                </div>
            </Col>
        </Container>
    )
}


export default Editor