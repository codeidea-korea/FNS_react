import { Outlet } from "react-router-dom";
import Quickmenu from "../page/common/Quickmenu";
import { Link } from "react-router-dom";

const MypageLayout = ()=>{
    return (
        <>
            <header>
                <div className="top_area">
                    <h1 className="logo"><Link to={'/'}><img src="./img/logo.svg" alt="" /></Link></h1>
                </div>
            </header>
            <Outlet />
            <Quickmenu /> {/* 퀵메뉴 */}
        </>
    )
}

export default MypageLayout;