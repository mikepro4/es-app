import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import classNames from "classnames";
import Anime from 'react-anime';
import { motion } from "framer-motion"
import Navlinks from "../nav_links"
import Button from "../button"

import Icon from "../icon"

import { toggleDrawer } from "@/redux";

function Header() {
    const [loading, setLoading] = useState(false);
    const app = useSelector((state) => state.app);
    const router = useRouter();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuClosing, setMenuClosing] = useState(false);
    const [showMenuBars, setShowMenuBars] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showWord, setShowWord] = useState(false);
    const [visible, setVisible] = useState(false);

    const [clientHeight, setClientHeight] = useState(0);

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

    useEffect(() => {
        if (window) {
            setClientHeight(window.innerHeight);
            // Function to handle window resize
            const handleResize = () => {
                setClientHeight(window.innerHeight);
            }

            // Add event listener
            window.addEventListener('resize', handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener('resize', handleResize);
        }

    }, []);

    const renderLines = () => {
        const bottomOpen = [
            { value: 'M39.50625,9.5 C30.8788547,9.5 28.639837,0.5 20,0.5 C11.360163,0.5 8.88972652,9.5 0.5,9.5' }]

        const bottomClosed = [
            { value: 'M39.50625,9.5 C30.8788547,9.5 28.642962,9.5 20.003125,9.5 C11.363288,9.5 8.88972652,9.5 0.5,9.5' }]

        const topOpen = [
            { value: 'M39.50625,0.5 C30.8788547,0.5 28.642962,0.5 20.003125,0.5 C11.363288,0.5 8.88972652,0.5 0.5,0.5' }]

        const topClosed = [
            { value: 'M39.50625,0.5 C30.8788547,0.5 28.642962,9.5109931 20.003125,9.5109931 C11.363288,9.5109931 8.88972652,0.5 0.5,0.5' }]


        if (!menuOpen && !menuClosing) {
            return (
                <div>
                    <div className="line_bottom">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="10"
                        >
                            <g
                                fill="none"
                                fillRule="evenodd"
                                stroke="#FFF"
                                strokeLinecap="square"
                                strokeWidth="1.1"
                            >

                                <path d="M39.50625,9.5 C30.8788547,9.5 28.642962,9.5 20.003125,9.5 C11.363288,9.5 8.88972652,9.5 0.5,9.5"></path>

                            </g>
                        </svg>

                    </div>

                    <div className="line_top">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="10"
                        >
                            <g
                                fill="none"
                                fillRule="evenodd"
                                stroke="#FFF"
                                strokeLinecap="square"
                                strokeWidth="1.1"
                            >

                                <path d="M39.50625,0.5 C30.8788547,0.5 28.642962,0.5 20.003125,0.5 C11.363288,0.5 8.88972652,0.5 0.5,0.5"></path>
                            </g>
                        </svg>

                    </div>
                </div>
            )
        }

        if (menuOpen) {
            return (<div>
                <div className="line_bottom">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="10"
                    >
                        <g
                            fill="none"
                            fillRule="evenodd"
                            stroke="#FFF"
                            strokeLinecap="square"
                            strokeWidth="1"
                        >
                            <Anime
                                easing="easeInOutCubic"
                                duration={1000}
                                d={bottomOpen}
                                loop={false}
                                key={11 + Date.now()}
                            >
                                <path d="M39.50625,9.5 C30.8788547,9.5 28.642962,9.5 20.003125,9.5 C11.363288,9.5 8.88972652,9.5 0.5,9.5"></path>
                            </Anime>
                            )
                        </g>
                    </svg>

                </div>

                <div className="line_top">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="10"
                    >
                        <g
                            fill="none"
                            fillRule="evenodd"
                            stroke="#FFF"
                            strokeLinecap="square"
                            strokeWidth="1.1"
                        >
                            <Anime
                                easing="easeInOutCubic"
                                duration={1000}
                                d={topClosed}
                                loop={false}
                                key={11 + Date.now()}
                            >
                                <path d="M39.50625,0.5 C30.8788547,0.5 28.642962,0.5 20.003125,0.5 C11.363288,0.5 8.88972652,0.5 0.5,0.5"></path>

                            </Anime>



                        </g>
                    </svg>

                </div>
            </div>
            )
        }

        if (menuClosing) {
            return (
                <div>
                    <div className="line_bottom">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="10"
                        >
                            <g
                                fill="none"
                                fillRule="evenodd"
                                stroke="#FFF"
                                strokeLinecap="square"
                                strokeWidth="1.1"
                            >
                                <Anime
                                    easing="easeInOutCubic"
                                    duration={1000}
                                    d={bottomClosed}
                                    loop={false}
                                    key={11 + Date.now()}
                                >
                                    <path d="M39.50625,9.5 C30.8788547,9.5 28.639837,0.5 20,0.5 C11.360163,0.5 8.88972652,9.5 0.5,9.5"></path>

                                </Anime>


                            </g>
                        </svg>

                    </div>

                    <div className="line_top">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="10"
                        >
                            <g
                                fill="none"
                                fillRule="evenodd"
                                stroke="#FFF"
                                strokeLinecap="square"
                                strokeWidth="1.1"
                            >

                                <Anime
                                    easing="easeInOutCubic"
                                    duration={1000}
                                    d={topOpen}
                                    loop={false}
                                    key={11 + Date.now()}
                                >

                                    <path d="M39.50625,0.5 C30.8788547,0.5 28.642962,9.5109931 20.003125,9.5109931 C11.363288,9.5109931 8.88972652,0.5 0.5,0.5"></path>

                                </Anime>


                            </g>
                        </svg>

                    </div>
                </div>
            )
        }
    }

    const handleClick = () => {
        if (!menuOpen && !menuClosing) {
            setMenuOpen(true)
            setShowMenuBars(true)
            setShowContent(true)
            document.body.classList.add("no-scroll")
        }

        if (menuOpen) {
            hideMenu()
        }
    }

    const hideMenu = () => {
        setMenuOpen(false)
            setMenuClosing(true)
            document.body.classList.remove("no-scroll")

            setTimeout(() => {
                setMenuClosing(false)
            }, 1000)
    }

    const renderMenu = () => {
        const menuContainer = {
            open: {
                height: "100%",
                type: "spring",
                damping: 2,
                stiffness: 10,
                transition: { duration: 0.4, delay: 0 }
            },
            closed: {
                height: "0",
                type: "spring",
                damping: 2,
                stiffness: 10,
                transition: { duration: 0.2, }
            },
        }

        const menuBar = {
            open: (custom) => ({
                y: 0,
                backgroundColor: "#ffffff",
                type: "spring",
                damping: 2,
                stiffness: 10,
                transition: {
                    delay: 0 + custom,
                    duration: 0.4,
                }
            }),
            closed: (custom) => ({
                y: "-100%",
                backgroundColor: "#ffffff",
                type: "spring",
                damping: 2,
                stiffness: 10,
                transition: {
                    delay: 0,
                    duration: 0.2
                }
            })
        }

        return (
            <div className="menu-wrapper">
                <div className={classNames({
                    "show-bars": showMenuBars
                }, "bars")}>
                    <motion.div
                        animate={menuOpen ? "open" : "closed"}
                        variants={menuBar}
                        custom={0}
                        className="menu_bar menu_bar_1"
                    />

                    <motion.div
                        animate={menuOpen ? "open" : "closed"}
                        variants={menuBar}
                        custom={0.1}
                        className="menu_bar menu_bar_2"
                    />
                </div>

                <motion.div
                    animate={menuOpen ? "open" : "closed"}
                    variants={menuContainer}
                    className="menu_container"
                    id="menu-container"
                >

                    {showContent && <div className="menu_content" style={{ height: clientHeight + "px" }}>

                        <div className="main-menu">

                            <Navlinks
                                links={mainPages}
                                onClick={()=> {
                                    if(menuOpen) {
                                        hideMenu()
                                    }
                                }}
                            />

                            {/* <ul className="button-container">
                                <li>
                                    <Button
                                        label="Connect Wallet"
                                        onClick={() => {
                                            if(menuOpen) {
                                                hideMenu()
                                            }
                                        }}
                                    />
                                </li>

                                <li>
                                    <div className="button-container-group">

                                        <Button
                                            minimal={true}
                                            label="Login"
                                            onClick={() => {
                                                router.push("/login")
                                                if(menuOpen) {
                                                    hideMenu()
                                                }
                                            }}
                                        />

                                        <Button
                                            minimal={true}
                                            label="Signup"
                                            onClick={() => {
                                                router.push("/signup");
                                                
                                                if(menuOpen) {
                                                    hideMenu()
                                                }
                                            }}
                                        />
                                    </div>
                                </li>
                                

                            </ul> */}



                        </div>

                        {/* {this.renderBottom()} */}
                    </div>}

                </motion.div>


            </div>

        )
    }

    return (
        <div className="header-container">

            <div className="header-left">

                <div className="menu-icon" onClick={() => handleClick()}>
                    {renderLines()}
                </div>
            </div>

            <div className="header-right">
                <div className="header-user-icon" onClick={() => {
                    dispatch(toggleDrawer(
                        {
                            drawerOpen: true,
                            drawerType: "profile-settings"
                        }
                    ))
                }}><Icon name="user" /></div>
            </div>

            <div className="header-logo" >
                <Icon name="logo-mobile" onClick={() => {
                    router.push("/")
                    if(menuOpen) {
                        hideMenu()
                    }
                }}/>
            </div>

            {renderMenu()}

        </div>
    );
}

export default Header;
