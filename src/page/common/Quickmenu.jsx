import { Link , useLocation } from "react-router-dom";

const Quickmenu = ()=>{
    const url = useLocation().pathname;

    return(
        <div className="quick_menu">
            <ul>
                <li className={url !== "/foryou" && url !== "/mypage" && url !== "/posts" ? "active" : ""}><Link to="/home/10001"><img src={`/img/home${url !== "/foryou" && url !== "/mypage" && url !== "/posts" ? "_on" : ""}.svg`} alt="" />홈</Link></li>
                <li className={url === "/foryou" || url === "/posts" ? "active" : ""}><Link to="/foryou"><img src={`/img/recommend${url === "/foryou" || url === "/posts" ? "_on" : ""}.svg`} alt="" />추천</Link></li>
                <li className={url === "/mypage" ? "active" : ""}><Link to="/mypage"><i><img src="/img/logo.svg" alt="" /></i>마이페이지</Link></li>
            </ul>
        </div>
    )
}
export default Quickmenu;