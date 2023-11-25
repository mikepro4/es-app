import Head from 'next/head'
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from 'next/router';

import TabBar from '@/components/tab'


import ShapesTab from "./shapesTab"

export default function Genesis() {
  const router = useRouter();
 

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
            return(<ShapesTab/>)
        case 2:
            return(<div>Params</div>)
        case 3:
            return(<div>Add shape</div>)
        case 4:
          return(<div>Generate</div>)
        case 5:
          return(<div>Generate</div>)
        default:
            return;
    }
  }

  useEffect(() => {

      if(router.query.tab && Number(router.query.tab) !== selectedTabId){
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
              />
            </div>
            
          </div>
        </div>

        <div className="full-screen-content-container">

          <div className="full-screen-content-area">
            {renderTab()}            
          </div>

          <div className="full-screen-filters-area">
          </div>
        </div>

      </div>
    </>
  )
}
