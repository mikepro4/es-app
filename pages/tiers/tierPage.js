import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import Icon from "@/components/icon";

import TierActionsView from "@/components/collection_actions/tierActions";

import { tierUpdateItem, updateCollectionItem, tierItem, tierUpdateManyItems } from "@/redux";


function TierPageContainer({
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [tier, setTier] = useState(false);

    const fetchTier = () => {
        dispatch(tierItem({
            id: router.query.tierId,
            callback: (data) => {
                console.log(data);
                setTier(data)
                dispatch(updateCollectionItem(null))
                dispatch(toggleParamsData(data))
                if(data.code) {
                    setCodeItems(data.code)
                }
            }
        }))
    }

    useEffect(() => {
        fetchTier()

        return () => {

        };
    }, []);

    useEffect(() => {
        if (app.updateCollectionItem && app.updateCollectionItem == tier?._id) {
            fetchTier()
        }

    }, [app.updateCollectionItem]);

    useEffect(() => {
        if (router.query.tierId && tier?._id && router.query.tierId !== tier?._id) {
            fetchTier()
        }
    }, [router]);

     

    return (
        <div className="music-page-container tier-page-container">

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
                                pathname: '/tiers',
                                query: { ...router.query, tierId: null },
                            }, undefined, { shallow: true })
                        }
                    }
                    />

                </div>

                <div className="music-page-container-header-right">
                <TierActionsView
                        item={tier}
                    />
                </div>
            </div>

            <h1>{tier && tier.name} </h1>

            
            
           
        </div>
    );
}

export default TierPageContainer;
