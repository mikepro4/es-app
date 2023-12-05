import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import StorageUpload from "../storage_upload";
import Viz from "@/components/viz";

function AppSettings() {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const router = useRouter();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="nft-details-container">
      <div className="nft-details-shadow"></div>

      <div className="nft-details-content-container">
        {app.playerData?.imageLink ? (
          <img src={app.playerData.imageLink} />
        ) : (
          <StorageUpload id={app.playerData._id} />
        )}
      </div>

    </div>
  );
}

export default AppSettings;
