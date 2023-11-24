import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import TestActionsView from "../../testActions";

function TestListView({
    item,
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();


    return (
        <div className="test-view-list-container">

            <div className="test-view-list-header">
                <div className="test-view-list-header-left" onClick={() => {
                    dispatch(toggleNoRedirect(true))
                    dispatch(togglePlayer({
                        playerOpen: true,
                        playerData: item,
                    }));
                }}>
                    {item.name}
                </div>

                <div className="test-view-list-header-left">
                   
                    <TestActionsView 
                        item={item}
                    />
                </div>
            </div>

            <div className="test-view-list-content">

            </div>



        </div>
    );
}

export default TestListView;
