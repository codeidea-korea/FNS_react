import PostFrame from "@/components/PostFrame";
import TopicThumbnail from "@/components/TopicThumbnail";
import PostThumbnail from "@/components/PostThumbnail";
import IssueSlide from "@/components/IssueSlide";
import PopularList from "@/components/PopularList";


const Sample = ()=>{
    const postPreview = [
        {
            img:["/img/recommend/feed03_1.jpg","/img/recommend/feed03_2.jpg","/img/recommend/feed03_3.jpg","/img/recommend/feed03_4.jpg"],
            img_id:["calvinklein"],
            tag:["뉴진스","콜라보","캘빈클라인"],
            like:0,
            category:"셀럽 이슈",
            desc:"청량한 뉴진스 캠빈 데님룩💙<br/><br/>뉴진스가 지난 26일과 27일에 열린 뉴진스 팬미팅 'Bunnies Camp 2024 Tokyo Demo'에서 캠빈클라인의 특별한 의상을 선보였습니다. 캘빈클라인은 각 멤버들을 위해 '데님'을 주요 컨셉으로 5개의 의상을 제작했는데요. 캘빈클라인 모노그램 로고가 전체적으로 패턴화되어 있으며, 크리스탈 장식과 함께 캘빈클라인과 뉴진스의 특별 만남을 상징하는 로고 또한 각인되었습니다."
        },
    ];
    const bestData = [
        { src:"/img/thumbnail/post_1.png", title:"20대라 해도 믿을 한예슬 근황❤️‍🔥", category:"이연희" },
        { src:"/img/thumbnail/post_2.png", title:"와이드로 편하게🤍 @화이트팬츠", category:"화이트팬츠" },
        { src:"/img/thumbnail/post_3.png", title:"영롱한 셀린느 트리옹프 목걸이✨", category:"셀린느" },
        { src:"/img/thumbnail/post_4.png", title:"힙한 신혼여행 코디🏖️🇹🇭 김보라", category:"김보라" },
        { src:"/img/thumbnail/post_5.png", title:"미모 열일 중인 수지 너무 청순해🖤", category:"수지" },
    ];
    const slideData = [
        { src:"/img/thumbnail/asso_1.jpg", title:"여름이니까 크로셰모자🤍✨", category:"모자" },
        { src:"/img/thumbnail/asso_2.jpg", title:"캠퍼스를 입은 셀럽들의 축제 스타일링💙", category:"파티룩" },
        { src:"/img/thumbnail/asso_3.jpg", title:"여름 코르테즈는 화이트🤍👟", category:"웨딩" },
        { src:"/img/thumbnail/asso_4.jpg", title:"뉴진스 x 무라카미 다카시🌼 🪻 팬아트 출시되나요??", category:"뉴진스" },
    ];
    const popularTag = [
        {src:"/img/thumbnail/topic_1.png", name:"와이드팬츠"},
        {src:"/img/thumbnail/post_1.png", name:"화이트팬츠"},
        {src:"/img/thumbnail/post_2.png", name:"이미스"},
        {src:"/img/thumbnail/post_4.png", name:"아이다스 쇼츠"},
        {src:"/img/thumbnail/topic_5.png", name:"반팔블라우스"},
    ];


    const PreveiwHandle = (e)=>{
        if(e.currentTarget.nextSibling.style.display == "block"){
            e.currentTarget.nextSibling.style.display = "none"
        }else{
            e.currentTarget.nextSibling.style.display = "block"
        }
    }

    



    return (
        <div style={{paddingBottom:"80px"}}>
            <h1 style={{fontSize:"30px", fontWeight:"500", textAlign:"center"}}>컴포넌트</h1>
            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 프리뷰</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<PostFrame data={postPreview[0]} />`}  </p>
            <div style={{display:"none"}}>
                <PostFrame data={postPreview[0]} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>토픽 썸네일</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<TopicThumbnail img={"/img/thumbnail/topic_1.png"} title={"7월 헤어는 여름<br/>단발 열풍"} desc={"더위에 시원한 헤어 준비🍧"} />`}  </p>
            <div style={{display:"none"}}>
                <TopicThumbnail img={"/img/thumbnail/topic_1.png"} title={"7월 헤어는 여름<br/>단발 열풍"} desc={"더위에 시원한 헤어 준비🍧"} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 썸네일 넷플릭스 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<IssueSlide title={"미니멀한 셀럽 이슈"} data={slideData} />`}  </p>
            <div style={{display:"none"}}>
                <IssueSlide title={"미니멀한 셀럽 이슈"} data={slideData} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>태그 - 연관태그</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<PopularList title={"실시간 인기태그"} data={popularTag} />`}  </p>
            <div style={{display:"none"}}>
                <PopularList title={"실시간 인기태그"} data={popularTag} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 썸네일 랭킹 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<PostThumbnail rank={true} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={true} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 썸네일 일반 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<PostThumbnail rank={false} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={false} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>태그 x 포스트 썸네일 일반 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<PostThumbnail rank={false} associated={true} data={bestData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={false} associated={true} data={bestData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>태그 x 포스트 썸네일 2*2 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<PostThumbnail rank={false} associated={true} same_type={true} data={bestData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={false} associated={true} same_type={true} data={bestData} profileName={"뉴진스"} profileUrl={"/img/thumbnail/asso_1.jpg"} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 썸네일 2*2 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<PostThumbnail rank={false} same_type={true} data={bestData} title={"0월의 이슈코디"} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={false} same_type={true} data={bestData} title={"0월의 이슈코디"} />
            </div>

            <div style={{margin:"20px 0"}}></div>

            <h2 style={{paddingTop:"10px", fontSize:"26px", fontWeight:"400", textAlign:"center", backgroundColor:"#f0f0f0"}}>포스트 썸네일 텍스트 겹쳐져있는 구조</h2>
            <p style={{paddingBottom:"10px",textAlign:"center", backgroundColor:"#f0f0f0", cursor:"pointer"}} onClick={PreveiwHandle}>{`<PostThumbnail rank={false} same_type={true} data={bestData} title={"0월의 이슈코디"} />`}  </p>
            <div style={{display:"none"}}>
                <PostThumbnail rank={false} same_type={true} overlapping={true} data={bestData} title={"추천 토픽"} />
            </div>




        </div>
    )
}
export default Sample;