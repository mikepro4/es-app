import Head from 'next/head'
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from 'next/router';

import TabBar from '@/components/tab'
import ShapeSidebar from '@/components/collection_sidebar/shapeSidebar'
import AlgoSidebar from '@/components/collection_sidebar/algoSidebar'
import AlgoPage from './algoPage'


import ShapesTab from "./shapesTab"
import AlgoTab from "./algoTab"
import AddShape from "./addShape"

export default function Genesis() {
  const router = useRouter();
  const query = router.query;


  const [selectedTabId, setSelectedTabId] = useState(1);
  let tabs = [
    "Shapes",
    "Algorithms",
    "Add shape",
    "Generate",
    "Iterations"
  ]

  const renderTab = () => {
    switch (selectedTabId) {
      case 1:
        return (
          <div className="full-screen-content-container">

            <div className="full-screen-content-area">
              <ShapesTab />
            </div>

            <div className="full-screen-filters-area">
              <ShapeSidebar />
            </div>
          </div>)
      case 2:
        if (router.query.algoId) {
          return (
            <div className="full-screen-content-container">

              <div className="full-screen-content-area">
                <AlgoPage />
              </div>
            </div>)
        } else {

          return (
            <div className="full-screen-content-container">

              <div className="full-screen-content-area">
                <AlgoTab />
              </div>

              <div className="full-screen-filters-area">
                <AlgoSidebar />
              </div>
            </div>
          )
        }

      case 3:
        return (<AddShape/>)
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
            Genesis

            <div className="page-header-tab-container">
              <TabBar
                tabs={tabs}
                activeTab={selectedTabId}
                onTabChange={(tab) => selectTab(tab)}
                onClick={(tab) => {
                  if(tab == selectedTabId && router.query.algoId){
                    router.push({
                      pathname: router.pathname,
                      query: { ...router.query, algoId: null }
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
