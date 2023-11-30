import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import Button from "@/components/button";
import ParamSwitch from "@/components/paramSwitch";
import { galaxyCreate, updateCollection } from "@/redux";

import GalaxyChangeSort from "@/components/collection_actions/galaxyChangeSort";

import { OverlayToaster } from "@blueprintjs/core";

function AppSettings() {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const galaxyList = useSelector((state) => state.galaxyList);
  const router = useRouter();
  const dispatch = useDispatch();
  const toasterRef = useRef(null);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="collection-details">
      <div className="collection-details-left">
        <span className="collection-count-number">{galaxyList.count}</span>
        <span className="collection-count-total">
          of {galaxyList.total} items
        </span>
      </div>

      <div className="change-sort-container">
        <GalaxyChangeSort />
      </div>

      <div className="collection-details-right">
        <ul className="action-buttons">
          <li>
            <Button
              minimal={true}
              small={true}
              wrap={true}
              icon="plus"
              label="Add galaxy"
              onClick={() => {
                dispatch(
                  galaxyCreate({
                    ngc: "New Galaxy",
                    callback: (data) => {
                      toasterRef.current.show({
                        message: `${data.ngc} was created`,
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
