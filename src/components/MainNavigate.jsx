import { useEffect } from "react";
import { useLocation , useNavigate } from "react-router-dom";

export default function MainNavigate(){
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(pathname === '/' || pathname === "/home" || pathname === "/home/"){
            window.location.pathname = "/home/10001"
        }
    }, [pathname, navigate]);

    return null;
}