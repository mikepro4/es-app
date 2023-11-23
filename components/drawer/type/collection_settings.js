import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import { toggleDrawer } from "@/redux";

import { updateCollection } from "@/redux"

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();

    const [sortValue, setSortValue] = useState(app.drawerData.sortValue);

    useEffect(() => {

        return () => {

        };
    }, []);

    return (
        <div className={`app-drawer-content-container standard-drawer`}>
            <div className={"collection-settings-container"}>
                <ParamSwitch
                    label="Sort by:"
                    value={sortValue}
                    position="bottom left"
                    params={[
                        {
                            values: [
                                {
                                    label: "Recent",
                                    value: "recent",
                                },
                                {
                                    label: "Oldest",
                                    value: "oldest",
                                },
                                {
                                    label: "Name",
                                    value: "name",
                                }
                            ],
                        }
                    ]}
                    onChange={(value) => {
                        setSortValue(value);
                        dispatch(
                            toggleDrawer({
                                drawerOpen: true,
                                drawerType: "collection-settings",
                                drawerData:  {
                                    ...app.drawerData,
                                    sortValue: value
                                },
                            })
                        )
                        dispatch(updateCollection(true))

                    }}
                />
            </div>
        </div>
    );
}

export default AppSettings;
