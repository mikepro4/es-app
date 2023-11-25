import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Icon from "../icon";
import Button from "../button";
import Navlinks from "../nav_links"
import { ConnectWallet } from "@thirdweb-dev/react";


function AppSettings() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();



    useEffect(() => {

        return () => {

        };
    }, []);

    let mainPages = [
        {
            url: "/",
            name: "Home",
            icon: "mountains"
        },
        {
            url: "/genesis",
            name: "Genesis",
            icon: "x"
        },
        {
            url: "/collection",
            name: "Collection",
            icon: "shapes"
        },
        {
            url: "/traits",
            name: "Traits",
            icon: "properties"
        },
        {
            url: "/music",
            name: "Music",
            icon: "music"
        },

        {
            url: "/tiers",
            name: "Tiers",
            icon: "tier"
        }
        ,
        {
            url: "divider",
        },
        {
            url: "/mint",
            name: "Mint",
            icon: "plus"
        },
        {
            url: "/profile",
            name: "My profile",
            icon: "user"
        },
        {
            url: "/ui",
            name: "UI",
            icon: "x"
        },
    ]

    return (
        <div className="sidebar-desktop-container">

            <Navlinks
                links={mainPages}
                onClick={() => {

                }}
            />
               
            {/* <ConnectWallet
                theme={"dark"}
                modalSize={"compact"}
                welcomeScreen={{}}
            /> */}

        </div>
    );
}

export default AppSettings;
