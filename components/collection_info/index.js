import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Icon from "../icon";

function CollectionInfo({
    count,
    total,
    sortProperty
}) {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();



    return (
        <div className="collection-info-container">
            <div className="collection-info-bar">
                <div className="collection-properties-button search-button">
                    <Icon name="search"/>
                </div>
                <div className="collection-info-bar-left">
                    <span className="collection-count-number">{count}</span>
                    <span className="collection-count-total">of {total} items</span>
                </div>

                <div className="collection-info-bar-right">
                    <div className="collection-properties-button">
                        <Icon name="properties"/>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default CollectionInfo;
