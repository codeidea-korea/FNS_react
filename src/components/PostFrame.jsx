import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const PostFrame = ({data})=>{
    const desc = data.desc.split('<br/>');
    const [swiperActive, setSwiperActive] = useState(0)
    const navigate = useNavigate();

    const descHandle = (e)=>{
        let descBox = e.currentTarget.querySelector('.desc');
        if(desc.length>2){ // 더보기 버튼 있을때
            if(descBox.classList.contains('open')){
                // desc 모든텍스트 다 보일때
                navigate('/post')
            }else{
                // desc 텍스트 일부 가려져있을때
                document.querySelector('.desc').classList.add('open')
            }
        }else{
            // 더보기 버튼 없을때
            navigate('/post')
        }
    }

    return (
        <section className="post_frame">
            <Swiper  
                slidesPerView={'auto'}
                spaceBetween={0}
                pagination={{dynamicBullets: true, }}
                modules={[Pagination]}
                className="img_list"
                onSlideChange={(swiper)=> setSwiperActive(swiper.activeIndex)}
            >
                {data.img.map((item,index)=>(
                    <SwiperSlide key={index}>
                        <img src={item} alt={data.img_id.length == 1 ? data.img_id+" 이미지" : data.img_id[index]+" 이미지"} />
                    </SwiperSlide>
                ))}
                {data.img_id.length == 1 ? 
                    <div className="tag_list"><span className="active">instagram @{data.img_id}</span></div>
                    :
                    <div className="tag_list">
                        {data.img_id.map((item,index)=>(<span key={index} className={swiperActive == index ? "active":""}>instagram @{item}</span>))}
                    </div>
                }
            </Swiper>
            <div className="txt_box">
                <div className="top_btn">
                    <div>
                        <button><img src="./img/zzim.svg" alt="좋아요" /></button>
                        <button><img src="./img/chat.svg" alt="댓글" /></button>
                        <button><img src="./img/share.svg" alt="공유하기" /></button>
                    </div>
                    <button><img src="./img/bookmark.svg" alt="북마크" /></button>
                </div>
                <div className="like_box">
                    <p>좋아요 {data.like}개</p>
                    <button>더 보기</button>
                </div>
                <div className="tag_box">
                    {data.tag.map((item,index)=>(<button key={index}>{item}</button>))}
                </div>
                <div className="desc_box" onClick={descHandle}>
                    <div className="desc">
                        {desc.map((item,index)=>(
                            <p key={index}>{item}{(desc.length > 2 && index ==1 )&& <button>...더 보기</button>}</p>
                        ))}
                    </div>
                </div>
                <div className="category_box">
                    <button>{data.category}<img src="./img/arrow.svg" alt="" /></button>
                    <p>1일 전</p>
                </div>
                <div className="comment_box">
                    <i><img src="./img/profile_img.jpg" alt="" /></i>
                    <div className="comment">댓글 달기</div>
                    <button>게시</button>
                </div>
            </div>
        </section>
    )
}

export default PostFrame;