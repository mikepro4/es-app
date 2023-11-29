import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import AlbumActionsView from "@/components/collection_actions/albumActions";

import Button from "@/components/button";

import Icon from "@/components/icon";

function AlbumListView({
    item,
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();


    return (
        <div className="album-view-list-container" 
            >
            <div 
                className="album-view-list-left"
                onClick={() => {
                    router.push({
                        pathname: '/music',
                        query: { ...router.query, albumId: item._id },
                    }, undefined, { shallow: true })
                }}
            >
                <div className="album-name">
                    {item.name}
                </div>

                <div className="album-slug">
                    {item.slug}
                </div>
            </div>
            <div className="album-view-list-right">
                {item.default && <Label
                    label="Default"
                    intent="neutral"
                />}
                <AlbumActionsView
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

export default AlbumListView;
