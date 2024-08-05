import {useEffect, useState} from "react";
import {openAppDownModal} from '../../common/AppDownModalUtil';
import {componentMap} from '../../common/componentMap';
import AxiosInstance from "../../common/AxiosInstance";
import Metatag from "../../components/Metatag";
import {useLocation, useNavigate, useParams} from "react-router-dom";

/* TODO : 고객사에게 전달받은 내용들
*   1번 과 25번은 현재  사용중이지 않습니다.
*   하지만 1번 프레임의 경우 UI가 추천영역의 게시글과 동일하오니, 작업 하실 때 참고 바랍니다.
*   25번 프레임의 경우 현재 28번 프레임으로 변경되어 사용중입니다.
* */

const Main = ({apiUrl}) => {
    const url = useLocation().pathname;
    const navigate = useNavigate();
    const [frameComponents, setFrameComponents] = useState([]);
    const [metaDesc, setMetaDesc] = useState('');

    useEffect(() => {
        if (apiUrl) {
            AxiosInstance.get(apiUrl).then((res) => {
                // AxiosInstance.get('/api/v1/ui/view/page/10000').then((res) => {
                const contents = res.data.data;
                const arrFrameComponents = [];

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

                } else {
                    navigate('home/10001');
                }

                setFrameComponents(arrFrameComponents);

            }).catch(() => {
                navigate('home/10001');
            });
        }
    }, [apiUrl]);

    useEffect(() => {
        if (url) {
            if (url.includes('/tag/')) {
                setMetaDesc('패션 & 스타일(Fashion & Style) 에서 실시간으로 업데이트 되는 패션, 라이프스타일 뉴스를 만나보세요');

            } else {
                const pathSplitSlash = url.split('/');
                const id = pathSplitSlash[pathSplitSlash.length - 1];

                if (id === '10001') { // 메인
                    setMetaDesc('패션 & 스타일이 제공하는 최신 트렌드 패션아이템과 다양한 셀럽들의 스타일을 만나보세요.');

                } else if (id === '10002') { // 일상룩
                    setMetaDesc('시즌별 유행하는 아이템, 뷰티 관련 팁까지! 패션 & 스타일에서 만나보세요.');

                } else if (id === '10003') { // 셀럽룩
                    setMetaDesc('연예인의 일상 속 스타일링 이야기까지! 어디서도 찾기 힘든 패션 스타일 코디 추천, 패션 & 스타일에서 경험하세요.');

                } else { // 나머지 태그 관련 메뉴들
                    setMetaDesc('패션 & 스타일(Fashion & Style) 에서 실시간으로 업데이트 되는 패션, 라이프스타일 뉴스를 만나보세요');
                }
            }
        }
    }, [url]);

    return (
        <>
            {
                (metaDesc && metaDesc !== '') &&
                <Metatag
                    title={'패션 & 스타일|Fashion&Style'}
                    desc={metaDesc}
                />
            }

            <div className="main section_box">
                {frameComponents}
            </div>
        </>
    )
}

export default Main;