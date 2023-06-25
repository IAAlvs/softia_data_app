interface FilesContextData {
    filesByUser: Array<FilesDto>;
    filesFiltered : Array<FilesDto>;
    filterFiles : (category : string, fileName:string) => void;
    reloadFilesForUser : () => void
  }
  