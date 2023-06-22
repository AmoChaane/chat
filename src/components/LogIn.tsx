import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, {useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import pic from "../images/7123025_logo_google_g_icon.png"
import pic2 from "../images/undraw_pair_programming_re_or4x.svg"
import pic3 from "../images/error.svg"
import Spinner from 'react-bootstrap/Spinner';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    getDoc,
    setDoc,
    doc,
    serverTimestamp,
  } from 'firebase/firestore';
import { getFirebaseConfig } from '../firebase-config'

export default function LogIn() {
    interface UserData {
        email: string,
        password: string
    }
    const [data, setData] = useState<UserData>({
        email: "",
        password: ""
    })
    const [incorrect, setIncorrect] = useState<boolean>(false)
    const [clicked, setClicked] = useState<boolean>(false)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {value, name} = event.target;

        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const navigate = useNavigate()

    async function signIn():Promise<void> { // with google
        // Sign in Firebase using popup auth and Google as the identity provider.
        var provider = new GoogleAuthProvider();
        const user = await signInWithPopup(getAuth(), provider);

        // ---------------------------------------------------
        try {
            const collectionRef = collection(getFirestore(), 'users');
            const documentId = user.user.uid;
            const docRef = doc(collectionRef, documentId); 
    
            const documentSnapshot = await getDoc(docRef);
    
            if (!documentSnapshot.exists()) {
                const init = doc(getFirestore(), 'users', user.user.uid);
                await setDoc(init, {
                    firstName: user.user.displayName,
                    email: user.user.email,
                    timestamp: serverTimestamp(),
                    history: [],
                    uid: user.user.uid
                });
            } 
        }
        catch(err) {
            console.log(err);
        }
        
        navigate("/editor", { replace: true });
    }

    async function logIn():Promise<void> { // with email and password
        setClicked(true)
        try {
            await signInWithEmailAndPassword(getAuth(), data.email, data.password)
            navigate("/editor")
        } 
        catch(err) {
            // alert("Error signing in")
            console.log("Error signing in", err);
            setIncorrect(true)
            setClicked(false)
        }
    }

    return (
        <Container fluid className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
            { 
                clicked &&
                <div className="d-flex align-items-center justify-content-center" style={{background: "rgba(0,0,0,.5)", zIndex: "100", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", minWidth: "100vw", minHeight: "100vh"}}>
                    <Spinner animation="border" />
                </div>
            }
            <div className="p-4" style={{width: "430px", border: "1px solid #CED4DA", borderRadius: "7px"}}>
                {/* <img className='d-lg-block d-none' style={{width: "10em"}} src={pic2} alt=""/> */}
                <Form className="">
                    {/* <h2 style={{textAlign: "center"}} className="mb-4">Log In</h2> */}
                    <div className="d-flex justify-content-center mb-4">
                        <img className='' style={{maxWidth: "10em", textAlign: "center"}} src={pic2} alt=""/>
                    </div>
                    {
                        incorrect &&
                        <div className='d-flex align-items-center ps-3 mb-3' style={{border: "1px solid red", height: '58px', background: "#FEF7F6", borderRadius: "0.375rem"}}>
                            <img className='mx-2' style={{maxHeight: "1.7rem"}} src={pic3}/>
                            <p className='m-0'>Incorrect email or password</p>
                        </div>
                    }
                    <FloatingLabel label="Email Address">
                        <Form.Control value={data.email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)} name="email" className="mb-4" type="email" placeholder="katnisseverdeen@gmail.com"></Form.Control>
                    </FloatingLabel>
                    <FloatingLabel label="Enter your Password">
                        <Form.Control value={data.password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)} name="password" className="mb-4" type="password" placeholder="Enter your password"></Form.Control>
                    </FloatingLabel>
                    <Button id="log-in" onClick={logIn} className="w-100 mb-2" variant="dark">Log In</Button>
                    <Form.Text>Don't have an account? <Link to="/signUp">Sign Up</Link></Form.Text>
                    <hr/>
                    <Row>
                        <Col>
                            <Button onClick={signIn} id="log-in-with-google" className="w-100 d-flex align-items-center justify-content-center" variant="outline-dark"><img id="google-icon" src={pic} alt="google-icon" />Continue with Google</Button>
                        </Col>
                    </Row>
                    <Form.Text><Link to="/">Go to Home Page</Link></Form.Text>
                </Form>
            </div>
        </Container>
    )
}


const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);