import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import ParamSwitch from "@/components/paramSwitch";

import { tierListChangeSort } from "@/redux"

function TierChangeSort() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const tierList = useSelector((state) => state.tierList);
    const router = useRouter();
    const [sortValue, setSortValue] = useState();
    const dispatch = useDispatch();


    useEffect(() => {

        if (tierList.sortProperty == "created" && tierList.order == "-1") {
            setSortValue("recent")
        }

        if (tierList.sortProperty == "created" && tierList.order == "1") {
            setSortValue("oldest")
        }

        if (tierList.sortProperty == "name" && tierList.order == "-1") {
            setSortValue("name")
        }

        return () => {

        };
    }, []);

    return (
        <ParamSwitch
            label="Sort by:"
            value={sortValue}
            position="bottom left"
            offset={[20, 0]}
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
                dispatch(tierListChangeSort(value))
            }}
        />
    );
}

export default TierChangeSort;
