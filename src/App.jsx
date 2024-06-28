import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router/Index'
import "./assets/css/app.css"

// lottie 
import Lottie from "lottie-react";
import LottieLogo from "./assets/json/logo.json"

function App() {
    // 모바일에서 100vh 사파리 오류 수정
    const setOneVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    useEffect(() => {
        setOneVh();
        window.addEventListener("resize", setOneVh);
        window.addEventListener("click", setOneVh);
    }, []);

    useEffect(()=>{
        setTimeout(function(){
            document.getElementById('lottie').classList.add('off')
        },1500)
    },[])

  return (
        <BrowserRouter>
            <div id="lottie"><Lottie className='lottie_logo' animationData={LottieLogo} /></div>
            <Router />
        </BrowserRouter>
    )
}

export default App
