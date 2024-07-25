import Lottie from "lottie-react";
import LottieLogo from "../assets/json/logo.json"
import React, {useEffect, useState} from "react";
import {createRoot} from 'react-dom/client';

/* 접속 url 혹은 메뉴를 이용하여 해당 페이지에서 호출할 api url을 조회 */
export const getApiUrl = async (gnb) => {
    const mainGnbIds = ['10001', '10002', '10003']; // 기본 메인 메뉴들
    const pathname = window.location.pathname;
    const lastSlashIndex = pathname.lastIndexOf('/');
    const lastPart = pathname.substring(lastSlashIndex + 1);
    let apiUrl;

    if (mainGnbIds.includes(lastPart)) {
        apiUrl = `/api/v1/ui/view/${lastPart}`;

    }else {
        apiUrl = `/api/v1/ui/viewpage/tag/${lastPart}`;
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