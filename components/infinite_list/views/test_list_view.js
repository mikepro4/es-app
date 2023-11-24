import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";

function TestListView({
    item,
    key,
    type,
    handleClick
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();

    let switchAction = (value) => {
        switch (value) {
            case "edit":
                console.log("edit")
                // router.push(`/ui/item/${item.id}`);
                break;
            case "delete":
                console.log("delete")
                // setLoading(true);
                // dispatch(deleteItem(item.id)).then(() => {
                //     setLoading(false);
                // });
                break;
            default:
                break;
        }
    }


    return (
        <div className="test-view-list-container">

            <div className="test-view-list-header">
                <div className="test-view-list-header-left">
                    {item.name}
                </div>

                <div className="test-view-list-header-left">
                    <ParamSwitch
                        type="local-icon"
                        icon="more-vertical"
                        value=""
                        offset={[20,0]}
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
                                        value: "edit",
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



        </div>
    );
}

export default TestListView;
