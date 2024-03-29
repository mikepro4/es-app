
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";
import InfiniteList from "../../../components/infinite_list";
import CollectionInfo from "../../../components/collection_info";

import { OverlayToaster } from '@blueprintjs/core';
import { v4 as uuidv4 } from 'uuid';

import { testCreate, testSearch, updateCollection, testItem } from "@/redux"

const TestView = () => {
  const drawerOpen = useSelector(state => state.app.drawerOpen);
  const testList = useSelector(state => state.testList);

  const router = useRouter()
  const dispatch = useDispatch();
  const toasterRef = useRef(null)
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [uuid, setNewUuid] = useState(uuidv4());

  return (
    <div className="ui-screen page-wrapper">

      <div className="page-container">

        <div className="back-button">
          <Button
            small={true}
            label="Back"
            wrap={true}
            minimal={true}
            icon="arrow-left"
            onClick={() => {
              router.push("/ui/")
            }}
          />
        </div>


        <h1>Infinite List</h1>

        <ul className="controls-container">
          <li className="single-control">
            <Button
              small={true}
              label="Add Test"
              wrap={true}
              minimal={true}
              icon="plus"
              onClick={() => {
                dispatch(
                  testCreate(
                    {
                      name: "New Test",
                      callback: (data) => {
                        toasterRef.current.show({ message: `${data.name} was created` });
                        dispatch(updateCollection(true))
                      }
                    },)
                )
              }}
            />
          </li>
        </ul>


        <InfiniteList
          resultType="test-view-list"
          limit={20}
          sortProperty={testList.sortProperty}
          order={testList.order}
          criteria={testList.criteria}
          // identifier={this.props.query.folder}
          searchCollection={testSearch}
          updateCollectionStats={(count, total) => {
            setCount(count)
            setTotal(total)
          }}
          loadCollectionItem={testItem}
          handleClick={() => { }}
        />


        <CollectionInfo
          count={count}
          total={total}
          drawerType="collection-settings"
        />

        {/* <div className='placeholder'></div> */}

        <OverlayToaster ref={toasterRef} />


      </div>


    </div>
  );
};

export default TestView;
