import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import TierActionsView from "@/components/collection_actions/tierActions";

import Button from "@/components/button";

import Icon from "@/components/icon";

function TierListView({
    item,
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();


    return (
        <div className="tier-view-list-container" 
            >
            <div 
                className="tier-view-list-left"
                onClick={() => {
                    router.push({
                        pathname: '/tiers',
                        query: { ...router.query, tierId: item._id },
                    }, undefined, { shallow: true })
                }}
            >
                <div className="tier-name">
                    {item.name}
                </div>

                <div className="tier-slug">
                    {item.slug}
                </div>
            </div>
            <div className="tier-view-list-right">
                {item.default && <Label
                    label="Default"
                    intent="neutral"
                />}
                <TierActionsView
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

export default TierListView;
