import Head from 'next/head'
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from 'next/router';

import TrackSidebar from '@/components/collection_sidebar/trackSidebar'
import AlbumSidebar from '@/components/collection_sidebar/albumSidebar'

import TabBar from '@/components/tab'
import TrackTab from "./trackTab"
import AlbumTab from "./albumTab"


export default function Music() {
  const router = useRouter();
  const query = router.query;
  


  const [selectedTabId, setSelectedTabId] = useState(2);
  let tabs = [
    "Tracks",
    "Albums",
    "Hardware"
  ]

  const renderTab = () => {
    switch (selectedTabId) {
      case 1:
        return (
          <div className="full-screen-content-container">

            <div className="full-screen-content-area">
              <TrackTab/>
            </div>

            <div className="full-screen-filters-area">
              <TrackSidebar />
            </div>
          </div>)
      case 2:
          return (
            <div className="full-screen-content-container">

              <div className="full-screen-content-area">
                <AlbumTab/>
              </div>

              <div className="full-screen-filters-area">
                <AlbumSidebar/>
              </div>
            </div>
          )
      case 3:
        return (
          <div className="full-screen-content-container">

          <div className="full-screen-content-area">
            Content
          </div>

          <div className="full-screen-filters-area">
            Sidebar
          </div>
        </div>)
      case 4:
        return (<div>Generate</div>)
      case 5:
        return (<div>Generate</div>)
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
            Music

            <div className="page-header-tab-container">
              <TabBar
                tabs={tabs}
                activeTab={selectedTabId}
                onTabChange={(tab) => selectTab(tab)}
                onClick={(tab) => {
                  if(tab == selectedTabId && router.query.algoId){
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
