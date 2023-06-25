
import Head from "next/head";
import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import { NextSeo } from "next-seo";
import "../../styles/globals.css"
import { UserProvider } from '@auth0/nextjs-auth0/client';



export default function Cloud() {
  return (
    <div className="text-black bg-black">
      <NextSeo
        title="Cloud"
        description="Welcome to softiadata cloud"
        canonical="softiadata.com"
        openGraph={{
          url: "softiadata.com",
        }}
      />
      <Head>
        <title>SoftIaData Cloud</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>

  );
}