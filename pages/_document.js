import Document, { Html, Head, Main, NextScript } from 'next/document';
// import * as fbq from '../lib/fpixel';


class MyDocument extends Document {

  render() {

    if (typeof window !== "undefined") {

      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());

      gtag('config', 'G-3T3R95LGP2');

    }

    return (
      <Html>
        <Head>
          <meta charset="utf-8" />
          <link rel="icon" href="/images/favicon.png" />

          <meta property="og:title" content="Nutsvibe" />
          <meta property="og:description" content="Hair Growth and Hair fall control Nutsvibe oil" />
          <meta property="og:image" content="/images/displayimagenew.png" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="600" />
          <meta property="og:image:alt" content="Nutsvibe" />

          <link rel="shortcut icon" href="/favicon.ico" />

          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Secular+One&display=swap"
            rel="stylesheet"
          />
          {/* <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap"
          rel="stylesheet"
        ></link> */}
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap" rel="stylesheet"></link>

          <link
            href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
            integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          {/* Second Microsoft Clarity script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window, document, "clarity", "script", "o62eg11lss");`
            }}
          />

          {/* //  <!-- Google tag (gtag.js) --> */}
          {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6JW6YCP2XW"
        ></script> */}
          {/* Meta Pixel Code */}
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
        </Head>

        <body>
          {/* Meta Pixel Code Noscript */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=867412065470068&ev=PageView&noscript=1"
              alt="facebook pixel"
            />
          </noscript>
          {/* Add Google Tag Manager (noscript) */}
          {/* <noscript
            dangerouslySetInnerHTML={{
              __html: <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MT35J38" height="0" width="0" style="display:none;visibility:hidden"></iframe>,
            }}
          /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;