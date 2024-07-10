import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

// 모달 Open/Close 이벤트
import Modal from "@/page/common/Modal";

const PostFrame = ({data,descOpen})=>{
    // data : 데이터
    // descOpen : 설명글 오픈  T|F  (상세에서는 오픈)

    const desc = data.desc.split('<br/>');
    const [swiperActive, setSwiperActive] = useState(0)
    const navigate = useNavigate();

    const descHandle = (e)=>{
        let descBox = e.currentTarget.querySelector('.desc');
        if(desc.length>2){ // 더보기 버튼 있을때
            if(descBox.classList.contains('open')){
                // desc 모든텍스트 다 보일때
                navigate('/posts')
            }else{
                // desc 텍스트 일부 가려져있을때
                e.currentTarget.querySelector('.desc').classList.add('open')
            }
        }else{
            // 더보기 버튼 없을때
            navigate('/posts')
        }
    }

    const { modalId, openModal, closeModal, clickModalEvent } = Modal();

    return (
        <section className="post_frame">
            {/* 이미지 영역 */}
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={0}
                pagination={{dynamicBullets: true,}}
                modules={[Pagination]}
                className={`img_list ${(data.video && data.img.length == 0) && "video_only"}`}
                onSlideChange={(swiper) => setSwiperActive(swiper.activeIndex)}
            >
                {data.video && (
                    <SwiperSlide key="video" className='video_item'>
                        {/* poster 임시. 영상없어서 이미지로 대체 */}
                        <video poster="/img/thumbnail/video_1.png" autoPlay muted loop playsInline>
                            <source src="" type="video/mp4"/>
                        </video>
                        <div className="video_control"><span style={{width: `50%`}}></span></div>
                        <div className="video_volume">
                            <button><img src="/img/volume.svg" alt=""/></button>
                        </div>
                    </SwiperSlide>
                )}
                {data.img.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item} alt={data.img_id.length == 1 ? data.img_id + " 이미지" : data.img_id[index] + " 이미지"}/>
                    </SwiperSlide>
                ))}
                {data.img_id.length == 1 ?
                    <div className="tag_list">
                        <span className="active" onClick={clickModalEvent} id="source">instagram @{data.img_id}</span>
                    </div>
                    :
                    <div className="tag_list">
                        {data.img_id.map((item, index) => (
                            <span key={index} className={swiperActive == index ? "active" : ""} data-modal-id="source-modal" onClick={clickModalEvent}>instagram @{item}</span>))}
                    </div>
                }
                <div
                    className="pager">{swiperActive + 1} / {data.img.length + (data.video ? data.video.length : 0)}</div>
            </Swiper>

            {/* 텍스트 영역 */}
            <div className="txt_box">
                <div className="top_btn">
                    <div>
                        <button onClick={clickModalEvent} id="appDownload"><img src="/img/zzim.svg" alt="좋아요"/></button>
                        <button onClick={clickModalEvent} id="appDownload"><img src="/img/chat.svg" alt="댓글"/></button>
                        <button onClick={clickModalEvent} id="appDownload"><img src="/img/share.svg" alt="공유하기"/></button>
                    </div>
                    <button onClick={clickModalEvent} id="appDownload"><img src="/img/bookmark.svg" alt="북마크"/></button>
                </div>
                <div className="like_box">
                    <p>좋아요 {data.like}개</p>
                    <button onClick={clickModalEvent} id="appDownload">더 보기</button>
                </div>
                <div className="tag_box">
                    {data.tag.map((item, index) => (<button key={index}>{item}</button>))}
                </div>
                <div className="desc_box" onClick={descHandle}>
                    <div className={descOpen ? "desc open" : "desc"}>
                        {desc.map((item, index) => (
                            <p key={index}>{item}{(desc.length > 2 && index == 1) && <button>...더 보기</button>}</p>
                        ))}
                    </div>
                </div>
                <div className="category_box">
                    <button onClick={clickModalEvent} id="appDownload">{data.category}<img src="/img/arrow.svg" alt=""/></button>
                    <p>1일 전</p>
                </div>
                <div className="comment_list">
                    <p onClick={clickModalEvent} id="appDownload">댓글 16개 모두 보기</p>
                    <div className='comment_item'><b>yoongarden</b><span>우정하자 🔥</span></div>
                    <div className='comment_item'><b>userab</b><span>크리스탈 언니 여름 일상룩 아이템~</span></div>
                </div>
                <div className="comment_box">
                    <i><img src="/img/profile_img.jpg" alt=""/></i>
                    <div className="comment">댓글 달기</div>
                    <button>게시</button>
                </div>
            </div>

            {/* 인스타 출처 모달 */}
            {modalId === 'source' && (
                <div className="modal_wrap open" id='source-modal'>
                    <div className="modal_bg" onClick={closeModal}></div>
                    <div className="modal_box">
                        <div className="modal_header"><h3>출처 목록</h3></div>
                        <div className="modal_content">
                            <div className="insta_item">
                                {/* 출처가 셀럽일 경우 해당 셀럽으로 가는 > 화살표가 있지만 모바일 어플 다운로드 인터렙션 처리 */}
                                <Link>
                                    <i><img src="/img/insta_jennie.jpg" alt=""/></i>
                                    <div>
                                        <b>제니</b>
                                        <span>instagram @jennierubyjane</span>
                                    </div>
                                    <button onClick={clickModalEvent} id="appDownload">
                                        <img src="/img/more_arrow.svg" alt=""/>
                                    </button>
                                </Link>
                                <Link>
                                    <i><img src="/img/insta_jennie.jpg" alt=""/></i>
                                    <div>
                                        <b>제니</b>
                                        <span>instagram @jennierubyjane</span>
                                    </div>
                                    <img src="/img/more_arrow.svg" alt=""/>
                                </Link>
                                <Link>
                                    <i className="insta_icon"><img src="/img/insta_icon.svg" alt=""/></i>
                                    <div>
                                        <p>instagram @jemmg_</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 좋아요,댓글,공유 버튼 인터렙션 모달 */}
            {modalId === 'appDownload' && (
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
            )}

        </section>
    )
}

export default PostFrame;