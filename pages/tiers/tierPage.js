import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Button from "@/components/button";
import TiersIcon from "@/components/icon/icons/tiers";

import TierActionsView from "@/components/collection_actions/tierActions";

import { tierUpdateItem, updateCollectionItem, tierItem, tierUpdateManyItems } from "@/redux";


function TierPageContainer({
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [tier, setTier] = useState(false);
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const [activeLetter, setActiveLetter] = useState(null);


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
        if(router.query.activeLetter) {
            setActiveLetter(router.query.activeLetter)
        } else {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, activeLetter: "A"}
            }, undefined, { shallow: true });
        }
        

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

        if (router.query.activeLetter && router.query.activeLetter !== activeLetter) {
            setActiveLetter(router.query.activeLetter)
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

            <div className="tiers-tree-container">
                <TiersIcon
                    activeLetters={["A", "Z", "L"]}
                />
            </div>

            <div className="alphabet-city">
                {alphabet.map(letter => (
                    <div 
                        className={classNames("alphabet-letter", {
                            "active": activeLetter === letter,
                        })}
                        key={letter} onClick={() =>  {
                            router.push({
                                pathname: router.pathname,
                                query: { ...router.query, activeLetter: letter}
                            }, undefined, { shallow: true });
                        }}>
                        {letter} 
                    </div>
                ))}
        </div>

            
            
           
        </div>
    );
}

export default TierPageContainer;
