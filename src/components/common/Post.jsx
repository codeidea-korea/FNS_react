import React, {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';
import {formatDateString} from "../../common/CommonUtils";

/* 포스트 상세 */
const Post = ({openAppDownModalFn, post, showComment}) => {
    const [desc, setDesc] = useState([]);
    const [swiperActive, setSwiperActive] = useState(0);
    const [uniqueTags, setUniqueTags] = useState([]);
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        // video 영상 재생률 표시
        const handleTimeUpdate = () => {
            const currentTime = video.currentTime;
            const duration = video.duration;
            setProgress((currentTime / duration) * 100);
        };

        if (video) {
            video.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (video) {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            video.play();
                            setIsPlaying(true);

                        } else {
                            video.pause();
                            setIsPlaying(false);
                        }
                    });
                },
                // 비디오의 50% 이상이 보여야 재생됨
                {threshold: 0.5}
            );

            observer.observe(video);

            return () => {
                if (video) observer.unobserve(video);
            }
        }
    }, [videoRef]);

    useEffect(() => {
        if (post) {
            // 설명글 엔터 기준으로 자르기
            setDesc(post.post_desc.split('\n'));

            // 인스타 태그 목록에서 중복을 제거시키기
            const seen = new Set();

            const newTags = post.post_images.filter((item) => {
                const accName = item.post_image_acc[0]?.post_image_acc_name;
                if (accName) return seen.has(accName) ? false : seen.add(accName);
            });

            setUniqueTags(newTags);
        }
    }, [post]);

    // 이미지 슬라이드 할 때
    const changePostSlide = (swiper) => {
        const activeIndex = swiper.activeIndex;

        // 첫번째, 두번째 이미지만 볼 수 있음
        if (activeIndex === 0 || activeIndex === 1) {
            setSwiperActive(swiper.activeIndex);

            if (activeIndex === 1) {
                // 두번째 이미지인 경우 앱 이용 모달 보여줌
                openAppDownModalFn();
            }

        } else {
            // 세번째 부터는 강제로 두번째 이미지로 이동시키고 앱 이용 모달 보여줌
            swiper.slideTo(1);
            openAppDownModalFn();
        }
    }

    // 인스타 출처 태그 클릭시 모달 열기
    const modalOpen = (e) => {
        let parent = e.currentTarget.closest('.post_frame')
        parent.querySelector('.modal_wrap').classList.add('open');
    }

    // 인스타 출처 태그 모달 닫기
    const modalClose = (e) => {
        let modal = e.currentTarget.closest('.modal_wrap')
        modal.classList.remove('open')
    }

    // 포스트 본문 클릭 이벤트
    const clickDescArea = (e) => {
        let descBox = e.currentTarget.querySelector('.desc');

        if (desc.length > 2) {
            if (descBox.classList.contains('open')) {
                // desc 모든텍스트 다 보일때
                openAppDownModalFn();

            } else {
                // desc 텍스트 일부 가려져있을때
                e.currentTarget.querySelector('.desc').classList.add('open')
            }

        } else {
            // 더보기 버튼 없을때
            openAppDownModalFn();
        }
    }

    // 비디오 onLoadedData 이벤트
    const videoLoadedData = (e) => {
        // 가로가 세로보다 더 긴 경우
        if (e.target.videoWidth > e.target.videoHeight) {
            // 클래스 추가
            e.target.classList.add('type02');
        }
    }

    // 비디오 음소거 버튼 클릭 이벤트
    const toggleMute = () => {
        const video = videoRef.current;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    return (
        <section className="post_frame">
            {post && (
                <>
                    {/* 이미지 슬라이드 영역 */}
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={0}
                        pagination={{dynamicBullets: true}}
                        modules={[Pagination]}
                        className={`img_list`}
                        onSlideChange={(swiper) => changePostSlide(swiper)}
                    >
                        {/* 이미지가 2개 이상일 때만 SwiperSlide 적용 */}
                        {post.post_images.map((item, index) => {
                            if (item.post_video_yn === true) {
                                return (
                                    <SwiperSlide key={index} className={'video_item'}>
                                        <video ref={videoRef} poster={item.post_image_url} autoPlay muted loop playsInline onLoadedData={videoLoadedData}>
                                            <source src={item.post_video_urls[0].video_file_path} type="video/mp4"/>
                                        </video>
                                        <div className="video_control">
                                            <span style={{width: `${progress}%`}}></span>
                                        </div>
                                        <div className="video_volume">
                                            <button onClick={toggleMute}>
                                                <img src={isMuted ? '/img/volume.svg' : '/img/volume_on.svg'} alt={isMuted ? 'Unmute' : 'Mute'}/>
                                            </button>
                                        </div>
                                    </SwiperSlide>
                                )
                            } else {
                                return (
                                    <SwiperSlide key={index}>
                                        <img src={item.post_image_url} alt={`${post.post_desc} 이미지${(index + 1)}`}/>
                                    </SwiperSlide>
                                )
                            }
                        })}

                        {/* 이미지 우측 하단의 인스타 태그 */}
                        <div className="tag_list">
                            {post.post_images.map((item, index) => {
                                // post_image_acc_name가 없는 경우도 있어서 체크가 필요함
                                let imageAccName = item.post_image_acc[0]?.post_image_acc_name;
                                if (imageAccName) imageAccName = 'instagram @' + imageAccName;

                                return (
                                    <span key={index} className={swiperActive === index ? "active" : ""} onClick={modalOpen}>{imageAccName}</span>
                                )
                            })}
                        </div>

                        {/* 이미지 우측 상단의 번호 */}
                        <div className="pager">{swiperActive + 1} / {post.post_images.length} </div>
                    </Swiper>

                    <div className="txt_box">
                        {/* 좋아요, 댓글, 공유하기 버튼 라인 */}
                        <div className="top_btn">
                            <div>
                                <button onClick={openAppDownModalFn}><img src="/img/zzim.svg" alt="좋아요"/></button>
                                <button onClick={openAppDownModalFn}><img src="/img/chat.svg" alt="댓글"/></button>
                                <button onClick={openAppDownModalFn}><img src="/img/share.svg" alt="공유하기"/></button>
                            </div>
                            <button onClick={openAppDownModalFn}><img src="/img/bookmark.svg" alt="북마크"/></button>
                        </div>

                        {/* 좋아요 라인 */}
                        <div className="like_box">
                            <p>좋아요 {post?.post_like_user_ids?.length ?? 0}개</p>
                            {/*<button onClick={openAppDownModalFn}>더 보기</button>*/}
                        </div>

                        {/* 태그 라인 */}
                        <div className="tag_box">
                            {post.post_tags.map((item, index) => (
                                <button key={index} onClick={openAppDownModalFn}>{item.tag_name}</button>))}
                        </div>

                        {/* 본문 라인 */}
                        <div className="desc_box" onClick={clickDescArea}>
                            <div className={'desc'}>
                                {desc.map((item, index) => (
                                    <p key={index}>
                                        {item}

                                        {
                                            (desc.length > 2 && index === 1) &&
                                            <button>...더 보기</button>
                                        }
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* 카테고리 라인 */}
                        <div className="category_box">
                            <button onClick={openAppDownModalFn}>{post.post_cate_name}<img src="/img/arrow.svg" alt=""/>
                            </button>
                            <p>{formatDateString(post?.posted_at)}</p>
                        </div>

                        {/* TODO : 댓글 관련 내용 체크하고 개발 필요 */}

                        {/* 작성된 댓글 라인 */}
                        {showComment &&
                            <div className="comment_list">
                                <button style={{marginBottom: '10px'}} onClick={openAppDownModalFn}>댓글 16개 모두 보기</button>
                                <div className='comment_item'><b>yoongarden</b><span>우정하자 🔥</span></div>
                                <div className='comment_item'><b>userab</b><span>크리스탈 언니 여름 일상룩 아이템~</span></div>
                            </div>
                        }

                        {/* 댓글 작성 라인 */}
                        <div className="comment_box">
                            <i><img src="/img/profile_img.jpg" alt=""/></i>
                            <div className="comment" onClick={openAppDownModalFn}>댓글 달기</div>
                            <button onClick={openAppDownModalFn}>게시</button>
                        </div>
                    </div>

                    {/* 인스타그램 출처 모달 */}
                    <div className="modal_wrap" id='source-modal'>
                        <div className="modal_bg" onClick={modalClose}></div>
                        <div className="modal_box">
                            <div className="modal_header"><h3>출처 목록</h3></div>
                            <div className="modal_content">
                                <div className="insta_item">
                                    {
                                        uniqueTags && uniqueTags.map((item, index) => {
                                            // post_image_acc_name가 없는 경우도 있어서 체크가 필요함
                                            let imageAccName = item.post_image_acc[0]?.post_image_acc_name;
                                            if (imageAccName) imageAccName = 'instagram @' + imageAccName;

                                            return (
                                                <a key={index} style={{cursor: "pointer"}} onClick={openAppDownModalFn}>
                                                    <i className="insta_icon"><img src="/img/insta_icon.svg" alt=""/></i>
                                                    <div>
                                                        <p>{imageAccName}</p>
                                                    </div>
                                                    <img src="/img/more_arrow.svg" alt=""/>
                                                </a>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

export default Post;