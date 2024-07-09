import {useEffect, useState} from "react";
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
            AxiosInstance.get(apiUrl).then((res) => {
                const contents = res.data.data;

                if (contents && contents?.vw_groups?.length > 0) {
                    const frameArr = [];

                    console.log('==============================================================================================================================');

                    contents.vw_groups.forEach((vwGroup, vwGroupIdx) => {

                        vwGroup.grp_items.forEach((grpItem, grpItemIdx) => {

                            const frmId = grpItem.itm_frm_id; // 프레임 id

                            console.log(frmId, grpItem);

                            switch (frmId) {
                                case '1' : // Frame 1 : 포스트 프리뷰
                                    frameArr.push(<Frm1 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem}/>);
                                    break;

                                case '12' : // Frame 12 :  태그-연관태그
                                    frameArr.push(<Frm12 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem} title={"실시간 인기태그"} data={popularTag}/>);
                                    break;

                                case '13' : // Frame 13 : 태그-포스트 목록(커서드)
                                    frameArr.push(<Frm13 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem} rank={false} same_type={true} data={bestData} title={"0월의 이슈코디"}/>);
                                    break;

                                case '21' : // Frame 21 : 토픽 썸네일
                                    frameArr.push(<Frm21 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem} img={"/img/thumbnail/topic_1.png"} title={"7월 헤어는 여름<br/>단발 열풍"} desc={"더위에 시원한 헤어 준비🍧"}/>);
                                    break;

                                case '22' : // Frame 22 : 포스트 썸네일 랭킹 구조
                                    frameArr.push(<Frm22 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem} rank={true} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData}/>);
                                    break;

                                case '23' : // Frame 23 : 포스트 썸네일 일반 구조
                                    frameArr.push(<Frm23 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem} rank={false} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData}/>);
                                    break;

                                case '24' : // Frame 24 : 포스트 썸네일 넷플릭스 구조
                                    frameArr.push(<Frm24 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem} title={"미니멀한 셀럽 이슈"} data={slideData}/>);
                                    break;

                                case '25' : // Frame 25 : 태그 x 포스트 썸네일 일반 구조
                                    frameArr.push(<Frm25 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem} rank={false} associated={true} data={bestData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"}/>);
                                    break;

                                case '26' : // Frame 26 : 태그 x 포스트 썸네일 2*2 구조
                                    frameArr.push(<Frm26 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem} rank={false} associated={true} same_type={true} data={bestData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"}/>);
                                    break;

                                case '27' : // Frame 27 : 포스트 썸네일 (2*2)
                                    frameArr.push(<Frm27 key={`component_${vwGroupIdx}_${grpItemIdx}`} grpItem={grpItem} rank={false} same_type={true} data={bestData} title={"0월의 이슈코디"}/>);
                                    break;

                                default :
                                    break;
                            }
                        });
                    });

                    setFrames(frameArr);
                }
            });
        }
    }, [apiUrl]);

    const postPreview = [
        {
            img: ["/img/recommend/feed03_1.jpg", "/img/recommend/feed03_2.jpg", "/img/recommend/feed03_3.jpg", "/img/recommend/feed03_4.jpg"],
            img_id: ["calvinklein"],
            tag: ["뉴진스", "콜라보", "캘빈클라인"],
            like: 0,
            category: "셀럽 이슈",
            desc: "청량한 뉴진스 캠빈 데님룩💙<br/><br/>뉴진스가 지난 26일과 27일에 열린 뉴진스 팬미팅 'Bunnies Camp 2024 Tokyo Demo'에서 캠빈클라인의 특별한 의상을 선보였습니다. 캘빈클라인은 각 멤버들을 위해 '데님'을 주요 컨셉으로 5개의 의상을 제작했는데요. 캘빈클라인 모노그램 로고가 전체적으로 패턴화되어 있으며, 크리스탈 장식과 함께 캘빈클라인과 뉴진스의 특별 만남을 상징하는 로고 또한 각인되었습니다."
        },
        {
            video: ["/img/thumbnail/video_1.png"],
            img: [],
            img_id: ["calvinklein"],
            tag: ["뉴진스", "콜라보", "캘빈클라인"],
            like: 0,
            category: "셀럽 이슈",
            desc: "청량한 뉴진스 캠빈 데님룩💙<br/><br/>뉴진스가 지난 26일과 27일에 열린 뉴진스 팬미팅 'Bunnies Camp 2024 Tokyo Demo'에서 캠빈클라인의 특별한 의상을 선보였습니다. 캘빈클라인은 각 멤버들을 위해 '데님'을 주요 컨셉으로 5개의 의상을 제작했는데요. 캘빈클라인 모노그램 로고가 전체적으로 패턴화되어 있으며, 크리스탈 장식과 함께 캘빈클라인과 뉴진스의 특별 만남을 상징하는 로고 또한 각인되었습니다."
        },
        {
            video: ["/img/thumbnail/video_1.png"],
            img: ["/img/recommend/feed03_1.jpg", "/img/recommend/feed03_2.jpg", "/img/recommend/feed03_3.jpg", "/img/recommend/feed03_4.jpg"],
            img_id: ["calvinklein"],
            tag: ["뉴진스", "콜라보", "캘빈클라인"],
            like: 0,
            category: "셀럽 이슈",
            desc: "청량한 뉴진스 캠빈 데님룩💙<br/><br/>뉴진스가 지난 26일과 27일에 열린 뉴진스 팬미팅 'Bunnies Camp 2024 Tokyo Demo'에서 캠빈클라인의 특별한 의상을 선보였습니다. 캘빈클라인은 각 멤버들을 위해 '데님'을 주요 컨셉으로 5개의 의상을 제작했는데요. 캘빈클라인 모노그램 로고가 전체적으로 패턴화되어 있으며, 크리스탈 장식과 함께 캘빈클라인과 뉴진스의 특별 만남을 상징하는 로고 또한 각인되었습니다."
        },
    ];

    const bestData = [
        {src: "/img/thumbnail/post_1.png", title: "20대라 해도 믿을 한예슬 근황❤️‍🔥", category: "이연희"},
        {src: "/img/thumbnail/post_2.png", title: "와이드로 편하게🤍 @화이트팬츠", category: "화이트팬츠"},
        {src: "/img/thumbnail/post_3.png", title: "영롱한 셀린느 트리옹프 목걸이✨", category: "셀린느"},
        {src: "/img/thumbnail/post_4.png", title: "힙한 신혼여행 코디🏖️🇹🇭 김보라", category: "김보라"},
        {src: "/img/thumbnail/post_5.png", title: "미모 열일 중인 수지 너무 청순해🖤", category: "수지"},
    ];

    const slideData = [
        {src: "/img/thumbnail/asso_1.jpg", title: "여름이니까 크로셰모자🤍✨", category: "모자"},
        {src: "/img/thumbnail/asso_2.jpg", title: "캠퍼스를 입은 셀럽들의 축제 스타일링💙", category: "파티룩"},
        {src: "/img/thumbnail/asso_3.jpg", title: "여름 코르테즈는 화이트🤍👟", category: "웨딩"},
        {src: "/img/thumbnail/asso_4.jpg", title: "뉴진스 x 무라카미 다카시🌼 🪻 팬아트 출시되나요??", category: "뉴진스"},
    ];

    const popularTag = [
        {src: "/img/thumbnail/topic_1.png", name: "와이드팬츠"},
        {src: "/img/thumbnail/post_1.png", name: "화이트팬츠"},
        {src: "/img/thumbnail/post_2.png", name: "이미스"},
        {src: "/img/thumbnail/post_4.png", name: "아이다스 쇼츠"},
        {src: "/img/thumbnail/topic_5.png", name: "반팔블라우스"},
    ];

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