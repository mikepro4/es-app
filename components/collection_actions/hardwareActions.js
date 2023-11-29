import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { hardwareDelete, hardwareUpdateItem, updateCollectionItem, toggleDrawer, hardwareDuplicate, updateCollection, togglePlayer } from "@/redux";

function HardwareActionsView({
    item,
    onChange,
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
                    drawerType: "hardware-settings",
                    drawerData: item,
                }));
                break;
            case "delete":
                console.log("delete")
                
                dispatch(
                    hardwareDelete(
                        {
                            hardwareId: item._id,
                            callback: (data) => {
                                dispatch(updateCollectionItem(item._id))

                                router.push({
                                    pathname: router.pathname,
                                    query: { ...router.query, tab: 3, hardwareId: null }
                                }, undefined, { shallow: true });
                                
                            }
                        },)
                )
                break
            case "duplicate":
                console.log("duplicate")
                dispatch(
                    hardwareDuplicate(
                        {
                            hardwareId: item._id,
                            callback: (data) => {
                                dispatch(updateCollection(true))
                                
                                router.push({
                                    pathname: router.pathname,
                                    query: { ...router.query, tab: 3, hardwareId: data._id }
                                }, undefined, { shallow: true });
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
            case "inactive":
                return "neutral";
            case "active":
                return "success";
            default:
                return "neutral";
        }
    }


    return (

        <ul className="collection-view-actions">
            {/* <li>

                <ParamSwitch
                    display="label"
                    intent={selectIntent(item?.status)}
                    value={item?.status}
                    offset={[20, 0]}
                    position="bottom left"
                    params={[
                        {
                            type: "links",
                            values: [
                                {
                                    label: "Active",
                                    value: "active",
                                    icon: "tick"
                                },
                                {
                                    label: "Inactive",
                                    value: "inactive",
                                    icon: "cross"
                                }
                            ],
                        }
                    ]}
                    onChange={(value) => {
                        switchAction(value)
                        dispatch(
                            hardwareUpdateItem({
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
            </li> */}

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

export default HardwareActionsView;
