import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react';


function FileViewer({userFiles}) {
  //const [files, setFiles] = useState(userFiles);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    // Simulando eliminación de archivo
    if (selectedFile) {
      //setFiles(files.filter((file) => file.id !== selectedFile.id));
      setSelectedFile(null);
    }
  }, [selectedFile]);

  const handleDeleteFile = (file) => {
    setSelectedFile(file);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      {
      (!userFiles || userFiles == [])? null:
        userFiles.map((file) => (
          <div key={file.id} className="flex bg-bermuda items-center py-2">
            {/* Icono según la extensión del archivo */}
            {file.extension === 'pdf' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}

            {/* Nombre del archivo */}
            <span className="mr-2 ">{file.fileName}</span>

            {/* Tamaño del archivo */}
            <span className=" text-sm">{(file.fileSize/1000).toString() + " mb"}</span>

            {/* Botón de eliminar archivo */}
            <button
              className="ml-auto"
              onClick={() => handleDeleteFile(file)}
            >
              <XMarkIcon className="h-5 w-5 text-red-500" />
            </button>
          </div>
        ))
      }
      {/* Diálogo de confirmación para eliminar archivo */}
      <Transition show={isDeleteDialogOpen}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* Contenido del diálogo */}
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block bg-white rounded-lg px-4 py-6 text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Eliminar archivo
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    ¿Estás seguro de que deseas eliminar el archivo{' '}
                    <span className="font-medium">
                      {selectedFile && selectedFile.fileName}
                    </span>
                    ?
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-700 bg-grey-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 ml-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default FileViewer;
