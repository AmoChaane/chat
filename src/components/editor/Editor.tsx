// import Sidebar from "./Sidebar"
// import Main from "./Main"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import Row from 'react-bootstrap/Row';
import { Stack } from 'react-bootstrap';
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import Placeholder from 'react-bootstrap/Placeholder';
import errorPic from "../../images/error.svg"
import HistoryItem from '../HistoryItem';
import uniqid from "uniqid"
import CodeMirror from '@uiw/react-codemirror';
import { bespin } from '@uiw/codemirror-theme-bespin';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  updateDoc,
  doc,
  getDoc,
  deleteDoc
} from 'firebase/firestore';
import { getFirebaseConfig } from '../../firebase-config'

function Editor() {
  interface ScreenSize {
    large: boolean
  }

  interface UserInfo {
    email: string,
    firstName: string,
    lastName: string,
    uid: string
  }

  interface HistoryDataItem {
    prompt: string,
    response: string,
    id: string,
    description: string
  }

  const [split, setSplit] = React.useState<boolean>(false); // changes each time the screen changes width or height depending on device size
  const editorRef = useRef<HTMLDivElement>(null); // reference to the left side of the screen, not the code editor
  const responseRef = useRef<HTMLPreElement>(null); // reference to the right side that shows up when the screen splits
  const spinnerRef = useRef<HTMLDivElement>(null); // the spinner that shows up when the redo or plane icon are hit
  const clearRef = useRef<HTMLDivElement>(null); // reference to the stop button
  const [show, setShow] = useState<boolean>(false); // the left sidebar controlled by the hamburger menu on tablet sizes and below(<= 992px)
  const [showBtns, setShowBtns] = useState<boolean>(true) // the button that show up on the right side of the screen when user clicks the plane icon or redo icon
  const [state, setState] = useState<ScreenSize>({ // keeps track of window size to let us know the size of the user's device
    large: window.innerWidth >= 992 ? true : false,
  })
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()
  const [showLogOut, setShowLogOut] = useState<boolean>(false)
  const [dataReady, setDataReady] = useState<boolean>(false)
  const [editorContent, setEditorContent] = useState<string>("")
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    firstName: "",
    lastName: "",
    uid: ""
  })
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteAcc, setDeleteAcc] = useState<boolean>(false);
  const [historyData, setHistoryData] = useState<HistoryDataItem[] | boolean>(false)
  const arr = [1, 1, 1, 1, 1] // we're gonna loop through this in order to place the placeholders on the history
  const [showStop, setShowStop] = useState<boolean>(false)
  const stopRef = useRef<string>("false") //s this helps with stopping the text animation

  const clearHistory = async () => {
    const documentRef = doc(getFirestore(), 'users', userInfo.uid);
    await updateDoc(documentRef, {...userInfo, history: []})
    setShowModal(false)
  };

  const handleCloseModal = () => {
    setShowModal(false)
    setDeleteAcc(false)
  };
  
  const handleShowModal = () => {
    setShowModal(true)
  };

  function deleteAccount() {
    setShowModal(true)
    setDeleteAcc(true)
  }

  function del(){
    addToHistory()
  }

  async function deleteHistoryItem(id: string) {
    if(Array.isArray(historyData)) {
      setHistoryData(() => {
        return historyData.filter(elem => {
          return elem.id !== id
        })
      })
    }
  }

  function handleChange(editor: string) {
    setEditorContent(editor)
  }

  async function addToHistory():Promise<void> {
    try {
      // console.log(userInfo.uid);
      const documentRef = doc(getFirestore(), 'users', userInfo.uid);
      if(Array.isArray(historyData))
        await updateDoc(documentRef, {...userInfo, history: [...historyData]})
    }
    catch(error) {
      console.log("Failed to save add item to history database", error);
      alert("Failed to save add item to history database")
    }
  }

  function updateHistoryItem(id: string, value: string) {
    if(Array.isArray(historyData)) {
      const arr = [...historyData];
      arr.forEach(elem => {
        if(elem.id === id){ 
          elem.description = value
        }
      })
      
      setHistoryData(arr)
    }
  }


  // This function shows the response of a specific prompt/history item when history item is clicked on
  function showResponse(id: string) {
    // responseRef.current.textContent += newStr[0];
    if(Array.isArray(historyData)) {
      historyData.find(elem => {
        if(elem.id === id) {
          if(responseRef.current) {
            responseRef.current.textContent = elem.response
            const cm_content = document.querySelector('.cm-content') as HTMLElement;
            cm_content.textContent = elem.prompt
            if(!split) setSplit(true) 
            return
          }
        }
      })
    }
    
  }

  {/* 
    When you reload the page, the Firebase SDK takes some time to reauthenticate the user, 
    and during that time, getAuth().currentUser might be null, resulting in the isUserSignedIn() function returning false.
    See the above commented useEffect function. That's the one that was giving me problems. It removes me from the editor
    page even when I have signed in.
  */}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in
        // console.log('User is signed in:', user);
      } else {
        // User is not signed in
        // console.log('User is not signed in.');
        // alert('Logged out');
        navigate('/logIn');
      }
    });
  
    // Clean up the listener
    return () => unsubscribe();
  });

  // --------------------------------------------------------------
  // Runs only when the component is first rendered
  // Retrieves the history of the user and saves it in a state variable
  // Saves the user's information(name, lastName and email) in state variables
  useEffect(() => {
    function load() {
      try {
        const collectionRef = collection(getFirestore(), 'users');
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if(user) {
            const docRef = doc(collectionRef, user.uid); 
            const docSnapshot = await getDoc(docRef);
        
            if (docSnapshot.exists()) {
              // Document with the specified ID exists
              const documentData = docSnapshot.data();
              const history = documentData.history;
              // Access the 'history' key within the document
              // console.log(history);
              
              setUserInfo(() => {
                return {
                  email: documentData.email,
                  lastName: documentData.lastName || "",
                  firstName: documentData.firstName,
                  uid: documentData.uid
                }
              })
              setHistoryData(history) // will be an empty array if user has no history
            }
          }
    
      });
      } catch (error) {
        // Handle any errors that occur during the retrieval
        console.error('Error fetching document:', error);
      }
    }
    load()
  }, [])

  useEffect(() => {
    if(Object.keys(historyData).length > 0) { // if the object is not empty
      addToHistory()
      setDataReady(true)
    }
    if(Array.isArray(historyData) && historyData.length === 0) {
      clearHistory()
      setDataReady(true)
    }
  }, [historyData])


  function isUserSignedIn() {
    // if(!!getAuth().currentUser) {
    //   navigate("/logIn")
    // } else {
      
    //   callAPI()
    // }
    callAPI()
  }
  


  let interval: any; // An interval is added after calling the API and that interval is used on the API response to create 
  // a text animation

  const root = document.querySelector("#root") as HTMLElement;
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.height = '100vh';
  // document.querySelector("#root").style.overflow = 'hidden';
  // flex-direction: column;
  //   height: 100vh;

  // Signs-out of code-pilot.
  function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
    navigate("/")
  }

  function showLog(){
    setShowLogOut(prev => {
      return !prev
    })
  }


  useEffect(() => { // in case window is resized
    const handleResize = () => {
      if(window.innerWidth >= 992) {
        setState(() => {
          return {
            large: true
          }
        });
        setShow(false)
      } else {
        setState(() => {
          return {
            large: false
          }
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = () => setShow(false); // closing the sidebar
  const handleShow = () => setShow(true); // opening the sidebar

  // -------------------------------------------------------------------------------------------------

  // Function called when plane icon and redo icon are clicked.
  // It calls to the API and does the necessary things to add to the page
  async function callAPI() {
    if(showStop) {
      stopRef.current = "true";
      setShowStop(false)
    }
    
    
    if(spinnerRef.current) spinnerRef.current.style.display = 'block';

    // ----------------------Code that uses the api------------------------------------------
    let content = editorContent
    // Array.from(document.querySelector('.cm-content').children).forEach(i => content += i.textContent);


    // fetch(`http://localhost:5000/api?content=${encodeURIComponent(content)}`)
    try {
      const api = await fetch(`https://amochaane.pythonanywhere.com/api?content=${content}`)
      const result = await api.json()
      let newStr = result.output.replace(/`/g, "")
      setSplit(true)
      if(content) {
        setHistoryData(prev => {
          if(Array.isArray(prev)) {
            return [
              ...prev,
              {prompt: content, response: newStr, id: uniqid(), description: content}
            ]
          } else return prev
        })
      }
      if(responseRef.current) responseRef.current.textContent = '';
      setShowStop(true)
      if(spinnerRef.current) spinnerRef.current.style.display = 'none';
      if(clearRef.current) clearRef.current.style.display = "flex";
      interval = setInterval(() => {
        if(newStr && responseRef.current) {
          if(responseRef.current) responseRef.current.textContent += newStr[0];
          newStr = newStr.slice(1)
        } else {
          clearInterval(interval)
          setShowStop(false)
        }
        if(stopRef.current == "true") {
          // console.log("amo");
          stopRef.current = "false";
          clearInterval(interval)
        }
      }, 10);
    }
    catch(error) {
      console.log(error);
      let newStr = 'The API failed to run so the following text along with the text animation serves as just a demo/preview of what things would look like if the API had successfully returned the required response: \n\nThe code provided appears to be incomplete and syntactically incorrect. It does not serve any useful purpose. Assuming that the intended purpose was to create a function that returns something, a corrected version could be: \n\nfunction myFunction() {\n   return "Hello World";\n}\nIn this case, the function is named "myFunction" and it returns the string "Hello World". The function can be invoked elsewhere in the code by calling its name, like so: \n\nmyFunction(); // returns "Hello World"'
      if(content) {
        setHistoryData(prev => {
            if(Array.isArray(prev)) {
              return [
                ...prev,
                {prompt: content, response: newStr, id: uniqid(), description: content}
              ]
            }

          else {
            return []
          }
          
        })
      }
      
      if(spinnerRef.current) spinnerRef.current.style.display = 'none';
      setSplit(true)

      if(responseRef.current) responseRef.current.textContent = '';
      setShowStop(true)
      interval = setInterval(() => {
        if(newStr && responseRef.current) {
          if(responseRef.current) responseRef.current.textContent += newStr[0];
          newStr = newStr.slice(1)
        } else {
          clearInterval(interval)
          setShowStop(false)
        }
        if(stopRef.current == "true") {
          // console.log("amo");
          stopRef.current = "false";
          clearInterval(interval)
        }
      }, 10);
    }
      

  }

  


  // -------------------------------------------------------------------------------------------------

  function revert() {
    setSplit(false)
  }


  // -------------------------------------------------------------------------------------------------

  function controlBtns() {
    setShowBtns(!showBtns)
  }


  return (
    <>
      <Modal id="modal" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{deleteAcc ? "Delete Account" : "Delete History"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex align-items-center' style={{background: "#FBE9E7", color: "#C72829", fontWeight: "600"}}><img style={{maxHeight: "1.7rem", marginRight: "7px"}} src={errorPic}/> {deleteAcc ? "This will permanently delete all of your account data" : "This will permanently delete all of your history data"}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => {
            handleCloseModal()
          }}>
            Cancel
          </Button>
          <Button variant="dark" 
          onClick={!deleteAcc ? () => {
            setHistoryData([])
            clearHistory()
          }
          :
          () => {
            console.log("deleting account");
            const user = getAuth().currentUser;
            if(user) {
              const collectionRef = collection(getFirestore(), 'users');
              const docRef = doc(collectionRef, user.uid)
              deleteDoc(docRef)
              user.delete()
              .then(() => {
                navigate("/")
              }).catch(err => {
                console.log("error deleting account", err)
              })
            }
          }
        }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar className="d-lg-none p-0" style={{height: window.innerWidth <= 510 ? "6vh" : "8vh", background: "#232223", borderBottom: "1px solid #b0b1bb"}}>
        <Container fluid className="">
          <h1 onClick={handleShow}><i style={{color: "#B0B1BB", cursor: "pointer", margin: "0"}} className="fs-3 fa-solid fa-bars"></i></h1>
          <div style={{width: "100%", textAlign: "center"}}>
            <Link to="/" style={{textAlign: "center", textDecoration: "none"}} className='fs-1 text-white'><span id='logoFirst'>Code</span><span id='logoSecond' className='fw-light'>Pilot</span></Link>
          </div>
        </Container>
      </Navbar>

      {/* ------------------------------------Everything but the Navbar--------------------------------------------- */}
      
      <Container fluid id="container" className="p-0 d-flex" style={{height: state.large ? "100%" : "90vh"}}>
        <div ref={spinnerRef} id="overlay">
          <div className="lds-ripple"><div></div><div></div></div>
        </div>

        {/* --------------------------------Left Sidebar that shows on tablet sizes and less-------------------------- */}
        <Offcanvas show={show} onHide={handleClose} style={{background: "#333334"}} className="text-white  p-3">
            <Offcanvas.Header closeButton closeVariant='white'>
              {/* <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title> */}
            </Offcanvas.Header>
            {/* <Offcanvas.Body className="pt-0" style={{height: "100vh"}}> */}
            <h3 className='text-white fw-5 fs-5 mt-4'>History</h3>
              <div className={`text-white`} style={{overflowY: "auto", height: state.large ? "" : "100%"}}>
                {
                (dataReady && Array.isArray(historyData) && historyData.length === 0) && 
                  <>
                    <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                      <span className="face display-1">ツ</span>
                      <span className="no-history-message fs-3">No history available.</span>
                    </div>
                  </>
                }
                  <Stack gap={3} className=''>
                    {
                      (dataReady && Array.isArray(historyData)) ? historyData.map(item => {
                        return <HistoryItem 
                          updateHistoryItem={updateHistoryItem} 
                          del={del} 
                          deleteHistoryItem={deleteHistoryItem} 
                          showResponse={showResponse} 
                          key={item.id} 
                          id={item.id} 
                          text={item.description}/>
                      })
                      :
                      arr.map((_, index) => {
                        return (
                          <Placeholder key={index} xs={12} animation='glow' >
                            <Placeholder xs={12} style={{height: "34px", borderRadius: "7px"}} />
                          </Placeholder>
                        )
                      })
                    }
                  </Stack>  
              </div>
              <div>
                  <div className='mb-4 mt-3' style={{height: "1px", background: "white"}}></div>
                  <div className='d-flex flex-column gap-4 text-white sidebar-settings'>
                      <div onClick={handleShowModal} className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                          <i className="fa-solid fa-trash"></i>
                          <a style={{textDecoration: "none"}}  className='fs-5 m-0 text-white'>Clear History</a>
                      </div>
                      {/* <div className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                          <i className="fa-solid fa-gear"></i>
                          <a style={{textDecoration: "none"}}  className='fs-5 m-0 text-white'>Settings</a>
                      </div> */}
                      <div className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                          <i className="fa-solid fa-house"></i>
                          <Link to="/" style={{textDecoration: "none"}} className='fs-5 m-0 text-white'>Return to Home</Link>
                      </div>
                      {
                        userInfo.email ?
                        <div title={userInfo.email} onClick={showLog} className='d-flex align-items-center history-item2' style={{columnGap: "25px", position: "relative"}}>
                            {/* <i className="fa-solid fa-gear"></i> */}
                            {
                              showLogOut && 
                              <div style={{borderRadius: "10px", position: "absolute", bottom: "130%", background: "#232223", left: "0", width: "100%", padding: "10px", zIndex: "234"}}>
                                <div style={{columnGap: "25px"}} onClick={signOutUser} ref={ref} className={`d-flex align-items-center history-item logOut ${showLogOut && "show"}`} >
                                  <i className="fa-solid fa-right-from-bracket"></i>
                                  <Link to="" style={{textDecoration: "none", width: "100%"}} className='m-0 text-white'>Log Out</Link>
                                </div>
                                <div style={{height: "1px", background: "white", margin: "3px 0 3px 0"}}></div>
                                <div style={{columnGap: "25px"}} onClick={deleteAccount} ref={ref}  className={`d-flex align-items-center history-item logOut ${showLogOut && "show"}`} >
                                  {/* <i className="fa-solid fa-right-from-bracket"></i> */}
                                  <i className="fa-solid fa-user-minus"></i>
                                  <Link to="" style={{textDecoration: "none", width: "100%"}} className='m-0 text-white'>Delete Account</Link>
                                </div>
                              </div>
                            }
                            <i className="fa-solid fa-user" style={{width: '23px'}}></i> 
                            <a style={{textDecoration: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}  className='m-0 text-white'>{userInfo.email}</a>
                        </div>
                      :
                        <Placeholder xs={12} animation='glow' >
                          <Placeholder xs={12} style={{height: "30px", borderRadius: "7px"}} />
                        </Placeholder>
                      }
                  </div>
              </div>
            {/* </Offcanvas.Body> */}
          </Offcanvas>
          <Col id='sidebar' lg={3} className='d-lg-flex d-none flex-column justify-content-between h-100 p-4'>
              <Link to="/" style={{textAlign: "center", textDecoration: "none"}} className='fs-1 text-white'><span id='logoFirst'>Code</span><span id='logoSecond' className='fw-light'>Pilot</span></Link>
              <h3 className='text-white fw-5 fs-5 mt-4'>History</h3>

              {/* -------------The history on the left sidebar(lg size and more )---------------------------------------------------- */}
              <div className="text-white" style={{overflowY: "auto", height: state.large ? "100%" : ""}}>
              {
                (dataReady && Array.isArray(historyData) && historyData.length === 0) && 
                  <>
                    <div className="d-flex h-100 w-100 align-items-center justify-content-center">
                      <span className="face display-1">ツ</span>
                      <span className="no-history-message fs-3">No history yet.</span>
                    </div>
                  </>
                }
                  <Stack gap={3} className='pe-2'>
                    {
                      (dataReady && Array.isArray(historyData)) ? historyData.map(item => {
                        return <HistoryItem 
                          updateHistoryItem={updateHistoryItem} 
                          del={del} 
                          deleteHistoryItem={deleteHistoryItem} 
                          showResponse={showResponse} 
                          key={item.id} 
                          id={item.id} 
                          text={item.description}/>
                      })
                      :
                      arr.map((_, index) => {
                        return (
                          <Placeholder key={index} xs={12} animation='glow' >
                            <Placeholder xs={12} style={{height: "34px", borderRadius: "7px"}} />
                          </Placeholder>
                        )
                      })
                    }
                  </Stack>  
              </div>

              {/* ----------------------The settings options at the bottom------------------------------------------------------ */}
              <div>
                  <div className='mb-4 mt-3' style={{height: "1px", background: "white"}}></div>
                  <div className='d-flex flex-column gap-4 text-white sidebar-settings'>
                      <div onClick={handleShowModal} className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                          <i className="fa-solid fa-trash"></i>
                          <a style={{textDecoration: "none"}}  className='fs-5 m-0 text-white'>Clear History</a>
                      </div>
                      {/* <div className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                          <i className="fa-solid fa-gear"></i>
                          <a style={{textDecoration: "none"}}  className='fs-5 m-0 text-white'>Settings</a>
                      </div> */}
                      <div className='d-flex align-items-center history-item' style={{columnGap: "25px"}}>
                          <i className="fa-solid fa-house"></i>
                          <Link to="/" style={{textDecoration: "none"}} className='fs-5 m-0 text-white'>Return to Home</Link>
                      </div>
                      {
                        userInfo.email ?
                        <div title={userInfo.email} onClick={showLog} className='d-flex align-items-center history-item2' style={{columnGap: "25px", position: "relative"}}>
                            {/* <i className="fa-solid fa-gear"></i> */}
                            {
                              showLogOut && 
                              <div style={{borderRadius: "10px", position: "absolute", bottom: "130%", background: "#232223", left: "0", width: "100%", padding: "10px", zIndex: "234"}}>
                                <div style={{columnGap: "25px"}} onClick={signOutUser} ref={ref} className={`d-flex align-items-center history-item logOut ${showLogOut && "show"}`} >
                                  <i className="fa-solid fa-right-from-bracket"></i>
                                  <Link to="" style={{textDecoration: "none", width: "100%"}} className='m-0 text-white'>Log Out</Link>
                                </div>
                                <div style={{height: "1px", background: "white", margin: "3px 0 3px 0"}}></div>
                                <div style={{columnGap: "25px"}} onClick={deleteAccount} ref={ref}  className={`d-flex align-items-center history-item logOut ${showLogOut && "show"}`} >
                                  {/* <i className="fa-solid fa-right-from-bracket"></i> */}
                                  <i className="fa-solid fa-user-minus"></i>
                                  <Link to="" style={{textDecoration: "none", width: "100%"}} className='m-0 text-white'>Delete Account</Link>
                                </div>
                              </div>
                            }
                            <i className="fa-solid fa-user" style={{width: '19px'}}></i> 
                            <a style={{textDecoration: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}  className='m-0 text-white'>{userInfo.email}</a>
                        </div> 
                      :
                        <Placeholder xs={12} animation='glow' >
                          <Placeholder xs={12} style={{height: "30px", borderRadius: "7px"}} />
                        </Placeholder>
                      }
                  </div>
              </div>
          </Col>
          <Col>
          {
            state.large ?
              <div className='d-flex h-100 w-100' style={{position: 'relative'}}>
                <div ref={editorRef} className='h-100' style={{width: !split ? "100%" : "50%", transition: "all 2s"}}>
                <CodeMirror onChange={handleChange} theme={bespin} height="100vh" value="" id="code-editor"/>
                  <Row className="p-2 gap-2 flex-nowrap" style={{borderRadius: "25px", background: "rgb(51,51,52)", position: "absolute", transform: "translateX(-50%)", bottom: "15px", left: "50%", zIndex: "8", cursor: "pointer"}}>
                    {
                      split && 
                      <>
                        <Col style={{display: showBtns ? "flex" : "none"}} onClick={revert} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                          <i className=" fa-solid fa-arrow-left"></i>
                        </Col>
                        <Col style={{display: showBtns ? "flex" : "none"}}  onClick={isUserSignedIn} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                          <i className=" fa-solid fa-rotate-left"></i>
                        </Col>
                        {
                          showStop &&
                          <Col ref={clearRef} onClick={() => {
                            stopRef.current = "true";
                            setShowStop(false)
                          }} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                            Stop
                          </Col>
                        }
                      </>
                      
                    }
                    <Col style={{display: showBtns ? "flex" : "none"}}  onClick={isUserSignedIn} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
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

              <div style={{overflow: "hidden", position: 'relative', height: window.innerWidth <= 510 ? "94dvh" : "92dvh"}} className='d-flex flex-column w-100'>
                <div ref={editorRef} className='' style={{height: !split ? "100%" : "45%", transition: "all 2s"}}>
                <CodeMirror onChange={handleChange} style={{height: "100%"}} theme={bespin} value="" id="code-editor"/>
                  <Row className="p-2 gap-2" style={{flexWrap: window.innerWidth <= 420 ? "wrap" : "nowrap", width: ((showStop && window.innerWidth <= 420) || window.innerWidth <= 420) && showBtns ? "90%" : "", borderRadius: "25px", background: "rgb(51,51,52)", position: "absolute", transform: "translateX(-50%)", bottom: "15px", left: "50%", zIndex: "8", cursor: "pointer"}}>
                    {
                      split && 
                      <>
                        <Col style={{display: showBtns ? "flex" : "none"}}  onClick={revert} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                          <i className=" fa-solid fa-arrow-left"></i>
                        </Col>
                        <Col style={{display: showBtns ? "flex" : "none"}}  onClick={isUserSignedIn} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                          <i className=" fa-solid fa-rotate-left"></i>
                        </Col>
                        {
                          showStop &&
                          <Col ref={clearRef} onClick={() => {
                            stopRef.current = "true";
                            setShowStop(false)
                          }} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons"
                          style={{textAlign: "center"}}
                          >
                            Stop
                          </Col>
                        }
                      </>
                      
                    }
                    {/* ------------------------The send button------------------------------------------ */}
                    <Col style={{display: showBtns ? "flex" : "none"}}  onClick={isUserSignedIn} className="align-items-center justify-content-center pt-2 pb-2 px-4 control-buttons">
                      <i className=" fa-solid fa-paper-plane"></i>
                    </Col>
                    <Col onClick={controlBtns} className="hide d-flex align-items-center justify-content-center">{showBtns ? "Hide" : "Show"}</Col>
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


const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);