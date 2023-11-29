import Head from "next/head";
import { useNFTs, ThirdwebNftMedia, useContract } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import { TEST_CONTRACT_ADDRESS } from "@/config";

export default function Genesis() {
  const { contract } = useContract(TEST_CONTRACT_ADDRESS);
  const { data: nfts, isLoading: NFTsLoading } = useNFTs(contract);

  return (
    <div className="ui-screen">
      <div>Collection</div>
      {!NFTsLoading ? (
        <div className="nft-collection">
          {nfts?.map((nft, index) => (
            <div
              key={index}
              className="nft-item"
              style={{
                filter:
                  nft.owner !== "0x0000000000000000000000000000000000000000"
                    ? "grayscale(100%)"
                    : "none",
              }}
            >
              {console.log("nft", nft)}
              <ThirdwebNftMedia metadata={nft.metadata} />
              <p>{nft.metadata.name}</p>
              {/* Additional NFT details can be added here */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
