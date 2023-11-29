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
import ShapeSettings from "./type/shape_settings.js";
import ShapeCollectionSettings from "./type/shape_collection_settings.js";
import VizSettings from "./type/viz_settings.js";
import AlgoSettings from "./type/algo_settings.js";
import AlgoCollectionSettings from "./type/algo_collection_settings.js"
import TrackSettings from "./type/track_settings.js";
import TrackCollectionSettings from "./type/track_collection_settings.js"
import AlbumSettings from "./type/album_settings.js";
import AlbumCollectionSettings from "./type/album_collection_settings.js"
import HardwareSettings from "./type/hardware_settings.js";
import HardwareCollectionSettings from "./type/hardware_collection_settings.js"
import TierSettings from "./type/tier_settings.js";
import TierCollectionSettings from "./type/tier_collection_settings.js"

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
            case "shape-settings":
                return <ShapeSettings hideDrawer={hideDrawer} enablePortal />;
            case "shape-collection-settings":
                return <ShapeCollectionSettings hideDrawer={hideDrawer} enablePortal />;
            case "viz-settings":
                return <VizSettings hideDrawer={hideDrawer} enablePortal />;
            case "algo-settings":
                return <AlgoSettings hideDrawer={hideDrawer} enablePortal />;
            case "algo-collection-settings":
                return <AlgoCollectionSettings hideDrawer={hideDrawer} enablePortal />;
            case "track-settings":
                return <TrackSettings hideDrawer={hideDrawer} enablePortal />;
            case "track-collection-settings":
                return <TrackCollectionSettings hideDrawer={hideDrawer} enablePortal />;
            case "album-settings":
                return <AlbumSettings hideDrawer={hideDrawer} enablePortal />;
            case "album-collection-settings":
                return <AlbumCollectionSettings hideDrawer={hideDrawer} enablePortal />;
            case "hardware-settings":
                return <HardwareSettings hideDrawer={hideDrawer} enablePortal />;
            case "hardware-collection-settings":
                return <HardwareCollectionSettings hideDrawer={hideDrawer} enablePortal />;
            case "tier-settings":
                return <TierSettings hideDrawer={hideDrawer} enablePortal />;
            case "tier-collection-settings":
                return <TierCollectionSettings hideDrawer={hideDrawer} enablePortal />;
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
