import Head from 'next/head'
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from 'next/router';

import TierSidebar from '@/components/collection_sidebar/tierSidebar'

import TabBar from '@/components/tab'
import TierTab from "./tierTab"

import TierPage from "./tierPage"

export default function Tiers() {
  const router = useRouter();
  const query = router.query;


  const [selectedTabId, setSelectedTabId] = useState(1);
  let tabs = [
    "Tiers",
  ]

  const renderTab = () => {
    switch (selectedTabId) {
      case 1:
        if (router.query.tierId) {
          return (
            <div className="full-screen-content-container">

              <div className="full-screen-content-area">
                <TierPage />
              </div>
            </div>)
        } else {
          return (
            <div className="full-screen-content-container">

              <div className="full-screen-content-area">
                <TierTab />
              </div>

              <div className="full-screen-filters-area">
                <TierSidebar />
              </div>
            </div>)
        }
      default:
        return;
    }
  }

  useEffect(() => {

    if (router.query.tab && Number(router.query.tab) !== selectedTabId) {
      selectTab(Number(router.query.tab))
    }
  }, [router]);

  const selectTab = (tab) => {
    setSelectedTabId(tab)

    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: tab }
    }, undefined, { shallow: true });

  }

  return (
    <>
      <div className="full-screen-container">

        <div className="full-screen-header">
          <div className="page-header">
            Tiers

            <div className="page-header-tab-container">
              <TabBar
                tabs={tabs}
                activeTab={selectedTabId}
                onTabChange={(tab) => selectTab(tab)}
                onClick={(tab) => {
                  if (tab == selectedTabId && router.query.algoId) {
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query }
                    }, undefined, { shallow: true });
                  }
                }
                }
              />
            </div>

          </div>
        </div>

        {renderTab()}

      </div>
    </>
  )
}
