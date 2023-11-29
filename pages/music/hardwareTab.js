import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import HardwaresDetails from "@/components/collectionControls/hardwaresDetails";
import InfiniteList from '@/components/infinite_list'

import { hardwareSearch, hardwareItem, hardwareListUpdateStats} from "@/redux"

function HardwaresTab() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch()

    const [screenWidth, setScreenWidth] = useState(0);

    const hardwareList = useSelector(state => state.hardwareList);
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
                <HardwaresDetails />
            </div> */}

            <div className="tab-content-hardware" ref={scrollContainerRef}>

                <InfiniteList
                    resultType="hardware-view-list"
                    limit={20}
                    contained={screenWidth > 500 ? true : false}
                    scrollValue={scroll}
                    sortProperty={hardwareList.sortProperty}
                    order={hardwareList.order}
                    criteria={hardwareList.criteria}
                    // identifier={this.props.query.folder}
                    searchCollection={hardwareSearch}
                    updateCollectionStats={(count, total) => {
                        setCount(count)
                        setTotal(total)
                        dispatch(hardwareListUpdateStats({ count: count, total: total }))

                    }}
                    loadCollectionItem={hardwareItem}
                />


            </div>

            <CollectionInfo
                count={count}
                total={total}
                drawerType="hardware-collection-settings"
            />

        </div>
    );
}

export default HardwaresTab;
