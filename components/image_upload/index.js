import React, { useState, useEffect } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import html2canvas from "html2canvas";

import { useDispatch, useSelector } from "react-redux";
import { CLIENT_ID } from "@/config";

import Button from "@/components/button";
import { shapeItem, shapeUpdateItem, togglePlayer } from "@/redux";


function StorageUpload({ callback }) {
  const [image, setImage] = useState(null);
  console.log("image", image);
  const { mutateAsync: uploadToIPFS } = useStorageUpload();

  const formatIPFSLink = (ipfsLink) => {
    const ipfsPath = ipfsLink.replace("ipfs://", "");
    return `https://${CLIENT_ID}.ipfscdn.io/ipfs/${ipfsPath}`;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);

      const uris = await uploadToIPFS({ data: [file] });
      const finalLink = formatIPFSLink(uris[0]);
      console.log("uris", finalLink);
      callback(finalLink)
    }

  };

  return (
    <div className="image-upload-container">
      <input
        type="file"
        className="input-file"
        onChange={handleImageUpload}
        accept="image/*"
      />
    </div>
  );
}

export default StorageUpload;

// https://a0815e45c470abdad32bb79a489e88d2.ipfscdn.io/ipfs/Qmanri5ScNXADXcVbsZcFFFtE74tKRCHop5aqvQEWdUvnp/screenshot.png
