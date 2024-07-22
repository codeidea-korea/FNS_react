import {useEffect, useState} from "react";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import {componentMap} from '../../common/componentMap';
import AxiosInstance from "../../common/AxiosInstance";
import Metatag from "../../components/Metatag";

/* TODO : 고객사에게 전달받은 내용들
*   1번 과 25번은 현재  사용중이지 않습니다.
*   하지만 1번 프레임의 경우 UI가 추천영역의 게시글과 동일하오니, 작업 하실 때 참고 바랍니다.
*   25번 프레임의 경우 현재 28번 프레임으로 변경되어 사용중입니다.
* */

const Main = ({apiUrl}) => {
    const [frameComponents, setFrameComponents] = useState([]);

    useEffect(() => {
        if (apiUrl) {
            // AxiosInstance.get('/api/v1/ui/view/page/10000').then((res) => {
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