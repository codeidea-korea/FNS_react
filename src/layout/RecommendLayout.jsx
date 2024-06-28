import { Outlet } from "react-router-dom";
import Header from "@/page/common/Header";
import Quickmenu from "@/page/common/Quickmenu";


const RecommendLayout = ()=>{
    return (
        <>
            <Header title={"추천"} /> {/* 헤더 */}
            <Outlet />
            <Quickmenu /> {/* 퀵메뉴 */}
        </>
    )

}

export default RecommendLayout;