import React, {useEffect, useState} from "react";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import {componentMap} from '../../common/componentMap';
import AxiosInstance from "../../common/AxiosInstance";
import {useNavigate, useParams} from "react-router-dom";

const CategoryDetail = () => {
    const navigate = useNavigate();
    const {key} = useParams();
    const [frameComponents, setFrameComponents] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
        if (key === null || key === undefined || (typeof key === 'string' && key.trim() === '')) {
            goMain();

        } else {
            AxiosInstance.get(`/api/v1/ui/view/tag_preview_name/${key}`).then((res) => {
                const contents = res.data.data;
                const userAccount = (contents.vw_desc === '태그상세-셀럽' && contents.vw_user_account?.length > 0) ? contents.vw_user_account[0] : '';
                setData(contents);

                const arrFrameComponents = [];

                if (contents && contents.vw_groups?.length > 0) {
                    contents.vw_groups.forEach((vwGroup, vwGroupIdx) => {
                        vwGroup.grp_items.forEach((grpItem, grpItemIdx) => {
                            /*
                            * vwGroup.grp_id 값이 '22', '23', '24'인 경우에만 아래 로직을 적용
                            * post_images.post_image_user_tags[0]의 값이 contents.vw_user_account[0]랑 같은 이미지만 추출
                            * */
                            if (userAccount && ['22', '23', '24'].some(id => vwGroup.grp_id.includes(id))) {
                                grpItem.itm_data.forEach((id) => {
                                    const filteredImages = id.post_images.filter(postImage => postImage?.post_image_user_tags[0] === userAccount);

                                    if (filteredImages.length > 0) {
                                        id.post_images = filteredImages;
                                    }
                                });
                            }

                            const frmId = grpItem.itm_frm_id; // 프레임 id

                            if (grpItem.itm_data.length > 0) {
                                const DynamicFrameComponent = componentMap[`Frm${frmId}`];

                                if (DynamicFrameComponent) {
                                    arrFrameComponents.push(
                                        <DynamicFrameComponent
                                            key={`component_${vwGroupIdx}_${grpItemIdx}`}
                                            grpItem={grpItem}
                                            openAppDownModalFn={openAppDownModal}
                                        />
                                    );
                                }
                            }
                        });
                    });
                }

                setFrameComponents(arrFrameComponents);

            }).catch(() => {
                goMain();
            });
        }
    }, [key]);

    const goMain = () => {
        navigate('home/10001');
    }

    const [lastScroll, setLastScroll] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandle);

        return () => {
            window.removeEventListener('scroll', scrollHandle)
        }
    }, [lastScroll])

    const scrollHandle = () => {
        const top = document.querySelector('.top_detail')

        // 스크롤시 이전 버튼 같이 따라다니기
        const currentScrollY = window.scrollY;
        const prevBtn = top.querySelector('.btn_wrap')
        const scrollTit = document.querySelector('.scroll_tit')

        if (lastScroll < currentScrollY) {
            prevBtn.classList.remove('on')
            scrollTit.classList.remove('on')

        } else {
            prevBtn.classList.add('on')
            scrollTit.classList.add('on')
        }

        setLastScroll(currentScrollY)

        // 스크롤시 메뉴 보이기
        if (window.scrollY > (top.offsetTop + top.clientHeight)) {
            scrollTit.classList.add('active')

        } else {
            scrollTit.classList.remove('active')
        }
    }

    /* 특정 영역 아래로 스크롤이 내려가면 앱 다운로드 모달 표시 */
    const [isAlertShown, setIsAlertShown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const restrictedElement = document.querySelector('.main.section_box .topic_list');
            const sectionBottom = restrictedElement.getBoundingClientRect().bottom + window.scrollY + 120;
            const currentScroll = window.scrollY + window.innerHeight;

            if (currentScroll > sectionBottom) {
                window.scrollTo(0, sectionBottom - window.innerHeight);

                if (!isAlertShown) {
                    openAppDownModal();
                    setIsAlertShown(true);
                }

            } else {
                setIsAlertShown(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAlertShown]);

    return (
        <>
            {
                (data && frameComponents && frameComponents.length > 0) && (
                    <>

                        {/* 상단 타이틀 추가 */}
                        <div className='top_detail' style={{padding: '20px 20px 0 20px'}}>
                            <div className="btn_wrap">
                                {/*<button onClick={() => navigate(-1)} className='prev_btn'>
                                    <img src="/img/prev_arrow.svg" alt="이전페이지로 이동"/>
                                </button>*/}
                            </div>
                            <div className="tit_box">
                                <h3>{data.vw_title}</h3>
                                {/*<button className="follow_btn" onClick={openAppDownModal}>팔로우</button>*/}
                            </div>
                        </div>

                        {/* 스크롤시 메뉴 */}
                        <div className='scroll_tit'>
                            {/*<button onClick={() => navigate(-1)} className='prev_btn'>
                                <img src="/img/prev_arrow.svg" alt="이전페이지로 이동"/>
                            </button>*/}
                            <h3>{data.vw_title}</h3>
                            {/* 팔로잉 시 클래스 following 추가 */}
                            {/*<button className="follow_btn" onClick={openAppDownModal}>팔로우</button>*/}
                        </div>

                        <div className="main section_box">
                            {/* 프레임별 컴포넌트들 조합 */}
                            {frameComponents}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default CategoryDetail;