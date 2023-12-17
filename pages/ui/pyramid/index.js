import React from 'react'
import UserNfts from '@/components/display_user_nfts'
import DisplayPyramid from './DisplayPyramid'

const Pyramid = () => {
    return (
        <div className="ui-screen page-wrapper">

            <div className="page-container">
                <div>Pyramid</div>
                <DisplayPyramid />
                <UserNfts />
            </div>
        </div>
    )
}

export default Pyramid