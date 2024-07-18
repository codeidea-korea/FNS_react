import React, {useEffect, useState, lazy} from "react";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import {componentMap} from '../../common/componentMap';
import AxiosInstance from "../../common/AxiosInstance";
import Metatag from "../../components/Metatag";
import {useNavigate, useParams} from "react-router-dom";

const Topic = () => {
    const navigate = useNavigate();
    const {key} = useParams();
    const [frameComponents, setFrameComponents] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
        if (key === null || key === undefined || (typeof key === 'string' && key.trim() === '')) {
            goMain();

        } else {
            AxiosInstance.get(`/api/v1/ui/viewpage/topic_preview_name/${key}`).then((res) => {
                const contents = res.data.data;
                console.log(contents)
                const arrFrameComponents = [];
                setData(contents);

                if (contents && contents.vw_groups?.length > 0) {
                    contents.vw_groups.forEach((vwGroup, vwGroupIdx) => {
                        vwGroup.grp_items.forEach((grpItem, grpItemIdx) => {
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

    return (
        <>
            {
                data && data.vw_filters?.length > 0 && (
                    <>
                        <Metatag desc="패션 & 스타일이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요." image="/img/thumbnail/topic_1.png"/>

                        {data.vw_filters?.length > 0 && (
                            <section className={'visual_type'}>
                                <div className={`topic_thumbnail`}>
                                    <a style={{cursor: "pointer"}} onClick={openAppDownModal}>
                                        <img src={data.vw_image_url} alt={'title' + " 이미지"}/>
                                        <div className="txt_box">
                                            <h5 dangerouslySetInnerHTML={{__html: data.vw_title}}></h5>
                                            <p>{data.vw_desc}</p>
                                        </div>
                                    </a>
                                </div>
                            </section>
                        )}
                        <div className="main section_box">
                            {
                                data.vw_groups.map((vwGroup, vwGroupIdx) => {
                                    return (
                                        <React.Fragment key={vwGroupIdx}>
                                            <section>
                                                <h3 className="main_tit">{vwGroup.grp_name}</h3>
                                            </section>
                                            {
                                                vwGroup.grp_items.map((grpItem, grpItemIdx) => {
                                                    const frmId = grpItem.itm_frm_id; // 프레임 id

                                                    if (grpItem.itm_data.length > 0) {
                                                        const DynamicFrameComponent = componentMap[`Frm${frmId}`];

                                                        if (DynamicFrameComponent) {
                                                            return (
                                                                <DynamicFrameComponent
                                                                    key={`component_${vwGroupIdx}_${grpItemIdx}`}
                                                                    grpItem={grpItem}
                                                                    openAppDownModalFn={openAppDownModal}
                                                                />
                                                            )
                                                        }
                                                    }
                                                })
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                            {/*visual_type class 필요*/}
                            {/*{frameComponents}*/}

                        </div>
                    </>
                )
            }

        </>
    )
}

export default Topic;