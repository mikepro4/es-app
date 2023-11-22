
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import Button from "../../../components/button";

import { toggleDrawer } from '@/redux/slices/appSlice';

const TestView = () => {
  const router = useRouter()
  const dispatch = useDispatch();


  return (
    <div className="ui-screen">
      
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


      <h1>Buttons</h1>
      
      <ul className="button-group">

        <li>
          <Button
            small={true}
            minimal={true}
            icon="plus"
            onClick={() => {
              router.push("/auth/login")
            }}
          />
        </li>

        <li>
          <Button
            label="Add"
            wrap={true}
            small={true}
            minimal={true}
            icon="plus"
            onClick={() => {
              router.push("/auth/login")
            }}
          />
        </li>

        <li>
          <Button
            label="Add something"
            // small={true}
            minimal={true}
            actionList={true}
            icon="plus"
            iconRight="chevron-right"
            onClick={() => {
              router.push("/auth/login")
            }}
          />
        </li>

        <li>
          <Button
            label="Show drawer"
            onClick={() => {
              dispatch(
                toggleDrawer({
                  drawerOpen: true,
                  drawerType: "app-settings",
                  drawerData: null,
                }));
            }}
          />
        </li>

        <li>
          <Button
            label="Show drawer"
            primary={true}
            onClick={() => {
              dispatch(
                toggleDrawer({
                  drawerOpen: true,
                  drawerType: "app-settings",
                  drawerData: null,
                }));
            }}
          />
        </li>

        <li>
          <Button
            icon="edit"
            wrap={true}
            label="Show drawer"
            minimal={true}
            onClick={() => {
              dispatch(
                toggleDrawer({
                  drawerOpen: true,
                  drawerType: "app-settings",
                  drawerData: null,
                }));
            }}
          />
        </li>

        <li>
          <Button
            icon="edit"
            wrap={true}
            label="Show drawer 2"
            iconRight="caret-down"
            minimal={true}
            onClick={() => {
              dispatch(
                toggleDrawer({
                  drawerOpen: true,
                  drawerType: "app-settings",
                  drawerData: null,
                }));
            }}
          />
        </li>

        <li>
          <Button
            icon="edit"
            wrap={true}
            label="Show drawer"
            onClick={() => {
              dispatch(
                toggleDrawer({
                  drawerOpen: true,
                  drawerType: "app-settings",
                  drawerData: null,
                }));
            }}
          />
        </li>


        <li>
          <Button
            label="Show drawer"
            wrap={true}
            minimal={true}
            onClick={() => {
              dispatch(
                toggleDrawer({
                  drawerOpen: true,
                  drawerType: "app-settings",
                  drawerData: null,
                }));
            }}
          />
        </li>

        <li>
          <Button
            minimal={true}
            label="Show drawer"
            colorHsb={[60, 100, 100, 1]}
            wrap={true} 
            onClick={() => {
              dispatch(
                toggleDrawer({
                  drawerOpen: true,
                  drawerType: "app-settings",
                  drawerData: null,
                }));
            }}
          />
        </li>

        <li>
          <Button
            minimal={true}
            small={true}
            label="Show drawer"
            colorHex={"#ff0000"}
            wrap={true} 
            onClick={() => {
              dispatch(
                toggleDrawer({
                  drawerOpen: true,
                  drawerType: "app-settings",
                  drawerData: null,
                }));
            }}
          />
        </li>

        <li>
          <Button
            minimal={true}
            small={true}
            colorHex={"#ff0000"}
            wrap={true} 
            onClick={() => {
              dispatch(
                toggleDrawer({
                  drawerOpen: true,
                  drawerType: "app-settings",
                  drawerData: null,
                }));
            }}
          />
        </li>

        <li>
          <Button
            minimal={true}
            colorHex={"#583DFF"}
            wrap={true}
            onClick={() => {
              dispatch(
                toggleDrawer({
                  drawerOpen: true,
                  drawerType: "app-settings",
                  drawerData: null,
                }));
            }}
          />
        </li>
      </ul>

      </div>


    </div>
  );
};

export default TestView;
