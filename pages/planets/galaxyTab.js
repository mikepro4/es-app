import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import GalaxysDetails from "@/components/collectionControls/galaxysDetails";
import InfiniteList from "@/components/infinite_list";

import { galaxySearch, galaxyItem, galaxyListUpdateStats } from "@/redux";

function GalaxysTab() {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const router = useRouter();
  const dispatch = useDispatch();

  const [screenWidth, setScreenWidth] = useState(0);

  const galaxyList = useSelector((state) => state.galaxyList);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [scroll, setScroll] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    const position = scrollContainerRef.current.scrollTop;
    setScroll(position);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="tab-content">
      {/* <div className="tab-content-details">
                <GalaxysDetails />
            </div> */}

      <div className="tab-content-galaxy" ref={scrollContainerRef}>
        <InfiniteList
          resultType="galaxy-view-list"
          limit={20}
          contained={screenWidth > 500 ? true : false}
          scrollValue={scroll}
          sortProperty={galaxyList.sortProperty}
          order={galaxyList.order}
          criteria={galaxyList.criteria}
          // identifier={this.props.query.folder}
          searchCollection={galaxySearch}
          updateCollectionStats={(count, total) => {
            setCount(count);
            setTotal(total);
            dispatch(galaxyListUpdateStats({ count: count, total: total }));
          }}
          loadCollectionItem={galaxyItem}
        />
      </div>

      <CollectionInfo
        count={count}
        total={total}
        drawerType="galaxy-collection-settings"
      />
    </div>
  );
}

export default GalaxysTab;
