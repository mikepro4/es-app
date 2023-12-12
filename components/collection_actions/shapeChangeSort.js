import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import ParamSwitch from "@/components/paramSwitch";

import { shapeListChangeSort } from "@/redux"

function ShapeChangeSort() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const shapeList = useSelector((state) => state.shapeList);
    const router = useRouter();
    const [sortValue, setSortValue] = useState();
    const dispatch = useDispatch();


    useEffect(() => {

        if (shapeList.sortProperty == "created" && shapeList.order == "-1") {
            setSortValue("recent")
        }

        if (shapeList.sortProperty == "created" && shapeList.order == "1") {
            setSortValue("oldest")
        }

        if (shapeList.sortProperty == "name" && shapeList.order == "-1") {
            setSortValue("name")
        }

        if (shapeList.sortProperty == "iterationsVerified" && shapeList.order == "-1") {
            setSortValue("mostApproved")
        }

        if (shapeList.sortProperty == "iterationsVerified" && shapeList.order == "1") {
            setSortValue("leastApproved")
        }

        if (shapeList.sortProperty == "iterationsUnverified" && shapeList.order == "-1") {
            setSortValue("mostUnreviewed")
        }

        if (shapeList.sortProperty == "iterationsRejected" && shapeList.order == "-1") {
            setSortValue("mostRejected")
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
                        },
                        {
                            label: "Most Approved",
                            value: "mostApproved",
                        },
                        {
                            label: "Least Approved",
                            value: "leastApproved",
                        },
                        {
                            label: "Most Unreviewed",
                            value: "mostUnreviewed",
                        },
                        {
                            label: "Most Rejected",
                            value: "mostRejected",
                        },
                    ],
                }
            ]}
            onChange={(value) => {
                setSortValue(value);
                dispatch(shapeListChangeSort(value))
            }}
        />
    );
}

export default ShapeChangeSort;
