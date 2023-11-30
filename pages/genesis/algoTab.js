import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import AlgosDetails from "@/components/collectionControls/algosDetails";
import InfiniteList from '@/components/infinite_list'

import { algoSearch, algoItem, algoListUpdateStats, toggleParamsData, toggleParamsValues} from "@/redux"

function AlgosTab() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch()

    const [screenWidth, setScreenWidth] = useState(0);

    const algoList = useSelector(state => state.algoList);
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
            dispatch(toggleParamsData(null))
            dispatch(toggleParamsValues(null))
        };

    }, []);



    return (
        <div className="tab-content">
            {/* <div className="tab-content-details">
                <AlgosDetails />
            </div> */}

            <div className="tab-content-algo" ref={scrollContainerRef}>

                <InfiniteList
                    resultType="algo-view-list"
                    limit={20}
                    contained={screenWidth > 500 ? true : false}
                    scrollValue={scroll}
                    sortProperty={algoList.sortProperty}
                    order={algoList.order}
                    criteria={algoList.criteria}
                    // identifier={this.props.query.folder}
                    searchCollection={algoSearch}
                    updateCollectionStats={(count, total) => {
                        setCount(count)
                        setTotal(total)
                        dispatch(algoListUpdateStats({ count: count, total: total }))

                    }}
                    loadCollectionItem={algoItem}
                />


            </div>

            <CollectionInfo
                count={count}
                total={total}
                drawerType="algo-collection-settings"
            />

        </div>
    );
}

export default AlgosTab;
