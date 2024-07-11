import {useEffect, useState, lazy} from "react";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import AxiosInstance from "../../common/AxiosInstance";
import Metatag from "../../components/Metatag";

const Frm1 = lazy(() => import('../../components/frames/Frm1.jsx'));
const Frm12 = lazy(() => import('../../components/frames/Frm12.jsx'));
const Frm13 = lazy(() => import('../../components/frames/Frm13.jsx'));
const Frm21 = lazy(() => import('../../components/frames/Frm21.jsx'));
const Frm22 = lazy(() => import('../../components/frames/Frm22.jsx'));
const Frm23 = lazy(() => import('../../components/frames/Frm23.jsx'));
const Frm24 = lazy(() => import('../../components/frames/Frm24.jsx'));
const Frm25 = lazy(() => import('../../components/frames/Frm25.jsx'));
const Frm26 = lazy(() => import('../../components/frames/Frm26.jsx'));
const Frm27 = lazy(() => import('../../components/frames/Frm27.jsx'));

/* TODO
*   Frm25 : 고객사가 사용하지 않는 프레임이라고 전달 받음
* */

const Main = ({apiUrl}) => {
    const [frameComponents, setFrameComponents] = useState([]);
    const componentMap = {
        'Frm1'  : Frm1,
        'Frm12' : Frm12,
        'Frm13' : Frm13,
        'Frm21' : Frm21,
        'Frm22' : Frm22,
        'Frm23' : Frm23,
        'Frm24' : Frm24,
        'Frm25' : Frm25,
        'Frm26' : Frm26,
        'Frm27' : Frm27,
    };

    useEffect(() => {
        if (apiUrl) {
            AxiosInstance.get(apiUrl).then((res) => {
                const contents = res.data.data;
                const arrFrameComponents = [];

                if (contents && contents.vw_groups?.length > 0) {
                    contents.vw_groups.forEach((vwGroup, vwGroupIdx) => {
                        vwGroup.grp_items.forEach((grpItem, grpItemIdx) => {
                            const frmId = grpItem.itm_frm_id; // 프레임 id

                            if (grpItem.itm_data.length > 0) {
                                const DynamicFrameComponent = componentMap[`Frm${frmId}`];

                                arrFrameComponents.push(
                                    <DynamicFrameComponent
                                        key={`component_${vwGroupIdx}_${grpItemIdx}`}
                                        grpItem={grpItem}
                                        openAppDownModalFn={openAppDownModal}
                                    />
                                );
                            }
                        });
                    });
                }

                setFrameComponents(arrFrameComponents);
            });
        }
    }, [apiUrl]);

    return (
        <>
            <Metatag desc="패션 & 스타일이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요." image="/img/thumbnail/topic_1.png"/>

            <div className="main section_box">
                {frameComponents}
            </div>
        </>
    )
}

export default Main;