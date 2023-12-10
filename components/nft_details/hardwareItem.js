import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import { hardwareCalculatePercentage, togglePlayer } from "@/redux";

function HardwareItem({ item, index }) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (item && item._id) {
            dispatch(hardwareCalculatePercentage({
                hardwareId: item._id,
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
            className="nft-hardware-item"
            onClick={() => {
                router.push({
                    pathname: '/music',
                    query: { tab: 3, hardwareId: item._id },
                }, undefined, { shallow: true })

                dispatch(
                    togglePlayer({
                        playerOpen: false,
                        playerData: null,
                    })
                );
            }}
        >
            <div className="nft-hardware-item-title">
                {item.name}
            </div>

            <div className="nft-hardware-item-percentage">
                <span
                    data-tooltip-id="my-tooltip" 
                    data-tooltip-content={`${percentage?.count} other shapes have this hardware`}
                >{percentage?.percentage}%</span>
            </div>
        </div>
    );
}

export default HardwareItem;
