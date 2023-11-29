import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import TiersDetails from "@/components/collectionControls/tiersDetails";
import InfiniteList from '@/components/infinite_list'

import { tierSearch, tierItem, tierListUpdateStats} from "@/redux"

function TiersTab() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch()

    const [screenWidth, setScreenWidth] = useState(0);

    const tierList = useSelector(state => state.tierList);
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
                <TiersDetails />
            </div> */}

            <div className="tab-content-tier" ref={scrollContainerRef}>

                <InfiniteList
                    resultType="tier-view-list"
                    limit={20}
                    contained={screenWidth > 500 ? true : false}
                    scrollValue={scroll}
                    sortProperty={tierList.sortProperty}
                    order={tierList.order}
                    criteria={tierList.criteria}
                    // identifier={this.props.query.folder}
                    searchCollection={tierSearch}
                    updateCollectionStats={(count, total) => {
                        setCount(count)
                        setTotal(total)
                        dispatch(tierListUpdateStats({ count: count, total: total }))

                    }}
                    loadCollectionItem={tierItem}
                />


            </div>

            <CollectionInfo
                count={count}
                total={total}
                drawerType="tier-collection-settings"
            />

        </div>
    );
}

export default TiersTab;
