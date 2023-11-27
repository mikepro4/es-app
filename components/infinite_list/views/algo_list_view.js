import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import AlgoActionsView from "@/components/collection_actions/algoActions";

import Button from "@/components/button";

import Icon from "@/components/icon";

function AlgoListView({
    item,
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();


    return (
        <div className="algo-view-list-container" 
            >
            <div 
                className="algo-view-list-left"
                onClick={() => {
                    router.push({
                        pathname: '/genesis',
                        query: { ...router.query, algoId: item._id },
                    }, undefined, { shallow: true })
                }}
            >
                <div className="algo-name">
                    {item.name}
                </div>

                <div className="algo-slug">
                    {item.slug}
                </div>
            </div>
            <div className="algo-view-list-right">
                {item.default && <Label
                    label="Default"
                    intent="neutral"
                />}
                <AlgoActionsView
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

export default AlgoListView;
