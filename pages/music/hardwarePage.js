import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import Icon from "@/components/icon";

import HardwareActionsView from "@/components/collection_actions/hardwareActions";

import { hardwareUpdateItem, updateCollectionItem, hardwareItem, hardwareUpdateManyItems } from "@/redux";


function HardwarePageContainer({
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [hardware, setHardware] = useState(false);
    const [scroll, setScroll] = useState(0);

    const fetchHardware = () => {
        dispatch(hardwareItem({
            id: router.query.hardwareId,
            callback: (data) => {
                console.log(data);
                setHardware(data)
                dispatch(updateCollectionItem(null))
                dispatch(toggleParamsData(data))
                if(data.code) {
                    setCodeItems(data.code)
                }
            }
        }))
    }

    useEffect(() => {
        fetchHardware()

        return () => {

        };
    }, []);

    useEffect(() => {
        if (app.updateCollectionItem && app.updateCollectionItem == hardware?._id) {
            fetchHardware()
        }

    }, [app.updateCollectionItem]);

    useEffect(() => {
        if (router.query.hardwareId && hardware?._id && router.query.hardwareId !== hardware?._id) {
            fetchHardware()
        }
    }, [router]);

     

    return (
        <div className="music-page-container hardware-page-container">

            <div className="music-page-container-header">

                <div className="music-page-container-header-left">
                    <Button
                        label="Back"
                        icon="arrow-left"
                        minimal={true}
                        small={true}
                        wrap={true}
                        onClick={() => {
                            router.push({
                                pathname: '/music',
                                query: { ...router.query, hardwareId: null },
                            }, undefined, { shallow: true })
                        }
                    }
                    />

                </div>

                <div className="music-page-container-header-right">
                <HardwareActionsView
                        item={hardware}
                    />
                </div>
            </div>

            <h1>{hardware && hardware.name} </h1>

            
            
           
        </div>
    );
}

export default HardwarePageContainer;
