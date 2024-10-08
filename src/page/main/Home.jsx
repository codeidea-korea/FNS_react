import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useGlobalContext} from '../../layout/GlobalContext';
import {getApiUrl} from "../../common/CommonUtils";
import Main from "../../page/main/Main";

const Home = () => {
    const {gnb} = useGlobalContext();
    const url = useLocation().pathname;
    const [apiUrl, setApiUrl] = useState(null);

    useEffect(() => {
        if (gnb.length > 0) {
            getApiUrl(gnb).then((res) => {
                if (res === '/') {
                    window.location.href = '/home/10001';

                }else {
                    setApiUrl(res);
                }
            });
        }
    }, [url, gnb]);

    return (
        <>
            <Main apiUrl={apiUrl}/>
        </>
    )
}

export default Home;