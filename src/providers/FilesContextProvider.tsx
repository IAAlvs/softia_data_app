import React, { createContext, useState, useEffect } from 'react';
//import FilesContext from '../context/FilesContext';
export const FilesContext = React.createContext<FilesContextData | null>(null);

const FilesContextProvider = ({ children }: { children: React.ReactNode }) => {
    //Could be pictures, files, videos formates as FilesDto
    const [filesByUser, setFilesByUser] = useState<Array<FilesDto>>([]);
    const [reloadFiles, setReloadFiles] = useState("value"  );
    const [filesFiltered, setFilesFiltered] = useState<Array<FilesDto>>([]);
    const reloadFilesForUser = ():void => setReloadFiles("value");
    const filterFiles = (category : string, fileName:string) :void =>{
        if(category){
            let filesToSet = filesByUser.filter(f => f.FileName === fileName)
            setFilesFiltered(filesToSet);
        }
        else{
            let filesToSet = filesByUser.filter(f => f.FileName === fileName &&
                f.FileType == category)
            setFilesFiltered(filesToSet);
        }
    }
    useEffect(() => {
        //Get data based on UserAuth0
        //if()
    }, [reloadFiles]);

  const filesContextData:FilesContextData = {
    filesByUser, filesFiltered, filterFiles, reloadFilesForUser
  };
  return <FilesContext.Provider value={filesContextData}>{children}</FilesContext.Provider>;

};


export default FilesContextProvider;
