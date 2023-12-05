import React, { useState, useEffect } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import html2canvas from "html2canvas";

import { useDispatch, useSelector } from "react-redux";
import { CLIENT_ID } from "@/config";

import Button from "@/components/button";
import { shapeItem, shapeUpdateItem, togglePlayer } from "@/redux";

import Viz from "@/components/viz";

function StorageUpload({ id }) {
  const [image, setImage] = useState(null);
  console.log("image", image);
  const { mutateAsync: uploadToIPFS } = useStorageUpload();
const app = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const formatIPFSLink = (ipfsLink) => {
    const ipfsPath = ipfsLink.replace("ipfs://", "");
    return `https://${CLIENT_ID}.ipfscdn.io/ipfs/${ipfsPath}`;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTakeScreenshotAndUpload = async () => {
    const divToCapture = document.getElementById("image-container");
    const canvas = await html2canvas(divToCapture);
    canvas.toBlob(async (blob) => {
      const screenshotFile = new File([blob], "screenshot.png", {
        type: "image/png",
      });
      const uris = await uploadToIPFS({ data: [screenshotFile] });
      const finalLink = formatIPFSLink(uris[0]);
      console.log("uris", finalLink);

      dispatch(
        shapeItem({
          id,
          callback: (data) => {
            dispatch(
              shapeUpdateItem({
                data: {
                  ...data,
                  imageLink: finalLink,
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
      );
    });
  };

  return (
    <div className="upload-and-mint">
      <input
        type="file"
        className="input-file"
        onChange={handleImageUpload}
        accept="image/*"
      />
      <div id="image-container">
        {image && <img src={image} alt="Uploaded" />}
        <Viz 
              item={app.paramsValues ? app.paramsValues :app.playerData?.params}
              fullScreen={true}
              showControls={true}
          />
      </div>
      <div className="storage btn-margin">
        <Button
          label="Upload to Blockchain"
          wrap={true}
          className="upload-button"
          onClick={() => {
            handleTakeScreenshotAndUpload();
          }}
        />
      </div>
    </div>
  );
}

export default StorageUpload;

// https://a0815e45c470abdad32bb79a489e88d2.ipfscdn.io/ipfs/Qmanri5ScNXADXcVbsZcFFFtE74tKRCHop5aqvQEWdUvnp/screenshot.png
