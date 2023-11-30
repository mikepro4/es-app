import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { FocusStyleManager } from "@blueprintjs/core";

import '../styles/main.scss';

import Head from "next/head";
import Script from 'next/script';
import { useRouter } from 'next/router';

import {
  store,
  fetchUserInfo,
  toggleNoRedirect
} from "../redux";

FocusStyleManager.onlyShowFocusOnTabs();

import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  rainbowWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";


import { OverlayToaster } from '@blueprintjs/core';

import Drawer from "../components/drawer";
import Modal from "../components/modal";
import Header from "../components/header";
import HeaderDesktop from "../components/header_desktop";
import MainPlayer from "../components/player";
import Sidebar from "../components/sidebar";


const App = ({ children }) => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const router = useRouter();
  const query = router.query;

  const fetchUserDetails = async () => {
    const userIdFromStorage = localStorage.getItem("token");

    if (userIdFromStorage) {
      dispatch(fetchUserInfo());
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);


  useEffect(() => {
    // Update the URL with the item ID as a query parameter
    setTimeout(() => {
      if (query.shapeId && !app.noRedirect) {

        router.push({
          pathname: '/shape',
          query: { shapeId: query.shapeId }
        }, undefined, { shallow: true });
        dispatch(toggleNoRedirect(true))
      }

    }, 1)

  }, [query.shapeId, app.noRedirect]);

  return (
    <>
      <HeaderDesktop />
      <Header />
      <Sidebar />
      {children}
      {app.playerOpen && <MainPlayer />}
      {app.drawerOpen && <Drawer />}
      {app.modalOpen && <Modal />}
    </>
  )
}


export default function MainApp({ Component, pageProps }) {
  // const store = useStore(pageProps.initialReduxState);
  // let editPage = router.pathname.includes("edit");
  return (
    <>

      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="UTF-8" />
        <title>Ethereal Shapes | Interactive Audio/Visual NFT Collection Providing Access to Experience Tiers</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:url" content="https://www.etherealshapes.com/ " />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ethereal Shapes" />
        <meta property="og:description" content="Interactive Audio/Visual NFT Collection Providing Access to Experience Tiers" />
        <meta property="og:image" content="https://res.cloudinary.com/dcdnt/image/upload/v1645294923/ethereal_shapes.png" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, minimal-ui" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Script src="/MochiKit/Base.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/Iter.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/Logging.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/DateTime.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/Format.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/Async.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/DOM.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/Style.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/LoggingPane.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/Color.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/Signal.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/Style.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/Position.js" strategy="beforeInteractive" />
      <Script src="/MochiKit/Visual.js" strategy="beforeInteractive" />
      <Script src="/SVGKit.js" strategy="beforeInteractive" />
      <Script src="/SVGCanvas.js" strategy="beforeInteractive" />

      <Provider store={store}>
        <ThirdwebProvider
          activeChain="mumbai"
          clientId="a0815e45c470abdad32bb79a489e88d2"
          supportedWallets={[
            metamaskWallet({ recommended: true }),
            coinbaseWallet(),
            walletConnect(),
            trustWallet({ recommended: true }),
            rainbowWallet(),
            embeddedWallet()
          ]}
        >
          <div className="app">

            <App>
              <Component {...pageProps} />
            </App>

          </div>
        </ThirdwebProvider>
      </Provider>
    </>
  )

}
