import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import AlbumsDetails from "@/components/collectionControls/albumsDetails";
import InfiniteList from '@/components/infinite_list'

import { albumSearch, albumItem, albumListUpdateStats} from "@/redux"

function AlbumsTab() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch()

    const [screenWidth, setScreenWidth] = useState(0);

    const albumList = useSelector(state => state.albumList);
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
                <AlbumsDetails />
            </div> */}

            <div className="tab-content-album" ref={scrollContainerRef}>

                <InfiniteList
                    resultType="album-view-list"
                    limit={20}
                    contained={screenWidth > 500 ? true : false}
                    scrollValue={scroll}
                    sortProperty={albumList.sortProperty}
                    order={albumList.order}
                    criteria={albumList.criteria}
                    // identifier={this.props.query.folder}
                    searchCollection={albumSearch}
                    updateCollectionStats={(count, total) => {
                        setCount(count)
                        setTotal(total)
                        dispatch(albumListUpdateStats({ count: count, total: total }))

                    }}
                    loadCollectionItem={albumItem}
                />


            </div>

            <CollectionInfo
                count={count}
                total={total}
                drawerType="album-collection-settings"
            />

        </div>
    );
}

export default AlbumsTab;
