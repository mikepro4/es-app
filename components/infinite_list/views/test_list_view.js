import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { testDelete, testUpdateItem, updateCollectionItem, toggleDrawer, testDuplicate, updateCollection, togglePlayer } from "@/redux";

function TestListView({
    item,
    key,
    type,
    handleClick
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
                    drawerType: "test-settings",
                    drawerData: item,
                }));
                // router.push(`/ui/item/${item.id}`);
                break;
            case "delete":
                console.log("delete")
                dispatch(
                    testDelete(
                        {
                            testId: item._id,
                            callback: (data) => {
                                dispatch(updateCollectionItem(item._id))
                            }
                        },)
                )
                // setLoading(true);
                // dispatch(deleteItem(item.id)).then(() => {
                //     setLoading(false);
                // });
            case "duplicate":
                console.log("duplicate")
                dispatch(
                    testDuplicate(
                        {
                            testId: item._id,
                            callback: (data) => {
                                dispatch(updateCollection(true))
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
        <div className="test-view-list-container">

            <div className="test-view-list-header">
                <div className="test-view-list-header-left" onClick={() => {
                    dispatch(togglePlayer({
                        playerOpen: true,
                        playerData: item,
                    }));
                }}>
                    {item.name}
                </div>

                <div className="test-view-list-header-left">
                    {/* <Label
                    intent={selectIntent(item.status)}
                    label={item.status}
                /> */}

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
                                testUpdateItem({
                                    data: {
                                        ...item,
                                        status: value
                                    },
                                    callback: (data) => {
                                        dispatch(updateCollectionItem(data._id))
                                    }
                                }))
                            // alert(value)
                        }}
                    />

                    <ParamSwitch
                        type="local-icon"
                        icon="more-vertical"
                        value=""
                        offset={[20, 0]}
                        position="bottom left"
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
                </div>
            </div>

            <div className="test-view-list-content">

            </div>



        </div>
    );
}

export default TestListView;
