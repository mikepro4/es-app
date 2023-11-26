import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import ShapesDetails from "@/components/collectionControls/shapesDetails";
import InfiniteList from '@/components/infinite_list'

import { shapeSearch, shapeItem, shapeListUpdateStats} from "@/redux"

function ShapesTab() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch()

    const [screenWidth, setScreenWidth] = useState(0);

    const shapeList = useSelector(state => state.shapeList);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [scroll, setScroll] = useState(0);
    const scrollContainerRef = useRef(null); 

    const handleScroll = () => {
        const position = scrollContainerRef.current.scrollTop
        setScroll(position)
    };

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        const scrollContainer = scrollContainerRef.current;

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('resize', handleResize);
        };

    }, []);



    return (
        <div className="tab-content">
            {/* <div className="tab-content-details">
                <ShapesDetails />
            </div> */}

            <div className="tab-content-results" ref={scrollContainerRef}>

                <InfiniteList
                    resultType="shape-view-list"
                    limit={20}
                    contained={screenWidth > 500 ? true : false}
                    scrollValue={scroll}
                    sortProperty={shapeList.sortProperty}
                    order={shapeList.order}
                    criteria={shapeList.criteria}
                    // identifier={this.props.query.folder}
                    searchCollection={shapeSearch}
                    updateCollectionStats={(count, total) => {
                        setCount(count)
                        setTotal(total)
                        dispatch(shapeListUpdateStats({ count: count, total: total }))

                    }}
                    loadCollectionItem={shapeItem}
                    handleClick={() => { }}
                />


            </div>

            <CollectionInfo
                count={count}
                total={total}
                drawerType="shape-collection-settings"
            />

        </div>
    );
}

export default ShapesTab;
