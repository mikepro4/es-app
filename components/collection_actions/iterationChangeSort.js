import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import ParamSwitch from "@/components/paramSwitch";

import { iterationListChangeSort } from "@/redux"

function ShapeChangeSort() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const iterationList = useSelector((state) => state.iterationList);
    const router = useRouter();
    const [sortValue, setSortValue] = useState();
    const dispatch = useDispatch();


    useEffect(() => {

        if (iterationList.sortProperty == "created" && iterationList.order == "-1") {
            setSortValue("recent")
        }

        if (iterationList.sortProperty == "created" && iterationList.order == "1") {
            setSortValue("oldest")
        }

        if (iterationList.sortProperty == "name" && iterationList.order == "-1") {
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
                dispatch(iterationListChangeSort(value))
            }}
        />
    );
}

export default ShapeChangeSort;
