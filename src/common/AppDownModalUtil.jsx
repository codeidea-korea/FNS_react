import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {clickUseApp} from "../common/CommonUtils";

/* 앱 다운로드 전용 모달을 모든 페이지에서 사용하기 위한 코드 */

let setModalOpen;

const GlobalAppDownModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const clickUseAppEvent = () => {
        clickUseApp();
        closeAppDownModal();
    }

    setModalOpen = setIsOpen;

    if (isMobileFn()) {
        // 모바일용 모달
        return ReactDOM.createPortal(
            <div className={"modal_wrap " + (isOpen ? "open" : "")}>
                <div className="modal_bg" onClick={closeAppDownModal}></div>
                <div className="modal_box">
                    <div className="modal_content appdown_cont">
                        <img src="/img/app_logo.png" alt="패션&스타일 로고"/>
                        <h6>패션 & 스타일 앱에서<br/>트렌디한 패션 정보를 확인해보세요.</h6>
                        <p>실시간 패션 트렌드, 라이프 & 셀럽 스타일을 쉽고 빠르게!</p>
                        <button type={'button'} className='down_btn' onClick={clickUseAppEvent}>앱으로 보기</button>
                        <button type={'button'} className='close_btn' onClick={closeAppDownModal}>웹으로 볼게요</button>
                    </div>
                </div>
            </div>
            , document.body
        );

    } else {
        // PC용 모달
        return ReactDOM.createPortal(
            <div className={"modal_wrap " + (isOpen ? "open" : "")}>
                <div className="modal_bg" onClick={closeAppDownModal}></div>
                <div className="modal_box center_box">
                    <div className="modal_content appdown_pc_cont">
                        <div className="img_box">
                            <img src="/img/qr.png" alt=""/>
                        </div>
                        <div className="txt_box">
                            <h6>패션 & 스타일 앱에서<br/>트렌디한 패션 정보를 확인해보세요.</h6>
                            <p>QR코드 스캔으로 더 쉽고 빠르게!</p>
                            <button className='close_btn' onClick={closeAppDownModal}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
            , document.body
        );
    }
};

/*function preventDefault(e) {
    e.preventDefault();
}

let globalTarget = '';
let pageY = 0;

export const openAppDownModal = (target) => {
    pageY = window.scrollY;
    window.scrollTo(0, pageY);
    globalTarget = target;
    globalTarget.classList.add('asdf');
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventDefault, { passive: false });
    setModalOpen(true);

    const {body} = document;

    if (!globalTarget) {
        // pageY = window.scrollY;
        // body.setAttribute('scrollY', pageY.toString());

        // body.style.overflow = 'hidden';
        // body.style.position = 'fixed';
        // document.body.style.touchAction = 'none';
        // body.style.top = `-${pageY}px`;
        // body.style.left = '0px';
        // body.style.right = '0px';
        // body.style.bottom = '0px';

        // document.body.classList.add('no-scroll');
        // window.addEventListener('touchmove', asdfasdf, { passive: false });
        // window.addEventListener('wheel', disableScroll, { passive: false });

        // globalTarget = target;
        // globalTarget.classList.add('asdf');

        // document.body.style.removeProperty('touchAction');
    }
};

export const closeAppDownModal = () => {
    window.scrollTo(0, pageY);
    document.body.style.removeProperty('overflow');
    globalTarget.classList.remove('asdf');
    globalTarget = '';
    document.removeEventListener('touchmove', preventDefault);
    setModalOpen(false);

    // const {body} = document;

    if (globalTarget) {
        // body.style.removeProperty('overflow');
        // body.style.removeProperty('position');
        // body.style.removeProperty('top');
        // body.style.removeProperty('left');
        // body.style.removeProperty('right');
        // body.style.removeProperty('bottom');

        // window.scrollTo(0, Number(body.getAttribute('scrollY')));
        // body.removeAttribute('scrollY');

        // document.body.classList.remove('no-scroll');
        // window.removeEventListener('touchmove', disableScroll, { passive: false });
        // window.removeEventListener('wheel', disableScroll, { passive: false });

        // globalTarget.classList.remove('asdf');
        // globalTarget = '';
    }
};*/

const preventScroll = (e) => {
    if (e.type === 'touchmove' || e.type === 'scroll') {
        e.preventDefault();
    }
};

export const openAppDownModal = () => {
    window.scrollTo(0, window.scrollY);
    window.document.body.style.overflow = 'hidden';
    window.document.documentElement.style.overflow = 'hidden';

    // 스크롤 막기
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('touchstart', preventScroll, { passive: false });
    window.addEventListener('touchend', preventScroll, { passive: false });
    window.addEventListener('scroll', preventScroll);

    setModalOpen(true);
};

export const closeAppDownModal = () => {
    window.document.body.style.overflow = '';
    window.document.documentElement.style.overflow = '';

    // 스크롤 허용
    window.removeEventListener('touchmove', preventScroll);
    window.removeEventListener('touchstart', preventScroll);
    window.removeEventListener('touchend', preventScroll);
    window.removeEventListener('scroll', preventScroll);

    setModalOpen(false);
};

export const isMobileFn = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPhone|iPad|iPod|Android/i.test(userAgent);
}

export default GlobalAppDownModal;