import { Outlet } from "react-router-dom";
import Quickmenu from "../page/common/Quickmenu";


const RecommendLayout = ()=>{
    return (
        <>
            <div className="recommend_top">추천</div>
            <Outlet />
            <Quickmenu /> {/* 퀵메뉴 */}
        </>
    )

}

export default RecommendLayout;