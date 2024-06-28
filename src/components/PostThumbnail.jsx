import { Link } from "react-router-dom";

const PostThumbnail = ({rank, title, data})=>{
    return (
        <section className="topic_list">
            <h3 dangerouslySetInnerHTML={{__html:title}}></h3>
            <ul>
                {data.map((item,index)=>(
                    <li key={index}>
                        <Link>
                            <div className="img_box">
                                <img src={item.src} alt={item.title+" 이미지"} />
                            </div>
                            <div className="txt_box">
                                {rank && <div className="rank">{index+1}</div>}
                                <div className="name">{item.title}</div>
                                <p className="cate">{item.category}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )

}
export default PostThumbnail;