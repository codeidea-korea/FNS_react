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
            /* 현재 접속한 URL과 gnb를 이용하여 헤더 메뉴 노출 여부를 판단 */
            const getIsContainMenu = async () => {
                if (!url.includes('/home/')) {
                    return true;

                } else {
                    const lastSlashIndex = url.lastIndexOf('/');
                    const lastPart = url.substring(lastSlashIndex + 1);
                    let isContainGnb = false;

                    gnb.map((item) => {
                        if (item.gnb_vw_type_cd === 'VW002001') {
                            if (item.gnb_vw_id === lastPart) {
                                isContainGnb = true;
                            }

                        } else if (item.gnb_vw_type_cd === 'VW002003') {
                            if (item.gnb_param_value === lastPart) {
                                isContainGnb = true;
                            }
                        }
                    });

                    if(!isContainGnb) {
                        // TODO 여기서 9번째 메뉴 만들어 주고 ACTIVE 시키면 됨, 근데 메뉴 이름은 어떻게 구하지?
                    }

                    return false;
                }
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