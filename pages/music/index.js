import Head from 'next/head'
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from 'next/router';

import TrackSidebar from '@/components/collection_sidebar/trackSidebar'
import AlbumSidebar from '@/components/collection_sidebar/albumSidebar'
import HardwareSidebar from '@/components/collection_sidebar/hardwareSidebar'

import TabBar from '@/components/tab'
import TrackTab from "./trackTab"
import AlbumTab from "./albumTab"
import HardwareTab from "./hardwareTab"


import TrackPage from "./trackPage"
import AlbumPage from "./albumPage"
import HardwarePage from "./hardwarePage"



export default function Music() {
  const router = useRouter();
  const query = router.query;


  const [selectedTabId, setSelectedTabId] = useState(1);
  let tabs = [
    "Tracks",
    "Albums",
    "Hardware"
  ]

  const renderTab = () => {
    switch (selectedTabId) {
      case 1:
        if (router.query.trackId) {
          return (
            <div className="full-screen-content-container">

              <div className="full-screen-content-area">
                <TrackPage />
              </div>
            </div>)
        } else {
          return (
            <div className="full-screen-content-container">

              <div className="full-screen-content-area">
                <TrackTab />
              </div>

              <div className="full-screen-filters-area">
                <TrackSidebar />
              </div>
            </div>)
        }
      case 2:
        if (router.query.albumId) {
          return (
            <div className="full-screen-content-container">

              <div className="full-screen-content-area">
                <AlbumPage />
              </div>
            </div>)
        } else {
          return (
            <div className="full-screen-content-container">

              <div className="full-screen-content-area">
                <AlbumTab />
              </div>

              <div className="full-screen-filters-area">
                <AlbumSidebar />
              </div>
            </div>
          )
        }

      case 3:
        if (router.query.hardwareId) {
          return (
            <div className="full-screen-content-container">

              <div className="full-screen-content-area">
                <HardwarePage />
              </div>
            </div>)
        } else {
        return (
          <div className="full-screen-content-container">

            <div className="full-screen-content-area">
              <HardwareTab />
            </div>

            <div className="full-screen-filters-area">
              <HardwareSidebar />
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
            Music

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
