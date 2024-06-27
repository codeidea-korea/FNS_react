import { useRoutes } from "react-router-dom"
import BaseLayout from "../layout/BaseLayout"
import MypageLayout from "../layout/MypageLayout"
import Main from "../page/main/Main"
import Everyday from "../page/main/Everyday"
import Mypage from "../page/mypage/Mypage"
import Recommend from "../page/recommend/Recommend"
import RecommendLayout from "../layout/RecommendLayout"


function Router(){
    const routes = [
        {
            path:"/",
            element: <BaseLayout />,
            children:[
                {
                    path: "",
                    element: <Main />,
                },
                {
                    path: "/everyday",
                    element: <Everyday />,
                },
                {
                    path: "/cate2",
                    element: <Main />,
                },
                {
                    path: "/cate3",
                    element: <Main />,
                },
                {
                    path: "/cate4",
                    element: <Main />,
                },
                {
                    path: "/cate5",
                    element: <Main />,
                },
                {
                    path: "/cate6",
                    element: <Main />,
                },
                {
                    path: "/cate7",
                    element: <Main />,
                },
            ]
        },
        {
            path:"/",
            element: <RecommendLayout />,
            children:[
                {
                    path: "/recommend",
                    element: <Recommend />
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
                }
            ]
        }
    ]

    return useRoutes(routes)
}

export default Router