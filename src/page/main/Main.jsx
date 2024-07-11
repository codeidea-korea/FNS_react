import {useEffect, useState} from "react";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import AxiosInstance from "../../common/AxiosInstance";
import Metatag from "../../components/Metatag";
import Frm1 from "../../components/frame/Frm1.jsx";
import Frm12 from "../../components/frame/Frm12.jsx";
import Frm13 from "../../components/frame/Frm13.jsx";
import Frm21 from "../../components/frame/Frm21.jsx";
import Frm22 from "../../components/frame/Frm22.jsx";
import Frm23 from "../../components/frame/Frm23.jsx";
import Frm24 from "../../components/frame/Frm24.jsx";
import Frm25 from "../../components/frame/Frm25.jsx";
import Frm26 from "../../components/frame/Frm26.jsx";
import Frm27 from "../../components/frame/Frm27.jsx";

const Main = ({apiUrl}) => {
    const [frames, setFrames] = useState([]);

    useEffect(() => {
        if (apiUrl) {
            AxiosInstance.get('/ui/view/page/10000').then((res) => {
            // AxiosInstance.get(apiUrl).then((res) => {
                const contents = res.data.data;

                console.log(contents)

                if (contents && contents?.vw_groups?.length > 0) {
                    const frameArr = [];

                    contents.vw_groups.forEach((vwGroup, vwGroupIdx) => {

                        vwGroup.grp_items.forEach((grpItem, grpItemIdx) => {

                            const frmId = grpItem.itm_frm_id; // 프레임 id

                            if (grpItem.itm_data.length > 0) {
                                switch (frmId) {
                                    case '1' : // Frame 1 : 포스트 프리뷰
                                        frameArr.push(
                                            <Frm1 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem}/>);
                                        break;

                                    case '12' : // Frame 12 :  태그-연관태그
                                        frameArr.push(
                                            <Frm12 key={`component_${vwGroupIdx}_${grpItemIdx}`} openAppDownModalFn={openAppDownModal} grpItem={grpItem}/>);
                                        break;

                                    case '13' : // Frame 13 : 태그-포스트 목록(커서드)
                                        frameArr.push(
                                            <Frm13 key={`component_${vwGroupIdx}_${grpItemIdx}`} openAppDownModalFn={openAppDownModal} grpItem={grpItem}/>);
                                        break;

                                    case '21' : // Frame 21 : 토픽 썸네일
                                        frameArr.push(
                                            <Frm21 key={`component_${vwGroupIdx}_${grpItemIdx}`} openAppDownModalFn={openAppDownModal} grpItem={grpItem}/>);
                                        break;

                                    case '22' : // Frame 22 : 포스트 썸네일 랭킹 구조
                                        frameArr.push(
                                            <Frm22 key={`component_${vwGroupIdx}_${grpItemIdx}`} openAppDownModalFn={openAppDownModal} grpItem={grpItem}/>);
                                        break;

                                    case '23' : // Frame 23 : 포스트 썸네일 일반 구조
                                        frameArr.push(
                                            <Frm23 key={`component_${vwGroupIdx}_${grpItemIdx}`} openAppDownModalFn={openAppDownModal} grpItem={grpItem}/>);
                                        break;

                                    case '24' : // Frame 24 : 포스트 썸네일 넷플릭스 구조
                                        frameArr.push(
                                            <Frm24 key={`component_${vwGroupIdx}_${grpItemIdx}`} openAppDownModalFn={openAppDownModal} grpItem={grpItem}/>);
                                        break;

                                    case '25' : // Frame 25 : 태그 x 포스트 썸네일 일반 구조
                                        frameArr.push(
                                            <Frm25 key={`component_${vwGroupIdx}_${grpItemIdx}`} openAppDownModalFn={openAppDownModal} grpItem={grpItem}/>);
                                        break;

                                    case '26' : // Frame 26 : 태그 x 포스트 썸네일 2*2 구조
                                        frameArr.push(
                                            <Frm26 key={`component_${vwGroupIdx}_${grpItemIdx}`} openAppDownModalFn={openAppDownModal} grpItem={grpItem}/>);
                                        break;

                                    case '27' : // Frame 27 : 포스트 썸네일 (2*2)
                                        frameArr.push(
                                            <Frm27 key={`component_${vwGroupIdx}_${grpItemIdx}`} openAppDownModalFn={openAppDownModal} grpItem={grpItem}/>);
                                        break;

                                    default :
                                        break;
                                }
                            }
                        });
                    });

                    setFrames(frameArr);
                }
            });
        }
    }, [apiUrl]);

    return (
        <>
            <Metatag desc="패션 & 스타일이 제공하는 최신 트렌드 패션 아이템과 다양한 셀럽들의 스타일을 만나보세요." image="/img/thumbnail/topic_1.png"/>

            <div className="main section_box">
                {frames}
            </div>
        </>
    )
}

export default Main;