import Lottie from "lottie-react";
import LottieLogo from "../assets/json/logo.json"
import React, {useEffect, useState} from "react";
import { createRoot } from 'react-dom/client';

/* 접속 url 혹은 메뉴를 이용하여 해당 페이지에서 호출할 api url을 조회 */
export const getApiUrl = async (gnb, pk) => {
    const mainGnbIds = ['10001', '10002', '10003']; // 기본 메인 메뉴들
    const tagGnbIds = ['10004', '10005', '10006', '10007', '10008']; // 태그 관련 메뉴들
    const allGnbIds = mainGnbIds.concat(tagGnbIds); // gnb 전체 메뉴들
    const pathname = window.location.pathname;
    const lastSlashIndex = pathname.lastIndexOf('/');
    const lastPart = pathname.substring(lastSlashIndex + 1);
    let apiUrl = '/';

    /**
     * Test
     * 외부사이트(NAVER, Google) 등 검색이나 공유 링크 등으로 들어왔을때 링크 처리를 어떻게해야하나?
     */
    const seachParams = new URLSearchParams(window.location.seach);
    // tag_preview_name = 차정원, 강민겸 ..
    const tagPreviewName = searchParams.get('tag_preview_name');

    if (allGnbIds.includes(lastPart)) {
        // gnb 메뉴 클릭시 담기는 해당 메뉴의 key값
        if (!pk) {
            /* pk가 없다는건 클릭해서 들어온게 아니라 url을 직접 접속한 경우임
            이런 경우에는 gnb에서 해당하는 key값을 다시 찾아야됨 */
            const gnbObjectByLastPart = gnb.find(item => item.gnb_id === lastPart);
            pk = gnbObjectByLastPart.gnb_vw_type_cd === 'VW002001' ? gnbObjectByLastPart.gnb_id : gnbObjectByLastPart.gnb_param_value;

            console.log(pk);
        }

        if (mainGnbIds.includes(lastPart)) {
            apiUrl = `/api/v1/ui/view/${pk}`;
            console.log(apiUrl);
        } else if (tagGnbIds.includes(lastPart)) {
            apiUrl = `/api/v1/ui/viewpage/tag/${pk}`;
            console.log(apiUrl);
        }
    }

    return apiUrl;
}

/* 포스트 상세에서 시간을 표시할 때 사용하는 함수 */
export const formatDateString = (postedTimeStr) => {
    const postedTime = new Date(postedTimeStr);
    const now = new Date();
    const difference = now - postedTime;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (days < 1) {
        if (seconds < 60) {
            return `${seconds}초 전`;
        }

        if (minutes < 60) {
            return `${minutes}분 전`;
        }

        if (hours < 24) {
            return `${hours}시간 전`;
        }
    }

    if (days < 7) {
        return `${days}일 전`;
    }

    if (days < 30) {
        return `${weeks}주 전`;
    }

    if (days >= 30) {
        return `${postedTime.getMonth() + 1}월 ${postedTime.getDate()}일`;
    }

    if (now.getFullYear() !== postedTime.getFullYear()) {
        return `${postedTime.getFullYear()}년 ${postedTime.getMonth() + 1}월 ${postedTime.getDate()}일`;
    }

    return `${postedTime.getMonth() + 1}월 ${postedTime.getDate()}일`;
}

/* 로딩 에니메이션 효과를 보여주고 0.6초 후 제거 */
export const showLoadingAnimation = () => {
    const LoadingComponent = () => {
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 600);

            return () => clearTimeout(timer);
        }, []);

        if (!isLoading) return null;

        return (
            <div id="loading_lottie">
                <Lottie speed={5} className='lottie_logo' animationData={LottieLogo}/>
            </div>
        );
    };

    const div = document.createElement('div');
    document.body.appendChild(div);

    const root = createRoot(div);
    root.render(<LoadingComponent/>);

    setTimeout(() => {
        root.unmount();
        document.body.removeChild(div);
    }, 600); // 0.6초 후 로딩 애니메이션 숨기기 및 DOM 정리
}
