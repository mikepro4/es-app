import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import ShapesDetails from "@/components/collectionControls/shapesDetails";
import InfiniteList from '@/components/infinite_list'

import { shapeSearch, shapeItem } from "@/redux"

function ShapesTab() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();

    const shapeList = useSelector(state => state.testList);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);


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

                <InfiniteList
                    resultType="test-view-list"
                    limit={20}
                    sortProperty={shapeList.sortProperty}
                    order={shapeList.order}
                    criteria={shapeList.criteria}
                    // identifier={this.props.query.folder}
                    searchCollection={shapeSearch}
                    updateCollectionStats={(count, total) => {
                        setCount(count)
                        setTotal(total)
                    }}
                    loadCollectionItem={shapeItem}
                    handleClick={() => { }}
                />


            </div>

            <CollectionInfo
                count={count}
                total={total}
                drawerType="collection-settings"
            />

        </div>
    );
}

export default ShapesTab;
