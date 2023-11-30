import Head from "next/head";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import PlanetSidebar from "@/components/collection_sidebar/planetSidebar";

import TabBar from "@/components/tab";
import PlanetTab from "./planetTab";

export default function Music() {
  const router = useRouter();
  const query = router.query;

  const [selectedTabId, setSelectedTabId] = useState(1);
  let tabs = ["Planets", "Galaxies", "Hardware"];

  const renderTab = () => {
    switch (selectedTabId) {
      case 1:
        return (
          <div className="full-screen-content-container">
            <div className="full-screen-content-area">
              <PlanetTab />
            </div>

            <div className="full-screen-filters-area">
              <PlanetSidebar />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="full-screen-content-container">
            <div className="full-screen-content-area">
              {/* <PlanetTab /> */}
            </div>

            <div className="full-screen-filters-area">
              {/* <PlanetSidebar /> */}
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    if (router.query.tab && Number(router.query.tab) !== selectedTabId) {
      selectTab(Number(router.query.tab));
    }
  }, [router]);

  const selectTab = (tab) => {
    setSelectedTabId(tab);

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: tab },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <div className="full-screen-container">
        <div className="full-screen-header">
          <div className="page-header">
            Music
            <div className="page-header-tab-container">
              <TabBar
                tabs={tabs}
                activeTab={selectedTabId}
                onTabChange={(tab) => selectTab(tab)}
                onClick={(tab) => {
                  if (tab == selectedTabId && router.query.algoId) {
                    router.push(
                      {
                        pathname: router.pathname,
                        query: { ...router.query },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>

        {renderTab()}
      </div>
    </>
  );
}
