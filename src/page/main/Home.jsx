import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useGlobalContext} from '../../layout/GlobalContext';
import {getApiUrl} from "../../common/CommonUtils";
import Main from "../../page/main/Main";

const Home = () => {
    const {gnb, pk} = useGlobalContext();
    const location = useLocation();
    const [apiUrl, setApiUrl] = useState(null);

    useEffect(() => {
        if (gnb.length > 0) {
            getApiUrl(gnb, pk).then((res) => {
                if (res === '/') {
                    window.location.href = '/home/10001';

                }else {
                    setApiUrl(res);
                }
            });
        }
    }, [location.pathname, gnb, pk]);

    return (
        <>
            <Main apiUrl={apiUrl}/>
        </>
    )
}

export default Home;