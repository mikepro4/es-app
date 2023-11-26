import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";

function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();



    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className="nft-details-container">
            <div className="nft-details-shadow"></div>
            
            <div className="nft-details-content-container">
            </div>

            <div className="placeholder"></div>
        </div>
    );
}

export default AppSettings;
