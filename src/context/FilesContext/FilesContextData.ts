import { FilesDto } from "@/providers/dtos/FilesDto";
export interface FilesContextData {
    filesByUser: Array<FilesDto>;
    filesFiltered : Array<FilesDto>;
    filterFiles : (fileName:string, category?: string,) => void;
    getUserFiles : () => void
  }
  