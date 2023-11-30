import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import CollectionInfo from "@/components/collection_info";
import PlanetsDetails from "@/components/collectionControls/planetsDetails";
import InfiniteList from "@/components/infinite_list";

import { planetSearch, planetItem, planetListUpdateStats } from "@/redux";

function PlanetsTab() {
  const [loading, setLoading] = useState(false);
  const app = useSelector((state) => state.app);
  const router = useRouter();
  const dispatch = useDispatch();

  const [screenWidth, setScreenWidth] = useState(0);

  const planetList = useSelector((state) => state.planetList);
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
                <PlanetsDetails />
            </div> */}

      <div className="tab-content-planet" ref={scrollContainerRef}>
        <InfiniteList
          resultType="planet-view-list"
          limit={20}
          contained={screenWidth > 500 ? true : false}
          scrollValue={scroll}
          sortProperty={planetList.sortProperty}
          order={planetList.order}
          criteria={planetList.criteria}
          // identifier={this.props.query.folder}
          searchCollection={planetSearch}
          updateCollectionStats={(count, total) => {
            setCount(count);
            setTotal(total);
            dispatch(planetListUpdateStats({ count: count, total: total }));
          }}
          loadCollectionItem={planetItem}
        />
      </div>

      <CollectionInfo
        count={count}
        total={total}
        drawerType="planet-collection-settings"
      />
    </div>
  );
}

export default PlanetsTab;
