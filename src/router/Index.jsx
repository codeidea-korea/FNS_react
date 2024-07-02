import { useRoutes } from "react-router-dom"
import BaseLayout from "@/layout/BaseLayout"
import MypageLayout from "@/layout/MypageLayout"
import Main from "@/page/main/Main"
import Everyday from "@/page/main/Everyday"
import Mypage from "@/page/mypage/Mypage"
import Recommend from "@/page/recommend/Recommend"
import RecommendLayout from "@/layout/RecommendLayout"
import PostLayout from "@/layout/PostLayout"
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
            element: <RecommendLayout />,
            children:[
                {
                    path: "/foryou",
                    element: <Recommend />
                }
            ]
        },
        {
            path:"/",
            element: <PostLayout />,
            children:[
                {
                    path: "/posts",
                    element: <Post />
                }
            ]
        },
        {
            path:"/",
            element: <MypageLayout />,
            children:[
                {
                    path: "/mypage",
                    element: <Mypage />
                },
                {
                    path: "/sample",
                    element: <Sample />
                }
            ]
        },
    ]

    return useRoutes(routes)
}

export default Router