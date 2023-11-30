import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import Button from "@/components/button";
import ParamSwitch from "@/components/paramSwitch";
import { planetCreate, updateCollection } from "@/redux";

import PlanetChangeSort from "@/components/collection_actions/planetChangeSort";

import { OverlayToaster } from "@blueprintjs/core";

function AppSettings() {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const planetList = useSelector((state) => state.planetList);
  const router = useRouter();
  const dispatch = useDispatch();
  const toasterRef = useRef(null);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="collection-details">
      <div className="collection-details-left">
        <span className="collection-count-number">{planetList.count}</span>
        <span className="collection-count-total">
          of {planetList.total} items
        </span>
      </div>

      <div className="change-sort-container">
        <PlanetChangeSort />
      </div>

      <div className="collection-details-right">
        <ul className="action-buttons">
          <li>
            <Button
              minimal={true}
              small={true}
              wrap={true}
              icon="plus"
              label="Add planet"
              onClick={() => {
                dispatch(
                  planetCreate({
                    display_name: "New Planet",
                    callback: (data) => {
                      toasterRef.current.show({
                        message: `${data.name} was created`,
                      });
                      dispatch(updateCollection(true));
                    },
                  })
                );
              }}
            />
          </li>

          <OverlayToaster ref={toasterRef} />
        </ul>
      </div>
    </div>
  );
}

export default AppSettings;
