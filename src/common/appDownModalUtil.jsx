import React, {useState} from 'react';
import ReactDOM from 'react-dom';

/* 앱 다운로드 전용 모달을 모든 페이지에서 사용하기 위한 코드 */

let setModalOpen;

const GlobalAppDownModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const clickUseApp = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        const androidURL = "https://play.google.com/store/apps/details?id=com.fas.android&hl=ko";
        const macURL = "https://apps.apple.com/kr/app/%ED%8C%A8%EC%85%98-%EC%8A%A4%ED%83%80%EC%9D%BC/id1620312420";
        const androidMobileURL = "market://details?id=com.fas.android"; // 플레이스토어 앱 다운로드 링크
        const iosMobileURL = "https://apps.apple.com/kr/app/%ED%8C%A8%EC%85%98-%EC%8A%A4%ED%83%80%EC%9D%BC/id1620312420"; // 앱스토어 링크

        if (/android/i.test(userAgent)) {
            if (/Mobile/i.test(userAgent)) {
                // 모바일 안드로이드
                window.open(androidMobileURL, '_blank');

            } else {
                // PC 윈도우
                window.open(androidURL, '_blank');
            }

        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // 모바일 iOS
            window.open(iosMobileURL, '_blank');

        } else if (/Macintosh/.test(userAgent)) {
            // PC 맥
            window.open(macURL, '_blank');

        } else {
            // 그 외 (PC 윈도우로 가정)
            window.open(androidURL, '_blank');
        }

        setIsOpen(false);
    }

    setModalOpen = setIsOpen;

    return ReactDOM.createPortal(
        <div className={"modal_wrap " + (isOpen ? "open" : "")}>
            <div className="modal_bg" onClick={() => setIsOpen(false)}></div>
            <div className="modal_box">
                <div className="modal_content appdown_cont">
                    <img src="/img/logo.svg" alt="패션&스타일 로고"/>
                    <h6>패션&스타일 앱에서 제공되는 혜택을<br/>놓치고 계신 건 아닌가요?</h6>
                    <p>패션&스타일 앱은 다양한 혜택 및 코디 탭을 제공 중!</p>
                    <button type={'button'} className='down_btn' onClick={clickUseApp}>앱 이용하기</button>
                    <button type={'button'} className='close_btn' onClick={() => setIsOpen(false)}>괜찮아요, 모바일웹으로 볼게요.</button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export const openAppDownModal = () => {
    setModalOpen(true);
};

export default GlobalAppDownModal;