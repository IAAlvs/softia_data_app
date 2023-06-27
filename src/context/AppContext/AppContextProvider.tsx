import {FC} from 'react';
import FilesContextProvider from '@/providers/FilesContextProvider';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { combineComponents } from './CombineComponents';
//THIS IS USED IN APP.JS COMPONENT TO MAKE USE OF EVERY CONTEXT 
const providers : React.FC<any>[] = [
  UserProvider,
  FilesContextProvider
]
export const AppContextProvider = combineComponents(...providers);