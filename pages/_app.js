import MasterLayout from '../src/components/layouts/master';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/styles/style.scss";

import { Provider } from 'react-redux';
import { store, persistor } from "../src/redux/store";
import { PersistGate } from 'redux-persist/lib/integration/react';
// import * as fbq from '../lib/fpixel';
import router from 'next/router';

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   // This pageview only triggers the first time (it's important for Pixel to have real information)
  //   fbq.pageview();

  //   const handleRouteChange = () => {
  //     fbq.pageview();
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <>
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
            fbq('track', 'PageView');`
        }}
      /> */}
      {/* <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${fbq.FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MasterLayout>
            <Component {...pageProps} />
          </MasterLayout>
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
