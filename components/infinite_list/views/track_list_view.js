import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import TrackActionsView from "@/components/collection_actions/trackActions";

import Button from "@/components/button";

import Icon from "@/components/icon";

function TrackListView({
    item,
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();


    return (
        <div className="track-view-list-container" 
            >
            <div 
                className="track-view-list-left"
                onClick={() => {
                    router.push({
                        pathname: '/music',
                        query: { ...router.query, tab: 1, trackId: item._id },
                    }, undefined, { shallow: true })
                }}
            >
                <div className="track-name">
                    {item.name}
                </div>

                <div className="track-slug">
                    {item.slug}
                </div>
            </div>
            <div className="track-view-list-right">
                {item.default && <Label
                    label="Default"
                    intent="neutral"
                />}
                <TrackActionsView
                    item={item}
                />
            </div>

            {/* <Button
                minimal={true}
                label={item.name}
                actionList={true}
                iconRight="arrow-right"
            /> */}


        </div>
    );
}

export default TrackListView;
