import { Link , useLocation } from "react-router-dom";

const Quickmenu = ()=>{
    const url = useLocation().pathname;

    return(
        <div className="quick_menu">
            <ul>
                <li className={url !== "/recommend" && url !== "/mypage" && url !== "/post" ? "active" : ""}><Link to="/"><img src={`./img/home${url !== "/recommend" && url !== "/mypage" && url !== "/post" ? "_on" : ""}.svg`} alt="" />홈</Link></li>
                <li className={url === "/recommend" || url === "/post" ? "active" : ""}><Link to="/recommend"><img src={`./img/recommend${url === "/recommend" || url === "/post" ? "_on" : ""}.svg`} alt="" />추천</Link></li>
                <li className={url === "/mypage" ? "active" : ""}><Link to="/mypage"><i><img src="./img/logo.svg" alt="" /></i>마이페이지</Link></li>
            </ul>
        </div>
    )
}
export default Quickmenu;