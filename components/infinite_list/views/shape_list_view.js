import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import ShapeActionsView from "@/components/collection_actions/shapeActions";
import ShapeMainInfo from "@/components/shape_main_info";

import Icon from "@/components/icon";
import Viz from "@/components/viz";

function ShapeListView({
    item,
    scroll
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [paused, setPaused] = useState(false);
    const containerRef = useRef(null);

    console.log("Vizitem", item?.track)

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.05) {
                setPaused(false)
            } else {
                setPaused(true)
            }
        },
        {
            root: null, // null means it observes changes in the viewport
            threshold: 0.05 // 0.5 means 50% visibility
        }
    );

    useEffect(() => {

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [containerRef]);

    const renderContent = () => {
        if(!paused) {
            return(
                <>
                <div className="shape-view-list-shape-container"
                onClick={() => {
                    dispatch(toggleNoRedirect(true))
                    dispatch(togglePlayer({
                        playerOpen: true,
                        playerData: item
                    }))
                }}
            >
                <Viz
                    item={item.params}
                    respondToScroll={true}
                    scroll={scroll}
                    pause={app.playerOpen}
                    scale={5}
                />
            </div>


            <div className="shape-view-actions">
                <ShapeActionsView
                    item={item}
                />
            </div>

            <div className="shape-view-info">
                <ShapeMainInfo
                    item={item}
                    small={true}
                />
            </div>

            <div className="shape-view-arrow" onClick={() => {
                dispatch(toggleNoRedirect(true))
                dispatch(togglePlayer({
                    playerOpen: true,
                    playerData: item
                }))
            }}>
                <Icon name="arrow-forward" />
            </div>

                </>
            )
        }
    }

    return (
        <div className="shape-view-list-container " ref={containerRef}>
            {renderContent()}
        </div>
    );
}

export default ShapeListView;
