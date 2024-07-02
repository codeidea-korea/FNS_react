import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { Link, useLocation } from 'react-router-dom';

const Header = ({title, gnbHide})=>{
    const url = useLocation().pathname;
    const [lineWidth, setLineWidth] = useState(0);
    const [lineLeft, setLineLeft] = useState(16);
    
    const [lastScroll, setLastScroll] = useState(0);

    useEffect(()=>{
        if(document.querySelector('.gnb_swiper .active')){
            setLineLeft(document.querySelector('.gnb_swiper .active').offsetLeft + 16)
            setLineWidth(document.querySelector('.gnb_swiper .active').clientWidth - 32)
        }
    },[])

    useEffect(()=>{
        window.addEventListener('resize',()=>{
            categoryPosition(document.querySelector('.gnb_swiper .active'))
        });
        return ()=>{
            window.addEventListener('resize',()=>{})
        }
    },[])
    

    const cateClick = (e) =>{
        const target = e.currentTarget;
        // 타겟 이동시키기
        categoryPosition(target);
        // underline 값 수정
        setLineWidth(e.currentTarget.clientWidth - 32);
        setLineLeft(e.currentTarget.offsetLeft + 16);
    }

    // gnb 클릭시 위치 이동 
    const categoryPosition = (target)=>{
        const swiper = document.querySelector('.gnb_swiper')
        const swiperWrap = document.querySelector(".gnb_swiper .swiper-wrapper");
        const lastSwiper = swiperWrap.querySelector('.swiper-slide:last-of-type');
        const swiperSize = lastSwiper.offsetLeft + lastSwiper.clientWidth; // swiper 전체 길이

        const targetSize = target.clientWidth; // 타겟 width값
        const targetPosition = target.offsetLeft; // 타겟 left 값
        const maxSwiper = swiperSize - swiper.clientWidth; // swiper 할수있는 최대 공간

        const changePosition = (-targetPosition) + (swiper.clientWidth/2) - (targetSize/2); // 타겟 화면 정중앙에 놓기

        setTimeout(() => {
            // 스와이프 할 수 있을때 
            if(swiper.clientWidth < swiperSize){
                // 포지션이 음수일때
                if(changePosition < 0){
                    if(changePosition < (maxSwiper * -1)){
                        // 마지막으로 고정
                        swiperWrap.style.transform = `translate3d(${maxSwiper * -1}px, 0, 0)`;
                    }else{
                        // 가운데로 이동
                        swiperWrap.style.transform = `translate3d(${changePosition}px, 0, 0)`;
                    }
                }else{
                    // 맨 앞으로 고정
                    swiperWrap.style.transform = `translate3d(0, 0, 0)`;
                }
            }else{
                // 맨앞으로 고정
                swiperWrap.style.transform = `translate3d(0, 0, 0)`;
            }
        },10);
        swiperWrap.style.transitionDuration = "500ms";
    }
    

    const headerScroll = ()=>{
        const currentScrollY = window.scrollY;
        // 스크롤 DOWN 했을때
        if(lastScroll < currentScrollY){
            document.querySelector('header').classList.add('header_mini')
        }else{
            document.querySelector('header').classList.remove('header_mini')
        }
        setLastScroll(currentScrollY)
    }

    useEffect(()=>{
        window.addEventListener("scroll",headerScroll)
        return ()=>{
            window.removeEventListener("scroll",headerScroll)
        }
    },[lastScroll])

    


    return (
        <>
            <header>
                <div className={title || gnbHide ? "top_area border_type":"top_area"}>
                    {title ? 
                        <>
                            {/* {title === "포스트" ? <Link to={"/recommend"} className="page_prev"><img src="/img/prev_arrow.svg" alt="" /></Link> : ""} */}
                            <div className="title">{title}</div>
                        </>
                        :
                        <h1 className="logo"><Link to={'/home/main'}><img src="/img/logo.svg" alt="" /></Link></h1>
                    }
                </div>
                <div className={title || gnbHide ? "gnb hidden" : "gnb"}>
                    <Swiper slidesPerView={'auto'} spaceBetween={0} className="gnb_swiper">
                        <SwiperSlide className={url === "/home/main" || url === "/mypage" || url === "/foryou" || url === "/posts" ? "active" : ""} onClick={cateClick}><Link to={'/home/main'}><span>메인</span><i className="underline" style={{width:`${lineWidth}px`, left:`${lineLeft}px`}}></i></Link></SwiperSlide>
                        <SwiperSlide className={url === "/home/realwaylook" ? "active" : ""} onClick={cateClick}><Link to={'/home/realwaylook'}><span>일상룩</span></Link></SwiperSlide>
                        <SwiperSlide className={url === "/home/celebritylook" ? "active" : ""} onClick={cateClick}><Link to={'/home/celebritylook'}><span>셀럽룩</span></Link></SwiperSlide>
                        <SwiperSlide className={url === "/home/10004" ? "active" : ""} onClick={cateClick}><Link to={'/home/10004'}><span>크리스탈</span></Link></SwiperSlide>
                        <SwiperSlide className={url === "/home/10005" ? "active" : ""} onClick={cateClick}><Link to={'/home/10005'}><span>남친룩</span></Link></SwiperSlide>
                        <SwiperSlide className={url === "/home/10006" ? "active" : ""} onClick={cateClick}><Link to={'/home/10006'}><span>네일트렌드</span></Link></SwiperSlide>
                        <SwiperSlide className={url === "/home/10007" ? "active" : ""} onClick={cateClick}><Link to={'/home/10007'}><span>티셔츠</span></Link></SwiperSlide>
                        <SwiperSlide className={url === "/home/10008" ? "active" : ""} onClick={cateClick}><Link to={'/home/10008'}><span>선글라스</span></Link></SwiperSlide>
                    </Swiper>
                </div>
            </header>
        </>
    )
}

export default Header;