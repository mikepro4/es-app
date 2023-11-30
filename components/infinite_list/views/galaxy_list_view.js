import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";

import ParamSwitch from "@/components/paramSwitch";
import Label from "@/components/label";

import { togglePlayer, toggleNoRedirect } from "@/redux";

import GalaxyActionsView from "@/components/collection_actions/galaxyActions";

import Button from "@/components/button";

import Icon from "@/components/icon";

function GalaxyListView({ item }) {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="galaxy-view-list-container">
      <div
        className="galaxy-view-list-left"
        onClick={() => {
          //   router.push(
          //     {
          //       pathname: "/music",
          //       query: { ...router.query, galaxyId: item._id },
          //     },
          //     undefined,
          //     { shallow: true }
          //   );
        }}
      >
        <div className="galaxy-name">{item.ngc}</div>

        <div className="galaxy-slug">{item?.latin_name_nom_latin}</div>
      </div>
      <div className="galaxy-view-list-right">
        {item.default && <Label label="Default" intent="neutral" />}
        <GalaxyActionsView item={item} />
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

export default GalaxyListView;
