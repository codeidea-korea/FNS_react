import { Helmet } from "react-helmet-async";

const Metatag = ({title = "패션 & 스타일 | Fashion & Style", desc, image})=>{
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />

            <meta property="og:locale" content="ko_KR"/>
            <meta property="og:site_name" content="패션 & 스타일 | Fashion & Style" />
            <meta property="og:type" content="website" />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:image" content={`${window.location.origin}${image}`} />
            <meta property="og:url" content={window.location.href} />
        </Helmet>
    )
}
export default Metatag;