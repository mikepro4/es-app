import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";

import { 
  store, 
  fetchUserInfo 
} from "../redux";


import '../styles/main.scss';
import Head from "next/head";

const App = ({ children }) => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  return (
    <>
      {children}
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
        <script type="text/javascript" src="/MochiKit/Base.js"></script>
        <script type="text/javascript" src="/MochiKit/Iter.js"></script>
        <script type="text/javascript" src="/MochiKit/Logging.js"></script>
        <script type="text/javascript" src="/MochiKit/DateTime.js"></script>
        <script type="text/javascript" src="/MochiKit/Format.js"></script>
        <script type="text/javascript" src="/MochiKit/Async.js"></script>
        <script type="text/javascript" src="/MochiKit/DOM.js"></script>
        <script type="text/javascript" src="/MochiKit/Style.js"></script>
        <script type="text/javascript" src="/MochiKit/LoggingPane.js"></script>
        <script type="text/javascript" src="/MochiKit/Color.js"></script>
        <script type="text/javascript" src="/MochiKit/Signal.js"></script>
        <script type="text/javascript" src="/MochiKit/Style.js"></script>
        <script type="text/javascript" src="/MochiKit/Position.js"></script>
        <script type="text/javascript" src="/MochiKit/Visual.js"></script>
    
        <script type="text/javascript" src="/SVGKit.js" ></script>
        <script type="text/javascript" src="/SVGCanvas.js"></script>
      </Head>

      <Provider store={store}>

        <div className="app">
          {/* <Drawer /> */}
          {/* <Closet /> */}
          <App>
            <Component {...pageProps} />
          </App>

        </div>
      </Provider>
    </>
  )

}
