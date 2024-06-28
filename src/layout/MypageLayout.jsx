import { Outlet } from "react-router-dom";
import Quickmenu from "@/page/common/Quickmenu";
import { Link } from "react-router-dom";
import Header from "@/page/common/Header";

const MypageLayout = ()=>{
    return (
        <>
            <Header gnbHide={true} /> {/* 헤더 */}
            <Outlet />
            <Quickmenu /> {/* 퀵메뉴 */}
        </>
    )
}

export default MypageLayout;