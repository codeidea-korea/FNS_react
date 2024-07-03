import { useRoutes } from "react-router-dom"
import BaseLayout from "@/layout/BaseLayout"
import Main from "@/page/main/Main"
import Everyday from "@/page/main/Everyday"
import Mypage from "@/page/mypage/Mypage"
import Recommend from "@/page/recommend/Recommend"
import Post from "@/page/recommend/Post"
import Sample from "@/page/mypage/Sample"


function Router(){
    const routes = [
        {
            path:"/",
            element: <BaseLayout />,
            children:[
                {
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
                },
            ]
        },
        {
            path:"/",
            element: <BaseLayout title={"추천"} />,
            children:[
                {
                    path: "/foryou",
                    element: <Recommend />
                }
            ]
        },
        {
            path:"/",
            element: <BaseLayout title={"포스트"} />,
            children:[
                {
                    path: "/posts",
                    element: <Post />
                }
            ]
        },
        {
            path:"/",
            element: <BaseLayout gnbHide={true} />,
            children:[
                {
                    path: "/mypage",
                    element: <Mypage />
                },
                {
                    path: "/sample", // 컴포넌트 확인 페이지 (임시)
                    element: <Sample />
                }
            ]
        },
    ]

    return useRoutes(routes)
}

export default Router