// 사용자가 접속중인 디바이스 및 운영체제에 따른 앱 다운로드 링크 분기
export const handleDownloadClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // 안드로이드 스마트 폰
    if (/android/i.test(userAgent)) {
        window.location.href
            = "https://play.google.com/store/search?q=%ED%8C%A8%EC%85%98%EC%95%A4%EC%8A%A4%ED%83%80%EC%9D%BC&c=apps&hl=ko";
    }
    // ios 기기
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href
            = "https://apps.apple.com/us/app/fashion-style/id123456789"; // 앱스토어 URL을 여기에 입력하세요
    }
    // macOS 기기
    else if (/Macintosh/.test(userAgent)) {
        window.location.href
            = "https://apps.apple.com/us/app/fashion-style/id123456789"; // 앱스토어 URL을 여기에 입력하세요
    }
    // 그 외 (ex : window pc)
    else {
        window.location.href
            = "https://play.google.com/store/search?q=%ED%8C%A8%EC%85%98%EC%95%A4%EC%8A%A4%ED%83%80%EC%9D%BC&c=apps&hl=ko";
    }
}