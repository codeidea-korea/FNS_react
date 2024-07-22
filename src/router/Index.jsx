import {useRoutes, Navigate} from "react-router-dom"
import BaseLayout from "../layout/BaseLayout"
import Sample from "../page/mypage/Sample"
import Detail from "../page/recommend/Detail"
import Home from "../page/main/Home"
import Foryou from "../page/foryou/Foryou"
import Mypage from "../page/mypage/Mypage"
import Topic from "../page/etc/Topic"
import Tag from "../page/etc/Tag"

function Router() {
    return useRoutes(
        [
            { // 홈의 8개 메뉴
                path: "/",
                element: <BaseLayout gnbHide={true}/>,
                children:
                    [
                        {
                            path: "/home/:id",
                            element: <Home/>
                        }
                    ]
            },
            { // 추천
                path: "/",
                element: <BaseLayout title={"추천"} gnbHide={false}/>,
                children: [
                    {
                        path: "/foryou",
                        element: <Foryou/>
                    }
                ]
            },
            { // 마이페이지
                path: "/",
                element: <BaseLayout gnbHide={false}/>,
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
                        element: <Topic/>
                    }
                ]
            },
            { // 태그 상세
                path: "/",
                element: <BaseLayout/>,
                children: [
                    {
                        path: "/tag/:key",
                        element: <Tag/>
                    }
                ]
            },
            /*{ // 카테고리 상세
                path: "/",
                element: <BaseLayout title={"카테고리"}/>,
                children: [
                    {
                        path: "/category/:key",
                        element: <Category/>
                    }
                ]
            },*/
            /*{ // 포스트 상세
                path: "/",
                element: <BaseLayout title={"포스트"}/>,
                children: [
                    {
                        path: "/posts/:yy/:mm/:dd/:key",
                        element: <Post/>
                    }
                ]
            },*/
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
            { // 페이지 임의로 추가
                path: "/",
                element: <BaseLayout gnbHide={false}/>,
                children: [
                    {
                        path: "/detail",
                        element: <Detail/>
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