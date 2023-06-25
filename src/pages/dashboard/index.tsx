import React from 'react';
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FileViewer from '../../components/FileViewer';
import { NextSeo } from "next-seo";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import DashboardBar from '../../components/DashboardBar';
import FileUploader from '../../components/FileUploader';
import ItemSearch from '../../components/ItemsSearch';


export default () => {

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
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {/* <Header /> */}

      <DashboardBar/>
      <div className='max-w-5xl xl:max-w-5xl mx-auto' style={{height :"1000px"}}>
        <FileUploader ></FileUploader>
        <ItemSearch></ItemSearch>
        <FileViewer ></FileViewer>
      </div>
      <Footer />
    </div>
  );
}


//export const getServerSideProps = withPageAuthRequired();
