import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import ParamSwitch from "@/components/paramSwitch";

import { galaxyListChangeSort } from "@/redux";

function GalaxyChangeSort() {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const galaxyList = useSelector((state) => state.galaxyList);
  const router = useRouter();
  const [sortValue, setSortValue] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (galaxyList.sortProperty == "created" && galaxyList.order == "-1") {
      setSortValue("recent");
    }

    if (galaxyList.sortProperty == "created" && galaxyList.order == "1") {
      setSortValue("oldest");
    }

    if (galaxyList.sortProperty == "name" && galaxyList.order == "-1") {
      setSortValue("name");
    }

    return () => {};
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
          ],
        },
      ]}
      onChange={(value) => {
        setSortValue(value);
        dispatch(galaxyListChangeSort(value));
      }}
    />
  );
}

export default GalaxyChangeSort;
