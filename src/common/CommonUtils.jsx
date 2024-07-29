import Lottie from "lottie-react";
import LottieLogo from "../assets/json/logo.json"
import React, {useEffect, useState} from "react";
import {createRoot} from 'react-dom/client';

/* 접속 url 혹은 메뉴를 이용하여 해당 페이지에서 호출할 api url을 조회 */
export const getApiUrl = async () => {
    const mainGnbIds = ['/home/10001', '/home/10002', '/home/10003']; // 기본 메인 메뉴 3개
    const pathname = window.location.pathname;
    const pathSplitSlash = pathname.split('/');

    let apiUrl;

    if (mainGnbIds.includes(pathname)) {
        apiUrl = `/api/v1/ui/view/${pathSplitSlash[pathSplitSlash.length-1]}`;

    }else {
        apiUrl = `/api/v1/ui/viewpage/tag/${pathSplitSlash[pathSplitSlash.length-2]}`;
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

    if (now.getFullYear() !== postedTime.getFullYear()) {
        return `${postedTime.getFullYear()}년 ${postedTime.getMonth() + 1}월 ${postedTime.getDate()}일`;
    }

    if (days >= 30) {
        return `${postedTime.getMonth() + 1}월 ${postedTime.getDate()}일`;
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

/* 앱 이용하기 버튼 클릭시 */
export const clickUseApp = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    const androidURL = "https://play.google.com/store/apps/details?id=com.fas.android&hl=ko";
    const macURL = "https://apps.apple.com/kr/app/%ED%8C%A8%EC%85%98-%EC%8A%A4%ED%83%80%EC%9D%BC/id1620312420";
    const androidMobileURL = "market://details?id=com.fas.android"; // 플레이스토어 앱 다운로드 링크
    const iosMobileURL = "https://apps.apple.com/kr/app/%ED%8C%A8%EC%85%98-%EC%8A%A4%ED%83%80%EC%9D%BC/id1620312420"; // 앱스토어 링크

    if (/android/i.test(userAgent)) {
        if (/Mobile/i.test(userAgent)) {
            // 모바일 안드로이드
            window.open(androidMobileURL, '_blank');

        } else {
            // PC 윈도우
            window.open(androidURL, '_blank');
        }

    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // 모바일 iOS
        window.open(iosMobileURL, '_blank');

    } else if (/Macintosh/.test(userAgent)) {
        // PC 맥
        window.open(macURL, '_blank');

    } else {
        // 그 외 (PC 윈도우로 가정)
        window.open(androidURL, '_blank');
    }
}

/* 메타 태그 내용(텍스트) 정리 */
export const clearMetaText = (text) => {
    // 한글, 영어 대소문자, 숫자, 스페이스, 마침표, 쉼표, 한글 자모 ㄱ-ㅎ 제외 모든 문자를 스페이스(공백)으로 치환
    text = text.replace(/[^가-힣ㄱ-ㅎa-zA-Z0-9., ]/g, ' ');

    // 스페이스(공백)가 두개 이상인 경우 하나로 치환
    text = text.replace(/\s{2,}/g, ' ');

    // 앞뒤의 불필요한 공백 제거 및 문자열 끝의 공백 제거
    text = text.trim().trimEnd();

    return text;
}