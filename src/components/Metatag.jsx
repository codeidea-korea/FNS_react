import {Helmet} from "react-helmet-async";

const Metatag = ({title = '', desc = '', image = ''}) => {
    return (
        <Helmet>
            <title>{title}</title>

            <meta property="og:type"        content="website"/>
            <meta name="content-language"   content="kr"/>
            <meta name="copyright"          content="Copyrights © 2022 www.fashionandstyle.com All Rights Reserved"/>
            <meta name="robots"             content="ALL"/>
            <meta name="author"             content="www.fashionandstyle.com"/>

            <meta property="og:url"         content={window.location.href}/>

            <meta property="og:title"       content={title}/>
            <meta name="title"              content={title}/>
            <meta name="subject"            content={title}/>

            <meta property="og:description" content={desc}/>
            <meta name="description"        content={desc}/>
            <meta name="keywords"           content={desc}/>

            <meta property="og:image"       content={image}/>
        </Helmet>
    )
}

export default Metatag;