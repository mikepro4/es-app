import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import _ from "lodash";
import { toggleDrawer } from "../../redux";
import AppSettings from "./type/app_settings.js";
import ProfileSettings from "./type/profile_settings.js";
import CollectionSettings from "./type/collection_settings.js";
import TestSettings from "./type/test_settings.js";

function Drawer() {
    const dispatch = useDispatch();
    const app = useSelector((state) => state.app);

    const hideDrawer = () => {
        dispatch(toggleDrawer({
            drawerOpen: false,
            drawerType: null,
            drawerData: null,
        }));
    };

    const renderDrawer = (type) => {
        switch (type) {
            case "app-settings":
                return <AppSettings hideDrawer={hideDrawer} enablePortal />;
            case "profile-settings":
                return <ProfileSettings hideDrawer={hideDrawer} enablePortal />;
            case "collection-settings":
                return <CollectionSettings hideDrawer={hideDrawer} enablePortal />;
            case "test-settings":
                return <TestSettings hideDrawer={hideDrawer} enablePortal />;
            default:
                return;
        }
    };

    let style; // define your style

    if (app.drawerOpen) {
        return (
            <div className={`app-drawer ${classNames({"full-screen": app.fullScreen})}`} style={style}>
                <div
                    className={`app-drawer-background `}
                    onClick={hideDrawer}
                >
                </div>
                <div className={`app-drawer-content`}>
                    {renderDrawer(app.drawerType)}
                </div>
            </div>
        );
    } else {
        return null; // or some other fallback UI
    }
}

export default Drawer;
