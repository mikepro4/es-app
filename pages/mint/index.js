import Head from "next/head";
import { useState } from "react";
import {
  useActiveClaimConditionForWallet,
  useClaimIneligibilityReasons,
  useAddress,
  useContract,
  useContractMetadata,
  useTotalCirculatingSupply,
  useTotalCount,
  MediaRenderer,
  Web3Button,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { TEST_CONTRACT_ADDRESS } from "@/config";

export default function Genesis() {
  const address = useAddress();

  const { contract } = useContract(TEST_CONTRACT_ADDRESS);

  const { data: contractMetadata, isLoading: isContractMetadataLoading } =
    useContractMetadata(contract);

  const { data: activeClaimPhase, isLoading: isActiveClaimPhaseLoading } =
    useActiveClaimConditionForWallet(contract, address);

  const { data: totalSupply, isLoading: isTotalSupplyLoading } =
    useTotalCount(contract);

  const { data: totalClaimed, isLoading: isTotalClaimedLoading } =
    useTotalCirculatingSupply(contract);

  const [claimQuantity, setClaimQuantity] = useState(1);

  const increment = () => {
    if (claimQuantity < maxClaimable) {
      setClaimQuantity(claimQuantity + 1);
    }
  };
  const decrement = () => {
    if (claimQuantity > 1) {
      setClaimQuantity(claimQuantity - 1);
    }
  };

  const { data: claimIneleigibility, isLoading: isClaimIneleigibilityLoading } =
    useClaimIneligibilityReasons(contract, {
      walletAddress: address || "",
      quantity: claimQuantity,
    });

  const maxClaimable = parseInt(activeClaimPhase?.maxClaimablePerWallet || "0");

  return (
    <>
      <div className="ui-screen">
        Mint
        <div className="placeholder">
          {!isContractMetadataLoading && (
            <div className="mint__heroSection">
              <div className="mint__collectionImage">
                <MediaRenderer src={contractMetadata?.image} />
              </div>
              <div className="mint__">
                <h1>{contractMetadata.name}</h1>
                <p>{contractMetadata.description}</p>
                {!isActiveClaimPhaseLoading ? (
                  <div>
                    <p>Claim Phase: {activeClaimPhase?.metadata?.name}</p>
                    <p>
                      Price: {ethers.utils.formatUnits(activeClaimPhase?.price)}
                    </p>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
                {!isTotalClaimedLoading && !isTotalClaimedLoading ? (
                  <p>
                    Claimed: {totalClaimed?.toNumber()} /{" "}
                    {totalSupply?.toNumber()}
                  </p>
                ) : (
                  <p>Loading... </p>
                )}
                {address ? (
                  !isClaimIneleigibilityLoading ? (
                    claimIneleigibility?.length > 0 ? (
                      claimIneleigibility.map((reason, index) => (
                        <p key={index}>{reason}</p>
                      ))
                    ) : (
                      <div>
                        <p>
                          Tou are eligible to claim.{" "}
                          {`(Max claimable: ${maxClaimable})`}
                        </p>
                        <div className="mint__claimContainer">
                          <div className="mint__claimContainer--claimValue">
                            <button
                              onClick={decrement}
                              className="mint__claimContainer--claimBtn"
                            >
                              -
                            </button>
                            <input
                              className="mint__claimContainer--claimInput"
                              type="number"
                              value={claimQuantity}
                            />
                            <button
                              onClick={increment}
                              className="mint__claimContainer--claimBtn"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <Web3Button
                          contractAddress={TEST_CONTRACT_ADDRESS}
                          action={(contract) =>
                            contract.erc721.claim(claimQuantity)
                          }
                        >
                          Claim NFT
                        </Web3Button>
                      </div>
                    )
                  ) : (
                    <p>Loading...</p>
                  )
                ) : (
                  <p>Connect your wallet to claim</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
