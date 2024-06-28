import PopularList from "@/components/PopularList";
import PostThumbnail from "@/components/PostThumbnail";
import TopicThumbnail from "@/components/TopicThumbnail"

const Main = ()=>{
    const bestData = [
        { src:"./img/thumbnail/post_1.png", title:"20대라 해도 믿을 한예슬 근황❤️‍🔥", category:"이연희" },
        { src:"./img/thumbnail/post_2.png", title:"와이드로 편하게🤍 @화이트팬츠", category:"화이트팬츠" },
        { src:"./img/thumbnail/post_3.png", title:"영롱한 셀린느 트리옹프 목걸이✨", category:"셀린느" },
        { src:"./img/thumbnail/post_4.png", title:"힙한 신혼여행 코디🏖️🇹🇭 김보라", category:"김보라" },
        { src:"./img/thumbnail/post_5.png", title:"미모 열일 중인 수지 너무 청순해🖤", category:"수지" },
    ];
    const popularTag = [
        {src:"./img/thumbnail/topic_1.png", name:"와이드팬츠"},
        {src:"./img/thumbnail/post_1.png", name:"화이트팬츠"},
        {src:"./img/thumbnail/post_2.png", name:"이미스"},
        {src:"./img/thumbnail/post_4.png", name:"아이다스 쇼츠"},
        {src:"./img/thumbnail/topic_5.png", name:"반팔블라우스"},
    ];
    const beautyData = [
        { src:"./img/thumbnail/img_1.png", title:"단발청순 스타일은 채수빈처럼💖", category:"채수빈" },
        { src:"./img/thumbnail/img_2.png", title:"중단발이 끌리는 요즘💇🏻‍♀️🌞", category:"중단발" },
        { src:"./img/thumbnail/img_3.png", title:"더워지니까 돌아온 단발병💇🏻‍♀️", category:"단발" },
        { src:"./img/thumbnail/img_4.png", title:"샌들과 찰떡 프렌치 페디큐어🤍", category:"네일" },
        { src:"./img/thumbnail/img_5.png", title:"주지훈 은퇴작 아니냐는 영화 탈출🧔🏻‍♀️", category:"주지훈" },
    ];


    return (
        <>
            <div className="main">
                <TopicThumbnail img={"./img/thumbnail/topic_1.png"} title={"7월 헤어는 여름<br/>단발 열풍"} desc={"더위에 시원한 헤어 준비🍧"} />

                <PostThumbnail rank={true} title={"지금 가장 핫한 패션 이슈<br/>BEST 5"} data={bestData} />

                <TopicThumbnail img={"./img/thumbnail/topic_2.png"} title={"셀럽의 액세서리<br/>패션"} desc={"액세서리 완성하는 셀럽 스타일..."} />
                <TopicThumbnail img={"./img/thumbnail/topic_3.png"} title={"셀럽들의 눈에<br/>띄는 셋업룩"} desc={"다양한 셋업 스타일링 소개🤲🏻"} />

                <PopularList title={"실시간 인기태그"} data={popularTag} />

                <TopicThumbnail img={"./img/thumbnail/topic_4.png"} title={"미미의 모든 것"} desc={"민소매, 모자, 반팔티, 양말..."} />
                <TopicThumbnail img={"./img/thumbnail/topic_5.png"} title={"블랙 패션<br/>스타일링"} desc={"다양한 룩 아이디어와 팁💡"} />

                <PostThumbnail rank={false} title={"뷰티 트렌드"} data={beautyData} />
            </div>
        </>
    )
}
export default Main;