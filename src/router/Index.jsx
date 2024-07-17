import {useRoutes} from "react-router-dom"
import BaseLayout from "../layout/BaseLayout"
import Home from "../page/main/Home"
import Foryou from "../page/foryou/Foryou"
import Mypage from "../page/mypage/Mypage"
import Sample from "../page/mypage/Sample"
import Topic from "../page/etc/Topic"

function Router() {
    return useRoutes(
        [
            {
                path: "/",
                element: <BaseLayout gnbHide={false}/>,
                children: [
                    {
                        path: "/sample", // 컴포넌트 확인 페이지 (임시)
                        element: <Sample/>
                    }
                ]
            },
            {
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
            {
                path: "/",
                element: <BaseLayout title={"추천"} gnbHide={false}/>,
                children: [
                    {
                        path: "/foryou",
                        element: <Foryou/>
                    }
                ]
            },
            {
                path: "/",
                element: <BaseLayout gnbHide={false}/>,
                children: [
                    {
                        path: "/mypage",
                        element: <Mypage/>
                    }
                ]
            },
            {
                path: "/",
                element: <BaseLayout title={"토픽"}/>,
                children: [
                    {
                        path: "/topic/:key",
                        element: <Topic/>
                    }
                ]
            },
            /*{
                path: "/",
                element: <BaseLayout title={"태그"}/>,
                children: [
                    {
                        path: "/tag/:key",
                        element: <Tag/>
                    }
                ]
            },*/
            /*{
                path: "/",
                element: <BaseLayout title={"카테고리"}/>,
                children: [
                    {
                        path: "/category/:key",
                        element: <Category/>
                    }
                ]
            },*/
            /*{
                path: "/",
                element: <BaseLayout title={"포스트"}/>,
                children: [
                    {
                        path: "/posts/:yy/:mm/:dd/:key",
                        element: <Post/>
                    }
                ]
            }*/
        ]
    );
}

export default Router