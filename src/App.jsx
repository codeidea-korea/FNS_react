import {HelmetProvider} from "react-helmet-async";

import {useEffect} from 'react'
import {BrowserRouter, useLocation} from 'react-router-dom'
import Router from './router/Index'
import "./assets/css/app.css"

// lottie 
import Lottie from "lottie-react";
import LottieLogo from "./assets/json/logo.json"
import ScrollToTop from '@/components/ScrollTop';
import MainNavigate from '@/components/MainNavigate';
import { GlobalProvider } from './layout/GlobalContext';

function App() {
    useEffect(() => {
        setTimeout(function () {
            document.getElementById('lottie').classList.add('off')
        }, 1500)
    }, [])

    return (
        <BrowserRouter>
            <MainNavigate/>
            <div id="lottie"><Lottie className='lottie_logo' animationData={LottieLogo}/></div>
            <ScrollToTop/>
            <HelmetProvider>
                <GlobalProvider>
                    <Router/>
                </GlobalProvider>
            </HelmetProvider>
        </BrowserRouter>
    )
}

export default App
