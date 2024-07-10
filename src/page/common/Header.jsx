import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react'; // Import Swiper React components
import 'swiper/css'; // Import Swiper styles
import {useLocation, useNavigate} from 'react-router-dom';
import {useGlobalContext} from '../../layout/GlobalContext';

const Header = ({title, gnbHide}) => {
    const { gnb, setPk } = useGlobalContext();
    const url = useLocation().pathname;
    const navigate = useNavigate();
    const [lineWidth, setLineWidth] = useState(0);
    const [lineLeft] = useState(16);
    const [lastScroll, setLastScroll] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if (document.querySelector('.gnb_swiper .active')) {
                setLineWidth(document.querySelector('.gnb_swiper .active')?.clientWidth - 32)
            }
        }, 500);

        window.addEventListener('resize', () => {
            categoryPosition(document.querySelector('.gnb_swiper .active'))
        });
    }, []);

    // gnb 메뉴 클릭 이벤트
    const clickGnb = (gnbVwTypeCd, gnbVwId, gnbParamValue) => {
        setPk(gnbVwTypeCd === 'VW002001' ? gnbVwId : gnbParamValue);
        navigate(getMenuLink(gnbVwId));
    }

    // 메뉴에 적용시킬 active class
    const getMenuClassName = (gnbVwId) => {
        const linkUrl = getMenuLink(gnbVwId);

        if (linkUrl === url) {
            return 'active';

        } else {
            return '';
        }
    };

    // 메뉴에 적용시킬 underline i tag
    const getUnderLine = (gnbVwId) => {
        const linkUrl = getMenuLink(gnbVwId);

        if (linkUrl === url) {
            return <i className="underline" style={{width: `${lineWidth}px`, left: `${lineLeft}px`}}></i>;

        } else {
            return '';
        }
    };

    // 메뉴에 적용시킬 link url
    const getMenuLink = (gnbVwId) => {
        return `/home/${gnbVwId}`;
    };

    const cateClick = (e) => {
        const target = e.currentTarget;

        // 타겟 이동시키기
        categoryPosition(target);

        // underline 값 수정
        setLineWidth(e.currentTarget.clientWidth - 32);
    }

    // gnb 클릭시 위치 이동 
    const categoryPosition = (target) => {
        const swiper = document.querySelector('.gnb_swiper')
        const swiperWrap = document.querySelector(".gnb_swiper .swiper-wrapper");
        const lastSwiper = swiperWrap.querySelector('.swiper-slide:last-of-type');
        const swiperSize = lastSwiper.offsetLeft + lastSwiper.clientWidth; // swiper 전체 길이

        const targetSize = target.clientWidth; // 타겟 width값
        const targetPosition = target.offsetLeft; // 타겟 left 값
        const maxSwiper = swiperSize - swiper.clientWidth; // swiper 할수있는 최대 공간

        const changePosition = (-targetPosition) + (swiper.clientWidth / 2) - (targetSize / 2); // 타겟 화면 정중앙에 놓기

        setTimeout(() => {
            // 스와이프 할 수 있을때 
            if (swiper.clientWidth < swiperSize) {
                // 포지션이 음수일때
                if (changePosition < 0) {
                    if (changePosition < (maxSwiper * -1)) {
                        // 마지막으로 고정
                        swiperWrap.style.transform = `translate3d(${maxSwiper * -1}px, 0, 0)`;
                    } else {
                        // 가운데로 이동
                        swiperWrap.style.transform = `translate3d(${changePosition}px, 0, 0)`;
                    }
                } else {
                    // 맨 앞으로 고정
                    swiperWrap.style.transform = `translate3d(0, 0, 0)`;
                }
            } else {
                // 맨앞으로 고정
                swiperWrap.style.transform = `translate3d(0, 0, 0)`;
            }
        }, 10);
        swiperWrap.style.transitionDuration = "500ms";
    }

    const headerScroll = () => {
        const currentScrollY = window.scrollY;
        // 스크롤 DOWN 했을때
        if (lastScroll < currentScrollY) {
            document.querySelector('header').classList.add('header_mini')
        } else {
            document.querySelector('header').classList.remove('header_mini')
        }
        setLastScroll(currentScrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", headerScroll)
        return () => {
            window.removeEventListener("scroll", headerScroll)
        }
    }, [lastScroll])

    return (
        <>
            <header>
                <div className={title || gnbHide ? "top_area border_type" : "top_area"}>
                    {/*<Link to={"/recommend"} className="page_prev"><img src="/img/prev_arrow.svg" alt="" /></Link>*/}
                    {
                        title ? <div className="title">{title}</div>
                            : <div className='appdown_box'><h1 className="logo"><a href={'/home/10001'}><img src="/img/logo.svg" alt=""/></a><span>패션 & 스타일 앱에서 더 편리하게</span></h1> <button>앱으로 이동</button></div>
                    }
                </div>
                <div className={title || gnbHide ? "gnb hidden" : "gnb"}>
                    <Swiper slidesPerView={'auto'} spaceBetween={0} className="gnb_swiper">
                        {gnb.length > 0 && gnb.map((item) => {
                            return (
                                <SwiperSlide key={item.gnb_vw_id} className={getMenuClassName(item.gnb_vw_id)} data- onClick={cateClick}>
                                    <a style={{cursor: "pointer"}} onClick={() => clickGnb(item.gnb_vw_type_cd, item.gnb_vw_id, item.gnb_param_value)}>
                                        <span>{item.gnb_name}</span>
                                        {getUnderLine(item.gnb_vw_id)}
                                    </a>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </header>
        </>
    )
}

export default Header;