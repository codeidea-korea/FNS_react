import {useRoutes} from "react-router-dom"
import BaseLayout from "@/layout/BaseLayout"
import Home from "@/page/main/Home"
import Foryou from "@/page/foryou/Foryou"

import Everyday from "@/page/main/Everyday"
import Mypage from "@/page/mypage/Mypage"
import Post from "@/page/recommend/Post"
import PostTest from "@/page/recommend/PostTest"
import Sample from "@/page/mypage/Sample"

function Router() {
    return useRoutes(
        [
            {
                path: "/",
                element: <BaseLayout />,
                children:
                [
                    {
                        path: "/home/:id",
                        element: <Home />,
                    }
                    /*{
                        path: "/home/main",
                        element: <Main />,
                    },
                    {
                        path: "/home/realwaylook",
                        element: <Everyday />,
                    },
                    {
                        path: "/home/celebritylook",
                        element: <Main />,
                    },
                    {
                        path: "/home/10004",
                        element: <Everyday />,
                    },
                    {
                        path: "/home/10005",
                        element: <Main />,
                    },
                    {
                        path: "/home/10006",
                        element: <Everyday />,
                    },
                    {
                        path: "/home/10007",
                        element: <Main />,
                    },
                    {
                        path: "/home/10008",
                        element: <Everyday />,
                    },*/
                ]
            },
            {
                path: "/",
                element: <BaseLayout title={"추천"}/>,
                children: [
                    {
                        path: "/foryou",
                        element: <Foryou/>
                    }
                ]
            },
            {
                path: "/",
                element: <BaseLayout title={"포스트"}/>,
                children: [
                    {
                        path: "/posts",
                        element: <Post/>
                    }
                ]
            },
            {
                path: "/",
                element: <BaseLayout title={"포스트 테스트"}/>,
                children: [
                    {
                        path: "/posts/2022/05/08/도예-취미로-힐링해볼까/101695",
                        element: <PostTest/>
                    }
                ]
            },
            {
                path: "/",
                element: <BaseLayout gnbHide={true}/>,
                children: [
                    {
                        path: "/mypage",
                        element: <Mypage/>
                    },
                    {
                        path: "/sample", // 컴포넌트 확인 페이지 (임시)
                        element: <Sample/>
                    }
                ]
            },
        ]
    );
}

export default Router