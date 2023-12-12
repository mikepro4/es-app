import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { tierCalculatePercentage, togglePlayer } from "@/redux";

function TierItem({ item, index }) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const appData = useSelector((state) => state.appData);
    const router = useRouter();
    const dispatch = useDispatch();
    const [percentage, setPercentage] = useState(0);

    const tier = appData.tiers.find((t) => t._id === item.tier)

    useEffect(() => {
        if (item && item.tier) {
            dispatch(tierCalculatePercentage({
                tierId: item.tier,
                tierLetter: item.tierLetter,
                callback: (data) => {
                    console.log(data);
                    setPercentage(data)
                }
            }))
        }


        return () => {

        };
    }, [item]);

    if (!item) return null;

    return (
        <div
            className="nft-tier-item"
            onClick={() => {
                router.push({
                    pathname: '/tiers',
                    query: { activeLetter: item.tierLetter, tierId: item.tier},
                }, undefined, { shallow: true })

                dispatch(
                    togglePlayer({
                        playerOpen: false,
                        playerData: null,
                    })
                );
            }}
        >
            <div className="nft-tier-item-title">
                {item.tierLetter}{tier?.name}
            </div>

            <div className="nft-tier-item-percentage">
                <span
                    data-tooltip-id="my-tooltip" 
                    data-tooltip-content={`${percentage?.count} other shapes have this hardware`}
                >{percentage?.percentage}%</span>
            </div>
        </div>
    );
}

export default TierItem;
