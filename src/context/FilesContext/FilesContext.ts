import { createContext } from 'react';
import { FilesContextData } from './FilesContextData';
const FilesContext = createContext<FilesContextData | undefined>(undefined);


export default FilesContext;
