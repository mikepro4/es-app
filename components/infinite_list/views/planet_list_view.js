import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import PlanetActionsView from "@/components/collection_actions/planetActions";

import Button from "@/components/button";

import Icon from "@/components/icon";

function PlanetListView({ item }) {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="planet-view-list-container">
      <div
        className="planet-view-list-left"
        onClick={() => {
          //   router.push(
          //     {
          //       pathname: "/music",
          //       query: { ...router.query, planetId: item._id },
          //     },
          //     undefined,
          //     { shallow: true }
          //   );
        }}
      >
        <div className="planet-name">{item.display_name}</div>

        <div className="planet-slug">{item?.hostname}</div>
      </div>
      <div className="planet-view-list-right">
        {item.default && <Label label="Default" intent="neutral" />}
        <PlanetActionsView item={item} />
      </div>

      {/* <Button
                minimal={true}
                label={item.name}
                actionList={true}
                iconRight="arrow-right"
            /> */}
    </div>
  );
}

export default PlanetListView;
