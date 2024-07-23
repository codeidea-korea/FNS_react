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
                    <img src="/img/logo.svg" alt="패션&스타일 로고"/>
                    <h6>패션&스타일 앱에서 제공되는 혜택을<br/>놓치고 계신 건 아닌가요?</h6>
                    <p>패션&스타일 앱은 다양한 혜택 및 코디 탭을 제공 중!</p>
                    <button type={'button'} className='down_btn' onClick={clickUseAppEvent}>앱 이용하기</button>
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