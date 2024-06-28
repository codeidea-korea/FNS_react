import { Link } from "react-router-dom";

const TopicThumbnail = ({img,title,desc})=>{

    return (
        <section>
            <div className="topic_thumbnail">
                <Link>
                    <img src={img} alt={title+" 이미지"} />
                    <div className="txt_box">
                        <h5 dangerouslySetInnerHTML={{__html:title}}></h5>
                        <p>{desc}</p>
                    </div>
                </Link>
            </div>
        </section>
    )
}
export default TopicThumbnail;