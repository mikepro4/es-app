import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import ShapesDetails from "@/components/collectionControls/shapesDetails";

function ShapesTab() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();


    useEffect(() => {

        return () => {
            
        };
    }, []); 

    return (
        <div className="tab-content">
            <div className="tab-content-details">
                <ShapesDetails />
            </div>

            <div className="tab-content-results">
                results

                <div className="placeholder"></div>

            </div>

            <CollectionInfo
                count={999}
                total={999}
                drawerType="collection-settings"
            />

        </div>
    );
}

export default ShapesTab;
