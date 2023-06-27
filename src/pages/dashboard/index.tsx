import React, { useEffect } from 'react';
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FileViewer from '../../components/FileViewer';
import { NextSeo } from "next-seo";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useContext } from 'react';
import DashboardBar from '../../components/DashboardBar';
import FileUploader from '../../components/FileUploader';
import ItemSearch from '../../components/ItemsSearch';
import FilesContext from "../../context/FilesContext/FilesContext"
//import { FilesContextData } from '@/context/FilesContext/FilesContextData';


export default function Dashboard() : React.ReactNode{
  const context= useContext(FilesContext);
  const filesFiltered = context?.filesFiltered;
  //We quit cause filtes filtered ever will return our files cau it have a useEffect when user changes
/*   useEffect(()=>{ 
      context?.getUserFiles()
  },[]) */
  return (
    <div className="text-black bg-black">
      <NextSeo
        title="Dashboard"
        description="dashboard"
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
        <FileViewer userFiles={filesFiltered}></FileViewer>
      </div>
      <Footer />
    </div>
  );
}


export const getServerSideProps = withPageAuthRequired();
