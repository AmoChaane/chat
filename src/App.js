import Header from "./components/Header"
import React, { useState, useEffect} from "react"
import "./style.css"

export default function App() {
  const [state, setState] = useState({
    color: "white",
    large: window.innerWidth >= 992 ? true : false
  })


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

  return (
    <Header updateState={setState} state={state}/>
  )
}