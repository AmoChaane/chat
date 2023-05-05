import Header from "./components/Header"
import Body from "./components/Body"
import Footer from "./components/Footer"
import React, { useState, useEffect} from "react"
import "./style.css"

function App() {
  const [state, setState] = useState({
    color: "white",
    large: window.innerWidth >= 992 ? true : false,
    scroll: false,
    show: false
  })
  console.log('ran');

  function show() {
    setState(prev => {
      return {
        ...prev,
        show: !prev.show
      }
    })
  }

  function scrollUp() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }  

  window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
      setState(prev => {
        return {
          ...prev,
          scroll: true
        }
      });
    } else {
      setState(prev => {
        return {
          ...prev,
          scroll: false
        }
      });
    }
  }, {passive: true}); // this optional argument is supposed to improve scrolling performance


  useEffect(() => { // in case window is resized
    console.log('useEffect fired');
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
    <>
      <Header state={state} show={show}/>
      <Body state={state}/>
      <Footer state={state} scrollUp={scrollUp}/>
    </>
  )
}
{/* <Link to="/profile">Profile</Link> */}


export default App