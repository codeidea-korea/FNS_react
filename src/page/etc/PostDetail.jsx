import React, {useEffect, useState} from "react";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import {componentMap} from '../../common/componentMap';
import AxiosInstance from "../../common/AxiosInstance";
import {useNavigate, useParams} from "react-router-dom";
import Post from "../../components/common/Post";

const PostDetail = () => {
    const navigate = useNavigate();
    const {yy, mm, dd, key} = useParams();
    const [frameComponents, setFrameComponents] = useState([]);
    const [post, setPost] = useState({});

    useEffect(() => {
        if (yy && mm && dd && key) {
            AxiosInstance.get(`/api/v1/post/preview_name/${yy}${mm}${dd}/${key}`).then((res) => {
                const contents = res.data.data;
                setPost(contents.post);

                const arrFrameComponents = [];

                contents.suggest.vw_groups.forEach((vwGroup, vwGroupIdx) => {
                    vwGroup.grp_items.forEach((grpItem, grpItemIdx) => {
                        const frmId = grpItem.itm_frm_id; // 프레임 id

                        const itm_link_param1 = grpItem.itm_link_param1;
                        const itm_link_id = grpItem.itm_link_id;

                        // (포스트 상세의 프레임 28) + (grpItem.itm_link_param1값이 TAG002002, TAG002012, TAG002005) 인 경우
                        if(frmId === '28' && (itm_link_param1 === 'TAG002002' || itm_link_param1 === 'TAG002012' || itm_link_param1 === 'TAG002005')) {
                            // itm_link_id를 이용해서 맞는 이미지를 추출
                            grpItem.itm_data.forEach((id) => {
                                const filteredImages = id.post_images.filter(pi => pi?.post_image_acc[0]?.post_image_acc_tag[0]?.tag_id === itm_link_id);

                                if (filteredImages.length > 0) {
                                    id.post_images = filteredImages;
                                }
                            });

                            if(grpItem.itm_data.length > 4) {
                                grpItem.itm_data = grpItem.itm_data.slice(0, 4);
                            }
                        }

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

                setFrameComponents(arrFrameComponents);

            }).catch(() => {
                goMain();
            });

        } else {
            goMain();
        }

    }, []);

    const goMain = () => {
        navigate('home/10001');
    }

    /* 특정 영역 아래로 스크롤이 내려가면 앱 다운로드 모달 표시 */
    const [isAlertShown, setIsAlertShown] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            const restrictedElement = document.querySelector('.main.section_box .post_frame');
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
                (post && post.post_images?.length > 0) && (
                    <div className="main section_box">
                        <Post openAppDownModalFn={openAppDownModal} post={post} showComment={true}/>

                        {frameComponents}
                    </div>
                )
            }
        </>
    )
}

export default PostDetail;