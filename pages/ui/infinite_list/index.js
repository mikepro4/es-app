
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";
import InfiniteList from "../../../components/infinite_list";
import CollectionInfo from "../../../components/collection_info";

import { OverlayToaster } from '@blueprintjs/core';
import { v4 as uuidv4 } from 'uuid';

import { testCreate, testSearch, updateCollection } from "@/redux"

const TestView = () => {
  const drawerOpen = useSelector(state => state.app.drawerOpen);
  const drawerData = useSelector(state => state.app.drawerData);

  const router = useRouter()
  const dispatch = useDispatch();
  const toasterRef = useRef(null)
  const [sortProperty, setSortProperty] = useState("created");
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState("-1");
  const [uuid, setNewUuid] = useState(uuidv4());



  useEffect(() => {
    if (drawerData?.collectionId == uuid) {
      console.log("GOT HERE: ", drawerData.sortValue)

      if(drawerData.sortValue == "recent") {
        console.log("UPDATE TO RECENT")
        setSortProperty("created")
        setOrder("1")
        // dispatch(updateCollection(true))
      }

      if(drawerData.sortValue == "oldest") {
        console.log("UPDATE TO OLDEST")
        setSortProperty("created")
        setOrder("-1")
        // dispatch(updateCollection(true))
      }

      if(drawerData.sortValue == "name") {
        console.log("UPDATE TO NAME")
        setSortProperty("created")
        setOrder("-1")
        // dispatch(updateCollection(true))
      }
      // setSortProperty(drawerData.sortValue)
    }
  }, [drawerData]);

  const getSortValue = () => {
    if (sortProperty == "created") {
      if (order == "-1") {
        return "recent"
      } else {
        return "oldest"
      }
    } else {
      return "name"
    }
  }

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
                // router.push("/ui/")
              }}
            />
          </li>
        </ul>


        <InfiniteList
          type="test_list"
          resultType="test-view-list"
          sortProperty={sortProperty}
          limit={20}
          order={order}
          // identifier={this.props.query.folder}
          searchCollection={testSearch}
          updateCollectionStats={(count, total) => {
            setCount(count)
            setTotal(total)
          }}
          // loadCollectionItem={this.props.loadArc}
          handleClick={() => { }}
        >

        </InfiniteList>

        <CollectionInfo
          count={count}
          total={total}
          sortProperty={sortProperty}
          collectionId={uuid}
          data={{
            sortValue: getSortValue()
          }}
          onChange={(value) => {
            setSortProperty(value)
          }}
        />

        <OverlayToaster ref={toasterRef} />


      </div>


    </div>
  );
};

export default TestView;