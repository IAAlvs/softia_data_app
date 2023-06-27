import React, { createContext, useState, useEffect, use, FC } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FilesDto } from './dtos/FilesDto';
import FilesContext from '@/context/FilesContext/FilesContext';
import { FilesContextData } from '@/context/FilesContext/FilesContextData';
//export const FilesContext = React.createContext<FilesContextData | null>(null);
interface CProvidersProps {
    children: React.ReactNode
}
const FilesContextProvider: FC<CProvidersProps>= ({ children} : CProvidersProps) => {
    //Could be pictures, files, videos formates as FilesDto
    const { user, error, isLoading } = useUser();
    const [filesByUser, setFilesByUser] = useState<Array<FilesDto>>([]);
    const [reloadFiles, setReloadFiles] = useState("value");
    const [filesFiltered, setFilesFiltered] = useState<Array<FilesDto>>([]);
    const getUserFiles = ():void =>{
            console.log("times passed here  ")
            if(user){
            if(user.sub && user.sub.trim() == "google-oauth2|106086879040162937154"){
            let userFiles : FilesDto[] = [
                {
                    id: '3e6d1174-41ed-46b9-8f4e-41509ff5b1dc',
                    fileName: 'documento.pdf',
                    fileType: 'pdf',
                    data : "JBER12312313213",
                    fileSize: 150000,
                },
                {
                    id: '2e6d1174-41ed-46b9-8f4e-41509ff5b1dc',
                    fileName: 'documento2.pdf',
                    fileType: 'pdf',
                    data : "JBER12312313213",
                    fileSize: 150000,
                },
                {
                    id: '1e6d1174-41ed-46b9-8f4e-41509ff5b1dc',
                    fileName: 'documento3.png',
                    fileType: 'png',
                    data : "JBER12312313213",
                    fileSize: 150000,
                }
            ]
            setFilesByUser(userFiles);
            setFilesFiltered(userFiles);
            }
        }
    }
    useEffect(() =>{
        getUserFiles()
    }, [user])
    const filterFiles = (fileName:string, category? : string) :void =>{
        if(category){
            let filesToSet = filesByUser.filter(f => f.fileName.includes(fileName)
                && f.fileType === category)
            setFilesFiltered(filesToSet);
        }
        else{
            let filesToSet = filesByUser.filter(f => f.fileName.includes(fileName) );
            setFilesFiltered(filesToSet);
        }
    }


  const filesContextData:FilesContextData = {
    filesByUser, filesFiltered, filterFiles, getUserFiles
  };
  return <FilesContext.Provider value={filesContextData}>{children}</FilesContext.Provider>;

};


export default FilesContextProvider;
