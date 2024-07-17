import {useLocation, useNavigate} from "react-router-dom";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import {showLoadingAnimation} from '../../common/CommonUtils.jsx';
import {useGlobalContext} from '../../layout/GlobalContext';

const Quickmenu = () => {
    const url = useLocation().pathname;
    const navigate = useNavigate();
    const {setPk} = useGlobalContext();

    // 퀵 메뉴 클릭 이벤트
    const clickQuickMenu = (link) => {
        // 로딩
        showLoadingAnimation();

        setPk('10001');
        navigate(link);
    }

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
                    <a style={{cursor: "pointer"}} onClick={() => clickQuickMenu('/home/10001')}>
                        {/*<a style={{cursor:"pointer"}} onClick={() => clickQuickMenu('/home/10001')}>*/}
                        <img src={`/img/home${url !== "/foryou" && url !== "/mypage" && url !== "/posts" ? "_on" : ""}.svg`} alt=""/>
                        홈
                    </a>
                </li>
                <li className={url === "/foryou" || url === "/posts" ? "active" : ""}>
                    <a style={{cursor: "pointer"}} onClick={() => clickQuickMenu('/foryou')}>
                        <img src={`/img/recommend${url === "/foryou" || url === "/posts" ? "_on" : ""}.svg`} alt=""/>
                        추천
                    </a>
                </li>
                <li className={url === "/mypage" ? "active" : ""}>
                    <a style={{cursor: "pointer"}} onClick={() => clickQuickMenu('/mypage')}>
                        <i><img src="/img/logo.svg" alt=""/></i>
                        마이페이지
                    </a>
                </li>
            </ul>
        </div>
    )
}
export default Quickmenu;