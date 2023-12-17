import React, { useState } from 'react'
import UserNfts from '@/components/display_user_nfts'
import DisplayPyramid from './DisplayPyramid'

const Pyramid = () => {
    const [nfts, setNfts] = useState([])
    console.log("nftsnfts", nfts)
    return (
        <div className="ui-screen page-wrapper">

            <div className="page-container">
                <div>Pyramid</div>
                <DisplayPyramid nfts={nfts} />
                <UserNfts setNfts={setNfts} />
            </div>
        </div>
    )
}

export default Pyramid