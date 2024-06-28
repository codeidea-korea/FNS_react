import { Outlet } from "react-router-dom";
import Header from "@/page/common/Header";
import Quickmenu from "@/page/common/Quickmenu";


const BaseLayout = ()=>{
    return (
        <>
            <Header /> {/* 헤더 */}
            <Outlet />
            <Quickmenu /> {/* 퀵메뉴 */}
        </>
    )

}

export default BaseLayout;