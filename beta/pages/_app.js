import "@/styles/globals.css";
import { FirebaseProvider } from "@/Context/FirebaseContext";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
       
      </Head>
     
      <FirebaseProvider>
        <Component {...pageProps} />
      </FirebaseProvider>
    </>
  );
}
