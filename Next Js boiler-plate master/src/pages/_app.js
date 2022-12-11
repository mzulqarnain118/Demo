import { ToastContainer } from "react-toastify";
import "assets/styles/globals.css"
import Head from "next/head"
import React from "react"
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from "store/reducer"
import { addLogin } from "store/action/loggedin_action";
import Cookies from "js-cookie";
import { AUTH } from "appConfig";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "dagger.com",
    url: "https://dagger.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://dagger.com",
      "query-input": "required name=search_term_string",
    },
  }

  if (Cookies.get(AUTH.AUTH_TOKEN)) {
    store.dispatch(addLogin(true));
    // store.dispatch(fetchProfile());
  } else {
    store.dispatch(addLogin(false));
  }

  const content = <Component {...pageProps} />

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta name="robots" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Dagger" />
        <meta property="og:title" content="Dagger" />
        <meta property="og:description" content="Dagger " />
        <meta property="og:image" content="social-image.png" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="apple-touch-icon" type="image/png" href="%PUBLIC_URL%/assets/images/favicon.png" />
        <link href="/assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="%PUBLIC_URL%/assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet" />
        <link href="%PUBLIC_URL%/assets/vendor/jqvmap/css/jqvmap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="%PUBLIC_URL%/assets/vendor/chartist/css/chartist.min.css" />
        <link rel="stylesheet" href="%PUBLIC_URL%/assets/fonts/icomoon/style.css" />
        <link rel="stylesheet" href="%PUBLIC_URL%/assets/css/owl.carousel.min.css" />

        <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      </Head>
      <>
        <Provider store={store}>
          <ToastContainer position="top-right" autoClose={3000} />
          {getLayout(content)}
        </Provider>
      </>
    </>
  )
}

export default MyApp