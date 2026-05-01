import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="author" content="Ejuan Henderson" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <link
          href="/static/plugin/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="/static/plugin/font-awesome/css/all.min.css"
          rel="stylesheet"
        />
        <link href="/static/plugin/et-line/style.css" rel="stylesheet" />
        <link
          href="/static/plugin/themify-icons/themify-icons.css"
          rel="stylesheet"
        />
        <link
          href="/static/plugin/owl-carousel/css/owl.carousel.min.css"
          rel="stylesheet"
        />
        <link
          href="/static/plugin/magnific/magnific-popup.css"
          rel="stylesheet"
        />

        <link href="/static/style/master.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}