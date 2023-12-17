import Head from "next/head";
import {
  useAddress,
  useContract,
  useOwnedNFTs,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";

import { TEST_CONTRACT_ADDRESS } from "@/config";
import UserNfts from "@/components/display_user_nfts";

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

  const displayNftProps = (nft) => {
    return nft.metadata.attributes.map((prop, index) => (
      <div key={index}>
        <h3>{prop.trait_type}: {prop.value} </h3>

      </div>
    ));
  }

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
              <UserNfts />
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
