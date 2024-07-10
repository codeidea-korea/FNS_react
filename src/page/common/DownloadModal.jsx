import React from 'react';
import { handleDownloadClick} from "@/common/downloadUtils.jsx";

const DownloadModal = ({ isOpen, closeModal}) => {
    if(!isOpen) {
        return null;
    }

    return (
        <div className="modal_wrap open">
            <div className="modal_bg" onClick={closeModal}></div>
            <div className="modal_box">
                <div className="modal_content appdown_cont">
                    <img src="/img/logo.svg" alt="패션&스타일 로고"/>
                    <h6>패션&스타일 앱에서 제공되는 혜택을<br/>놓치고 계신 건 아닌가요?</h6>
                    <p>패션&스타일 앱은 다양한 혜택 및 코디 탭을 제공 중!</p>
                    <button onClick={handleDownloadClick} className='down_btn'>
                        <span>앱 이용하기</span>
                    </button>
                    <button className='close_btn' onClick={closeModal}>
                        <span>괜찮아요, 모바일웹으로 볼게요.</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DownloadModal;