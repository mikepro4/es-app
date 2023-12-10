import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import {hardwareCalculatePercentage} from "@/redux";

function HardwareItem({item, index}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if(item && item._id) {
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

    return (
        <div className="track-hardware-grid-item" key={index}>
            <div className="track-hardware-grid-item-left">
                <img src={item.imageLink} />
            </div>

            <div className="track-hardware-grid-item-right">
                <div className="hardware-title">
                    {item.name}
                </div>

                <div className="hardware-percentage" 
              
                >
                    <span
                      data-tooltip-id="my-tooltip" 
                      data-tooltip-content={`${percentage?.count} other shapes have this hardware`}
                    >{percentage?.percentage}%</span>
                </div>

            </div>
            
        </div>
    );
}

export default HardwareItem;
