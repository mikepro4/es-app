import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { shapeDelete, shapeUpdateItem, updateCollectionItem, toggleDrawer, shapeDuplicate, updateCollection, togglePlayer } from "@/redux";

function ShapeActionsView({
    item,
    onChange
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();

    let switchAction = (value) => {
        switch (value) {
            case "edit":
                console.log("edit")
                dispatch(toggleDrawer({
                    drawerOpen: open,
                    drawerType: "shape-settings",
                    drawerData: item,
                }));
                break;
            case "delete":
                console.log("delete")
                
                dispatch(
                    shapeDelete(
                        {
                            shapeId: item._id,
                            callback: (data) => {
                                dispatch(updateCollectionItem(item._id))
                                dispatch(togglePlayer({
                                    playerOpen: false,
                                    playerData: null
                                }))
                                
                            }
                        },)
                )
            case "duplicate":
                console.log("duplicate")
                dispatch(
                    shapeDuplicate(
                        {
                            shapeId: item._id,
                            callback: (data) => {
                                dispatch(updateCollection(true))
                                if(app.playerOpen) {
                                    dispatch(togglePlayer({
                                        playerOpen: true,
                                        playerData: data
                                    }))
                                }
                            }
                        },)
                )
                break;
            default:
                break;
        }
    }

    const selectIntent = (status) => {
        switch (status) {
            case "unreviewed":
                return "neutral";
            case "approved":
                return "success";
            case "rejected":
                return "danger";
            case "potential":
                return "info";
            default:
                return "neutral";
        }
    }


    return (

        <ul className="collection-view-actions">
            <li>

                <ParamSwitch
                    display="label"
                    intent={selectIntent(item.status)}
                    value={item.status}
                    offset={[20, 0]}
                    position="bottom left"
                    params={[
                        {
                            type: "links",
                            values: [
                                {
                                    label: "Approved",
                                    value: "approved",
                                    icon: "tick"
                                },
                                {
                                    label: "Rejected",
                                    value: "rejected",
                                    icon: "cross"
                                },
                                {
                                    label: "Unreviewed",
                                    value: "unreviewed",
                                    icon: "eye-off"
                                },
                                {
                                    label: "Potential",
                                    value: "potential",
                                    icon: "star"
                                },
                            ],
                        }
                    ]}
                    onChange={(value) => {
                        switchAction(value)
                        dispatch(
                            shapeUpdateItem({
                                data: {
                                    ...item,
                                    status: value
                                },
                                callback: (data) => {
                                    dispatch(updateCollectionItem(data._id))
                                    onChange && onChange(data)
                                }
                            }))
                        // alert(value)
                    }}
                />
            </li>

            <li>
                <ParamSwitch
                    type="local-icon"
                    icon="more-vertical"
                    value=""
                    position="bottom right"
                    offset={[10,0]}
                    params={[
                        {
                            type: "links",
                            values: [
                                {
                                    label: "Edit",
                                    value: "edit",
                                    icon: "edit"
                                },
                                {
                                    label: "Duplicate",
                                    value: "duplicate",
                                    icon: "duplicate"
                                },
                            ],
                        },
                        {
                            type: "divider",

                        },
                        {
                            type: "links",
                            values: [
                                {
                                    label: "Delete",
                                    value: "delete",
                                    icon: "trash"
                                },
                            ],
                        }
                    ]}
                    onChange={(value) => {
                        switchAction(value)
                        // alert(value)
                    }}
                />
            </li>


        </ul>
    );
}

export default ShapeActionsView;
