import Head from "next/head";
import {
  useAddress,
  useContract,
  useOwnedNFTs,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";

import { TEST_CONTRACT_ADDRESS } from "@/config";

export default function Genesis() {
  const address = useAddress();

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const { contract } = useContract(TEST_CONTRACT_ADDRESS);

  const { data: ownedNFTs, isLoading: isOwnedNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );

  return (
    <>
      <div className="ui-screen">
        Collection
        <div className="placeholder">
          {address ? (
            <div>
              <div>
                <h1>Profile</h1>
                <p>Wallet Address: {truncateAddress(address) || ""}</p>
              </div>
              <hr />
              <div>
                <h3>My NFTs:</h3>
                <div className="profile__grid">
                  {!isOwnedNFTsLoading ? (
                    ownedNFTs?.length > 0 ? (
                      ownedNFTs?.map((nft) => (
                        <div key={nft.metadata.id} className="profile__card">
                          <ThirdwebNftMedia metadata={nft.metadata} />
                          <h3>{nft.metadata.name}</h3>
                        </div>
                      ))
                    ) : (
                      <p>No NFTs owned.</p>
                    )
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>Plase connect your wallet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
