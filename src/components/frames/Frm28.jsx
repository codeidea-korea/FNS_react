import React, {useEffect, useState} from "react";

const Frm28 = ({openAppDownModalFn, grpItem}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(grpItem?.itm_data);
    }, [grpItem]);

    return (
        (data && data.length > 0) && (
            <section className={`topic_list`}>
                {
                    grpItem.vw_flt_image_url &&
                    <div className="title">
                        <a style={{cursor: "pointer"}} onClick={openAppDownModalFn}>
                            <i>
                                <img src={grpItem.vw_flt_image_url} alt={grpItem.vw_flt_name}/>
                            </i>
                            <span>{grpItem.vw_flt_name}</span>
                            <img src="/img/more_arrow.svg" alt=""/>
                        </a>
                    </div>
                }

                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <a style={{cursor: "pointer"}} onClick={openAppDownModalFn}>
                                <div className="img_box">
                                    <img src={item.post_images[0].post_image_url} alt={item.post_desc + " 이미지"}/>
                                </div>
                                <div className="txt_box">
                                    <div className="name">{item.post_desc}</div>
                                    <p className="cate">{item.post_tags[0].tag_name}</p>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        )
    )
}

export default Frm28;