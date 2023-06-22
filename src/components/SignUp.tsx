import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useState, ChangeEvent } from "react";
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
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    getDoc,
    setDoc,
    doc,
    serverTimestamp,
  } from 'firebase/firestore';
import { getFirebaseConfig } from '../firebase-config';

export default function Sign() {
    interface UserData {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        confirmPassword: string
    }

    interface valid {
        names: {
            text: string,
            valid: boolean | null
        },
        email: {
            text: string,
            valid: boolean | null
        },
        passwords: {
            text: string,
            valid: boolean | null
        },
    }

    const [data, setData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [clicked, setClicked] = useState<boolean>(false)
    const [incorrect, setIncorrect] = useState<boolean>(false)
    const navigate = useNavigate()
    // Checks if the fields are valid. If the field's valid key changes from null to false, it means the user clicked
    // on the form's submit button(the create account button)
    const [validated, setValidated] = useState<valid>({
        names: {text: "Must be a min of 2 letters", valid: null},
        email: {text: "email is not valid", valid: null},
        passwords: {text: "passwords do not match", valid: null}
    })


    // this function just updates the input field's 'valid' key from null to false, showing that the user has clicked
    // the form's submit button(the create account button)
    // This function is only ran when the form's submit button is clicked
    function update(field: keyof valid) {
        setValidated(prev => {
            return {
                ...prev,
                [field]: {text: prev[field].text, valid: false}
            }
        })
    }


    async function signIn():Promise<void> {
        // Sign up Firebase using popup auth and Google as the identity provider.
        var provider = new GoogleAuthProvider();
        const user = await signInWithPopup(getAuth(), provider);

        // try {
            const collectionRef = collection(getFirestore(), 'users');
            const documentId = user.user.uid;
            const docRef = doc(collectionRef, documentId); 
    
            const documentSnapshot = await getDoc(docRef);
            // console.log(documentSnapshot.exists);

            if (!documentSnapshot.exists()) {
                console.log("amo");
                const init = doc(getFirestore(), 'users', user.user.uid);
                await setDoc(init, {
                    firstName: user.user.displayName,
                    email: user.user.email,
                    timestamp: serverTimestamp(),
                    history: [],
                    uid: user.user.uid
                });
            }      
        navigate("/editor", { replace: true });
    }

    async function createAccount():Promise<void> {
        setClicked(true)
        const root = document.querySelector("#root") as HTMLElement;
        root.style.overflow = "hidden";
        try {
            const userAuth = await createUserWithEmailAndPassword(getAuth(), data.email, data.password)
            const init = doc(getFirestore(), 'users', userAuth.user.uid);
            await setDoc(init, {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                timestamp: serverTimestamp(),
                history: [],
                uid: userAuth.user.uid
            });
            setClicked(false)
            root.style.overflow = "hidden"
            navigate("/editor")
            root.style.overflow = ""
        }
        catch(err: any) {
            // alert("Error creating account")
            if(err.code === "auth/email-already-in-use"){
                setIncorrect(true)
            }
            console.log('Error creating account', err.code);
            setClicked(false)

        }

    }

    // Ran when the form's submit button is clicked. It then goes on to update the necessary state for the input field's 'valid' state
    const handleSubmit = () => {
        if(data.firstName.length < 2) {
            update('names')
        }
        if(data.lastName.length < 2) {
            update("names")
        }
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) { // makes sure the email is in the correct format
            update("email")
        }
        if(data.confirmPassword != data.password || !data.password) { // when no password has been entered or when the password is not the same as the confirm password
            update("passwords")
        }
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z0-9@]{8,16}$/.test(data.password)) { // checks for the correct format with the password
            update("passwords")
        }
        // If all the above conditions are met then the necessary actions will be implemented
        if(data.firstName.length >= 2 && data.lastName.length >= 2 && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email) && data.password == data.confirmPassword && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z0-9@]{8,16}$/.test(data.password)) {
            createAccount()
        }
    };
    
    // Runs after every single change on the input fields. Saves the values in state
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target
        setData(prev => {
            return {
                ...prev, 
                [name]: value
            }
        })
    }


    return (
        <Container style={{position: "relative", height: clicked ? "100vh" : ""}} fluid className={`d-flex align-items-center justify-content-center ${!clicked && "mt-4"} mb-4`}>
            { 
                clicked &&
                <div className="d-flex align-items-center justify-content-center" style={{background: "rgba(0,0,0,.5)", zIndex: "100", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", minWidth: "100vw", minHeight: "100vh"}}>
                    <Spinner animation="border" />
                </div>
            }
            <div className="d-flex p-4 pb-2" style={{border: "1px solid #CED4DA", borderRadius: "7px"}}>
                <img id="signUp-image" className='d-lg-block d-none' style={{width: "30em"}} src={pic2} alt=""/>
                <Form className="">
                    <h2 style={{textAlign: "center"}} className="mb-4 d-lg-block d-none">Create Account</h2>
                    <div className="d-lg-none d-flex justify-content-center mb-4">
                        <img className='' style={{maxWidth: "10em", textAlign: "center"}} src={pic2} alt=""/>
                    </div>
                    {
                        incorrect &&
                        <div className='d-flex align-items-center ps-3 mb-3' style={{border: "1px solid red", height: '58px', background: "#FEF7F6", borderRadius: "0.375rem"}}>
                            <img className='mx-2' style={{maxHeight: "1.7rem"}} src={pic3}/>
                            <p className='m-0'>Email already exists</p>
                        </div>
                    }
                    <Row className="mb-4">
                        <Col>
                            <FloatingLabel label="First Name">
                                <Form.Control name='firstName' value={data.firstName} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)} placeholder="Katniss"></Form.Control>
                                {(validated.names.valid == false && data.firstName.length < 2) && <Form.Text style={{color: "red"}}>{validated.names.text}</Form.Text>}
                            </FloatingLabel>
                            
                        </Col>
                        <Col>
                            <FloatingLabel label="Last Name">
                                <Form.Control name='lastName' value={data.lastName} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}  placeholder="Everdeen"></Form.Control>
                                {(validated.names.valid == false && data.lastName.length < 2) && <Form.Text style={{color: "red"}}>{validated.names.text}</Form.Text>}
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <FloatingLabel label="Email Address" className="mb-4">
                        <Form.Control name='email' value={data.email} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}  type="email" placeholder="katnisseverdeen@gmail.com"></Form.Control>
                        {(validated.email.valid == false && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) && <Form.Text style={{color: "red"}}>{validated.email.text}</Form.Text>}
                    </FloatingLabel>
                    <FloatingLabel label="Password" className="mb-4" >
                        <Form.Control onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)} value={data.password} name="password" type="password" placeholder="Enter password"></Form.Control>
                        {(!data.password && validated.passwords.valid == false) && <Form.Text style={{color: "red"}}>Please enter a password!</Form.Text>}
                        {(!data.password && validated.passwords.valid == false) && <br/>}
                        {((!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z0-9@]{8,16}$/.test(data.password)) && validated.passwords.valid == false) && <Form.Text style={{color: "red"}}>Password must have atleast 1 special character, <br/>atleast 1 number, <br/>1 uppercase character, <br/>min characters: 8, <br/>max characters:16</Form.Text>}
                    </FloatingLabel>
                    <FloatingLabel label="Repeat Password" className="mb-4">
                        <Form.Control onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)} value={data.confirmPassword}  name="confirmPassword" type="password" placeholder="Repeat password"></Form.Control>
                        {(validated.passwords.valid == false && data.confirmPassword != data.password) && <Form.Text style={{color: "red"}}>{validated.passwords.text}</Form.Text>}
                    </FloatingLabel>
                    <Button onClick={handleSubmit} id="sign-up" className="w-100 mb-2" variant="dark">Create Account</Button>
                    <Form.Text>Already have an account? <Link to="/logIn">Log In</Link></Form.Text>
                    <hr/>
                    <Row>
                        <Col>
                            <Button onClick={signIn} id="sign-up-with-google" className="w-100 d-flex align-items-center justify-content-center" variant="outline-dark"><img id="google-icon" src={pic} alt="google-icon" />Sign Up with Google</Button>
                        </Col>
                        {/* <Col><Button variant="outline-dark">Dark</Button></Col> */}
                    </Row>
                    <Form.Text><Link to="/">Go to Home Page</Link></Form.Text>
                </Form>
            </div>
        </Container>
    )
}

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);