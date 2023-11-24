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
        },
        {
            url: "/ui",
            name: "UI",
            icon: "x"
        },
    ]

    return (
        <div className="header-desktop-container">

            <div className="header-desktop-container-left" onClick={() => {
                router.push('/ui')
            }}>
                <Icon name="logo-mobile" />
            </div>

            <div className="header-desktop-container-center">
                <div className="header-desktop-container-menu">
                    <Navlinks
                        links={mainPages}
                        onClick={() => {

                        }}
                    />
                </div>
            </div>

            <div className="header-desktop-container-right">
                {/* <Button
                    wrap={true}
                    label="Connect wallet"
                /> */}

                <ConnectWallet
                    theme={"dark"}
                    modalSize={"compact"}
                    welcomeScreen={{}}
                />


            </div>

        </div>
    );
}

export default AppSettings;
