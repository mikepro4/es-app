import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import HardwareActionsView from "@/components/collection_actions/hardwareActions";

import Button from "@/components/button";

import Icon from "@/components/icon";

function HardwareListView({
    item,
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();


    return (
        <div className="hardware-view-list-container" 
            >
            <div 
                className="hardware-view-list-left"
                onClick={() => {
                    router.push({
                        pathname: '/music',
                        query: { ...router.query, hardwareId: item._id },
                    }, undefined, { shallow: true })
                }}
            >
                <div className="hardware-name">
                    {item.name}
                </div>

                <div className="hardware-slug">
                    {item.slug}
                </div>
            </div>
            <div className="hardware-view-list-right">
                {item.default && <Label
                    label="Default"
                    intent="neutral"
                />}
                <HardwareActionsView
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

export default HardwareListView;
