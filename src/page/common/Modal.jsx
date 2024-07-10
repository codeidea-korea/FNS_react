import React, {useState} from 'react'

const Modal = () => {
    // 모달 상태변수, 모달 Open 업데이트 함수
    const [modalId, doOpenModal] = useState(null); // 기본값은 null(modal open x)

    /**
     * ID에 맞는 모달을 연다.
     * @param modalId
     */
    const openModal = (modalId) => {
        doOpenModal(modalId);
    }

    // 클릭된 모달을 닫는다.
    const closeModal = () => {
        doOpenModal(null);
    }

    // 모달을 여는 이벤트
    const clickModalEvent = (e) => {
        e.preventDefault(); // 이벤트 전파 방지
        const modalId = e.currentTarget.id
        if (modalId) {
            openModal(modalId);
        }
    }

    /* 좋아요,댓글,공유 버튼 인터렙션 모달 */
    const renderAppDownloadModal  = () => {
        if(modalId === 'appDownload') {
            return (
                <div className="modal_wrap open">
                    <div className="modal_bg" onClick={closeModal}></div>
                    <div className="modal_box">
                        <div className="modal_content appdown_cont">
                            <img src="/img/logo.svg" alt="패션&스타일 로고"/>
                            <h6>패션&스타일 앱에서 제공되는 혜택을<br/>놓치고 계신 건 아닌가요?</h6>
                            <p>패션&스타일 앱은 다양한 혜택 및 코디 탭을 제공 중!</p>
                            <button className='down_btn'>
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

        return null;
    }

    return {modalId, openModal, closeModal, clickModalEvent, renderAppDownloadModal};
}

export default Modal;