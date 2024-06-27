import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import "./assets/css/app.css"

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

  return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
  )
}

export default App
