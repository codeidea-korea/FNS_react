import {Link, useLocation} from "react-router-dom";
import {openAppDownModal} from '../../common/AppDownModalUtil';

const Quickmenu = () => {
    const url = useLocation().pathname;

    return (
        <div className="quick_menu">
            <div className='appdown_box'>
                <h1 className="logo">
                    <a href={'/home/10001'}><img src="/img/logo.svg" alt=""/></a>
                    <span>패션 & 스타일 앱에서 더 편리하게</span>
                </h1>
                <button type={'button'} onClick={openAppDownModal}>앱으로 이동</button>
            </div>
            <ul>
                <li className={url !== "/foryou" && url !== "/mypage" && url !== "/posts" ? "active" : ""}>
                    <a href={"/home/10001"}><img src={`/img/home${url !== "/foryou" && url !== "/mypage" && url !== "/posts" ? "_on" : ""}.svg`} alt=""/>홈</a>
                </li>
                <li className={url === "/foryou" || url === "/posts" ? "active" : ""}>
                    <Link to="/foryou"><img src={`/img/recommend${url === "/foryou" || url === "/posts" ? "_on" : ""}.svg`} alt=""/>추천</Link>
                </li>
                <li className={url === "/mypage" ? "active" : ""}>
                    <Link to="/mypage"><i><img src="/img/logo.svg" alt=""/></i>마이페이지</Link></li>
            </ul>
        </div>
    )
}
export default Quickmenu;