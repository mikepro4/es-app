import React, { useEffect } from 'react'

import {
    useAddress,
    useContract,
    useOwnedNFTs,
    ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import { TEST_CONTRACT_ADDRESS } from "@/config";



const UserNfts = ({ setNfts }) => {
    const address = useAddress();


    const { contract } = useContract(TEST_CONTRACT_ADDRESS);

    const { data: ownedNFTs, isLoading: isOwnedNFTsLoading } = useOwnedNFTs(
        contract,
        address
    );

    useEffect(() => { setNfts && setNfts(ownedNFTs) }, [ownedNFTs])

    console.log("ownedNFTs", ownedNFTs)

    const displayNftProps = (nft) => {
        console.log(nft)
        return nft.metadata.attributes.map((prop, index) => (
            <div key={index}>
                <h3>{prop.trait_type}: {prop.value} </h3>

            </div>
        ));
    }
    return (
        <div>
            <h3>My NFTs:</h3>
            <div className="profile__grid">
                {!isOwnedNFTsLoading ? (
                    ownedNFTs?.length > 0 ? (
                        ownedNFTs?.map((nft) => (
                            <div key={nft.metadata.id} className="profile__card">
                                <ThirdwebNftMedia metadata={nft.metadata} />
                                <h2>{nft.metadata.name}</h2>
                                {displayNftProps(nft)}
                                <p>{nft.metadata.description}</p>
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
    )
}

export default UserNfts