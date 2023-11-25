import Head from 'next/head'
import React from 'react';
import { useState } from 'react'
import TabBar from '../../components/tab'

export default function Genesis() {
  const [selectedTabId, setSelectedTabId] = useState(1);
  let tabs = [
    "Features",
    "Data",
    "Settings"
  ]

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
                onTabChange={(tab) => setSelectedTabId(tab)}
              />
            </div>
            
          </div>
        </div>

        <div className="full-screen-content-container">

          <div className="full-screen-content-area">
          </div>

          <div className="full-screen-filters-area">
          </div>
        </div>

      </div>
    </>
  )
}
