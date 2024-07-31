import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {clickUseApp} from "../common/CommonUtils";

/* 앱 다운로드 전용 모달을 모든 페이지에서 사용하기 위한 코드 */

let setModalOpen;

const GlobalAppDownModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const clickUseAppEvent = () => {
        clickUseApp();
        setIsOpen(false);
    }

    setModalOpen = setIsOpen;

    return ReactDOM.createPortal(
        <div className={"modal_wrap " + (isOpen ? "open" : "")}>
            <div className="modal_bg" onClick={() => setIsOpen(false)}></div>
            <div className="modal_box">
                <div className="modal_content appdown_cont">
                    <img src="/img/app_logo.png" alt="패션&스타일 로고"/>
                    <h6>패션 & 스타일 앱에서<br/>트렌디한 패션 정보를 확인해보세요.</h6>
                    <p>실시간 패션 트렌드, 라이프 & 셀럽 스타일을 쉽고 빠르게!</p>
                    <button type={'button'} className='down_btn' onClick={clickUseAppEvent}>앱으로 보기</button>
                    <button type={'button'} className='close_btn' onClick={() => setIsOpen(false)}>웹으로 볼게요</button>
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