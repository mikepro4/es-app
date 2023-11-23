import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import { toggleDrawer } from "@/redux";

import { updateCollection, testListChangeSort } from "@/redux"

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const testList = useSelector((state) => state.testList);
    const router = useRouter();
    const dispatch = useDispatch();

    const [sortValue, setSortValue] = useState();

    useEffect(() => {

        if(testList.sortProperty == "created" && testList.order == "-1") {
            setSortValue("recent")
        }

        if(testList.sortProperty == "created" && testList.order == "1") {
            setSortValue("oldest")
        }

        if(testList.sortProperty == "name" && testList.order == "-1") {
            setSortValue("name")
        }

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
                        dispatch(testListChangeSort(value))
                        // dispatch(updateCollection(true))

                    }}
                />
            </div>
        </div>
    );
}

export default AppSettings;
