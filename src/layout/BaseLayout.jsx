import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../page/common/Header';
import Quickmenu from '../page/common/Quickmenu';
import {useLocation} from 'react-router-dom';
import {useGlobalContext} from './GlobalContext';
import GlobalAppDownModal from "../common/AppDownModalUtil";

const BaseLayout = ({title, gnbHide}) => {
    const {gnb} = useGlobalContext();
    const url = useLocation().pathname;
    const [usGnbHide, setUsGnbHide] = useState(gnbHide);

    useEffect(() => {
        if (gnb && gnb.length > 0) {
            /*
            *   현재 접속한 URL을 이용하여 헤더의 gnb 노출 여부를 확인함
            *   lastPart : URL의 가장 마지막 / 뒤의 문자 (pk 느낌이라고 보면 됨)
            *   isTagMenu : 태그 관련 메뉴인가?
            *       lastPart 값이
            *       10001, 10002, 10003 === false
            *       10004, 10005, 10006, 10007, 10008 === true
            *   isGnbHide : gnb 메뉴를 숨길것인가?
            *       lastPart 값이 10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008 === false
            */
            const getIsContainMenu = async () => {
                const mainGnbIds = ['10001', '10002', '10003'];
                const tagGnbIds = ['10004', '10005', '10006', '10007', '10008'];
                const allGnbIds = mainGnbIds.concat(tagGnbIds);
                const lastSlashIndex = url.lastIndexOf('/');
                const lastPart = url.substring(lastSlashIndex + 1);
                const isTagMenu = (mainGnbIds.includes(lastPart)) ? false : (tagGnbIds.includes(lastPart));
                let isGnbHide = !(allGnbIds.includes(lastPart));

                gnb.map((item) => {
                    if (item.gnb_vw_type_cd === 'VW002001' && !isTagMenu) {
                        if (item.gnb_vw_id === lastPart) {
                            isGnbHide = false;
                            return false;
                        }

                    } else if (item.gnb_vw_type_cd === 'VW002003' && isTagMenu) {
                        if (item.gnb_param_value === lastPart) {
                            isGnbHide = false;
                            return false;
                        }
                    }
                });

                return isGnbHide;
            }

            getIsContainMenu().then(res => {
                setUsGnbHide(res);
            });
        }
    }, [gnb, url]);

    return (
        <>
            <GlobalAppDownModal/>
            <Header title={title} gnbHide={usGnbHide}/> {/* 헤더 */}
            <Outlet/>
            <Quickmenu/> {/* 퀵메뉴 */}
        </>
    )
}

export default BaseLayout;