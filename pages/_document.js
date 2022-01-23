import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    // https://www.favicon-generator.org/
    return (
      <Html>
        <Head>
          <link href="/style/bootstrap.min.css" rel="stylesheet" />
          <link href="/style/fontawesome/css/all.css" rel="stylesheet" />
          <link href="/style/style.css" rel="stylesheet" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="twitter:card" content="photo" />
          <meta name="twitter:site" content="@pkellner" />
          <meta name="twitter:creator" content="@pkellner" />

          <meta
            name="twitter:title"
            content="Most to Least Polluted United States cities air quality and temperature. Data source are the tens of thousands of sensors from Purple Air. Top 7 in each city averaged together."
          />
          <meta
            name="twitter:image"
            content="https://airquality.peterkellner.net/images/airquality-250x150.png"
          />
          <meta name="twitter:image:width" content="250" />
          <meta name="twitter:image:height" content="150" />

          <meta
            property="og:title"
            content="Most Pollutest United States cities air quality and temperature"
          />
          <meta
            property="og:description"
            content="Most Polluted United States cities air quality and temperature"
          />
          <meta
            property="og:url"
            content="https://airquality.peterkellner.net"
          />

          <meta
            name="image"
            property="og:image"
            content="https://airquality.peterkellner.net/images/airquality-350x220.png"
          />

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-123456789"
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YKJ5WY4MH2', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
