import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import Button from "@/components/button";
import StorageUpload from "../storage_upload";

import {shapeItem, shapeUpdateItem, togglePlayer} from "@/redux";

function AppSettings() {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);

  const removeImage = () => {
    dispatch(
      shapeItem({
        id: app.playerData._id,
        callback: (data) => {
          dispatch(
            shapeUpdateItem({
              data: {
                ...data,
                imageLink: "",
              },
              callback: (data) => {
                dispatch(
                  togglePlayer({
                    playerOpen: true,
                    playerData: data,
                  })
                );
              },
            })
          );
        },
      })
    )
  }

  return (
    <div className="nft-details-container">
      <div className="nft-details-shadow"></div>

      <div className="nft-details-content-container">
        {app.playerData?.imageLink ? (
          <div className="nft-details-page">

            <div className="nft-details-page-left">
              <img src={app.playerData.imageLink} />
            </div>

            <div className="nft-details-page-left">
            </div>
            


          </div>
          
        ) : (
          <StorageUpload id={app.playerData._id} />
        )}
      </div>

    </div>
  );
}

export default AppSettings;
