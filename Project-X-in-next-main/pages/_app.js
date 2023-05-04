import "@/styles/globals.css";
import { FirebaseProvider } from "@/Context/FirebaseContext";
import Head from "next/head";
import { SocketProvider } from "@/Context/SocketContext";


export default function App({ Component, pageProps }) {

  
  return (
    <>
      <Head>
        <title>Webapp</title>
       {/* it is not recommended to add the boostrap here that is why we have add boostrap link in the document page */}
      </Head>
     
      <FirebaseProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </FirebaseProvider>
    </>
  );
}
