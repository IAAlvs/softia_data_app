import { useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

import { useDropzone } from 'react-dropzone';

const dropzoneStyle = {
  width: '100%',
  height: '20vh',
  border: '2px dashed #ccc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const FileUploader = () => {
  const onDrop = (acceptedFiles) => {
    // Manejar los archivos aceptados
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      //onFileUpload(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='mb-5' style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className='text-grey'>Suelta el archivo aquí...</p>
      ) : (
        <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 cursor-pointer'>
            <CloudArrowUpIcon className="h-5 w-5 mr-2" />
            Drag and Drop file or click to select


        </button>
      )}
    </div>
  );
};

export default FileUploader;