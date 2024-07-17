import {useEffect, useState, lazy} from "react";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import AxiosInstance from "../../common/AxiosInstance";
import Metatag from "../../components/Metatag";

const Frm12 = lazy(() => import('../../components/frames/Frm12.jsx'));
const Frm13 = lazy(() => import('../../components/frames/Frm13.jsx'));
const Frm21 = lazy(() => import('../../components/frames/Frm21.jsx'));
const Frm22 = lazy(() => import('../../components/frames/Frm22.jsx'));
const Frm23 = lazy(() => import('../../components/frames/Frm23.jsx'));
const Frm24 = lazy(() => import('../../components/frames/Frm24.jsx'));
const Frm26 = lazy(() => import('../../components/frames/Frm26.jsx'));
const Frm27 = lazy(() => import('../../components/frames/Frm27.jsx'));
const Frm28 = lazy(() => import('../../components/frames/Frm28.jsx'));

/* TODO : 고객사에게 전달받은 내용들
*   1번 과 25번은 현재  사용중이지 않습니다.
*   하지만 1번 프레임의 경우 UI가 추천영역의 게시글과 동일하오니, 작업 하실 때 참고 바랍니다.
*   25번 프레임의 경우 현재 28번 프레임으로 변경되어 사용중입니다.
* */

const Main = ({apiUrl}) => {
    const [frameComponents, setFrameComponents] = useState([]);
    const componentMap = {
        'Frm12' : Frm12,
        'Frm13' : Frm13,
        'Frm21' : Frm21,
        'Frm22' : Frm22,
        'Frm23' : Frm23,
        'Frm24' : Frm24,
        'Frm26' : Frm26,
        'Frm27' : Frm27,
        'Frm28' : Frm28,
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

                                if(DynamicFrameComponent) {
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