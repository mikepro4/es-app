import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import Button from "@/components/button";
import Icon from "@/components/icon";
import ParamSwitch from "@/components/paramSwitch";
import StorageUpload from "../storage_upload";

import {
  shapeItem, 
  shapeUpdateItem,
  togglePlayer, 
  trackUpdateDuration,
  shapeCalculateParamPercentage
} from "@/redux";

import TrackAudioPlayer from "@/components/track_audio_player";

import HardwareItem from "./hardwareItem";
import TierItem from "./tierItem";
import { use } from "passport";


function AppSettings() {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const appData = useSelector((state) => state.appData);
  const router = useRouter();
  const dispatch = useDispatch();
  const [track, setTrack] = useState(null);

 
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

  let switchAction = (value) => {
    switch (value) {
        case "removeImage":
            console.log("edit")
            removeImage()
            break;
        default:
            break;
    }
  }

  const renderInCollection = () => {
    if(app.playerData.inCollection) {
      return (
          <div className="nft-status">In collection</div>
      )
    } else {
      return (
          <div className="nft-status">Not in collection</div>
      )
    }
  }
  useEffect(() => {
    const t = appData.tracks.find((t) => t._id === app.playerData.track)
    setTrack(t)
  }, [appData.tracks])


  return (
    <div className="nft-details-container">
      <div className="nft-details-shadow"></div>
      <div className="nft-details-content-container">
        {app.playerData?.imageLink ? (
          <div className="nft-details-page">

            <div className="nft-details-page-left">
              <div className="nft-image-container">
                <a href={app.playerData.imageLink} target="_blank" className="nft-image-link">
                  <img src={app.playerData.imageLink} />
                </a>
              </div>

              <div className="nft-details-bar">
                <div className="nft-details-bar-left">
                  {renderInCollection()}
                </div>
                <div className="nft-details-bar-right">
                  <ParamSwitch
                    type="local-icon"
                    icon="more-vertical"
                    value=""
                    position="bottom right"
                    offset={[10,0]}
                    params={[
                        {
                            type: "links",
                            values: [
                                {
                                    label: "Remove image",
                                    value: "removeImage",
                                    icon: "media"
                                }
                            ],
                        }
                    ]}
                    onChange={(value) => {
                        switchAction(value)
                    }}
                />
                </div>
              </div>
            </div>

            <div className="nft-details-page-right">
              <div className="nft-details-description-container">

                <div className="nft-details-description-header">
                  <div className="nft-details-description-header-left">
                    NFT Details
                  </div>
                  
                  <div className="nft-details-description-header-right">
                    <a href="#" className="nft-contract-link">
                      <Icon name="ethereum" />
                      View contract
                    </a>
                  </div>
                </div>

                <div className="nft-details-description-section">
                  <div className="nft-details-field">
                    <div className="nft-details-field-label">Name</div>
                    <div className="nft-details-field-value-big">{app.playerData.name}</div>
                  </div>

                  <div className="nft-details-field">
                    <div className="nft-details-field-label">Audio track</div>
                   {/* {audioPercentage?.percentage && <div 
                   data-tooltip-id="my-tooltip" 
                   data-tooltip-content={`${audioPercentage.matching} other shapes have this track`}
                   className="audio-percentage-container">
                    {audioPercentage.percentage}%
                    </div>} */}

                    <TrackAudioPlayer
                      item={track}
                    />
                    
                   
                  </div>

                </div>

                {track?.hardware && <div className="nft-hardware-section">
                  <div className="nft-hardware-section-left">
                    <div className="nft-hardware-title">Hardware</div>
                  </div>

                  <div className="nft-hardware-section-right">
                    {track?.hardware?.map((item, index) => {
                      return (
                        <HardwareItem
                        item={item}/>
                      )
                    })}
                  </div>
                </div>}

                {app.playerData?.tiers && app.playerData?.tiers?.length > 0 && <div className="nft-tier-section">
                  <div className="nft-tier-section-left">
                    <div className="nft-tier-title">Access tier</div>
                  </div>

                  <div className="nft-tier-section-right">
                    {app.playerData?.tiers?.map((item, index) => {
                      return (
                        <TierItem
                        item={item}/>
                      )
                    })}
                  </div>
                </div>}


              </div>

            </div>
            


          </div>
          
        ) : (
          <StorageUpload id={app.playerData?._id} />
        )}
      </div>

    </div>
  );
}

export default AppSettings;
