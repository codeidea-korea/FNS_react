import {useRoutes, Navigate} from "react-router-dom"
import BaseLayout from "../layout/BaseLayout"
import Sample from "../page/mypage/Sample"
import Detail from "../page/recommend/Detail"
import Home from "../page/main/Home"
import Foryou from "../page/foryou/Foryou"
import Mypage from "../page/mypage/Mypage"
import TopicDetail from "../page/etc/TopicDetail"
import TagDetail from "../page/etc/TagDetail"
import PostDetail from "../page/etc/PostDetail"
import CategoryDetail from "../page/etc/CategoryDetail"
import Test from "../page/etc/Test"
import LandingLayout from "../layout/LandingLayout"
import Landing from "../page/landing/Landing"
import Service from "../page/landing/service"
import Privacy from "../page/landing/privacy"
import Protection from "../page/landing/Protection"
import About from "../page/landing/About"

function Router() {
    return useRoutes(
        [
            { // 테스트 페이지
                path: "/test",
                element: <Test />,
            },
            { // 홈의 8개 메뉴
                path: "/",
                element: <BaseLayout gnbHide={false}/>,
                children:
                    [
                        {
                            path: "/home/10001",
                            element: <Home/>
                        },
                        {
                            path: "/home/10002",
                            element: <Home/>
                        },
                        {
                            path: "/home/10003",
                            element: <Home/>
                        },
                        {
                            path: "/home/tag/:key1/:key2",
                            element: <Home/>
                        }
                    ]
            },
            { // 추천
                path: "/",
                element: <BaseLayout title={"추천"} gnbHide={true}/>,
                children: [
                    {
                        path: "/foryou",
                        element: <Foryou/>
                    }
                ]
            },
            { // 마이페이지
                path: "/",
                element: <BaseLayout gnbHide={true}/>,
                children: [
                    {
                        path: "/mypage",
                        element: <Mypage/>
                    }
                ]
            },
            { // 토픽 상세
                path: "/",
                element: <BaseLayout/>,
                children: [
                    {
                        path: "/topic/:key",
                        element: <TopicDetail/>
                    }
                ]
            },
            { // 태그 상세
                path: "/",
                element: <BaseLayout/>,
                children: [
                    {
                        path: "/tag/:key",
                        element: <TagDetail/>
                    }
                ]
            },
            { // 카테고리 상세
                path: "/",
                element: <BaseLayout/>,
                children: [
                    {
                        path: "/category/:key",
                        element: <CategoryDetail/>
                    }
                ]
            },
            { // 포스트 상세
                path: "/",
                element: <BaseLayout title={"포스트"}/>,
                children: [
                    {
                        path: "/posts/:yy/:mm/:dd/:key",
                        element: <PostDetail/>
                    }
                ]
            },
            { // 컴포넌트 확인용 샘플 페이지
                path: "/",
                element: <BaseLayout gnbHide={false}/>,
                children: [
                    {
                        path: "/sample",
                        element: <Sample/>
                    }
                ]
            },
            { // 기존 F&S 페이지 추가
                path: "/",
                element: <LandingLayout/>,
                children: [
                    // 랜딩 미완료
                    {
                        path: "/landing",
                        element: <Landing/>
                    },
                    {
                        // 회사소개
                        path: "/aboutus",
                        element: <About />
                    },
                    {
                        // 이용약관
                        path: "/service",
                        element: <Service/>
                    },
                    {
                        // 개인정보처리방침
                        path: "/privacy",
                        element: <Privacy/>
                    },
                    {
                        // 청소년 보호정책
                        path: "/protection",
                        element: <Protection/>
                    }
                ]
            },
            { // 위에 작성된 경로가 아니면 메인으로 이동
                path: "*",
                element: <Navigate to="/home/10001" replace />
            },
        ]
    );
}

export default Router