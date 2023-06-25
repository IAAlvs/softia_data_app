import { useState } from 'react';
import "../styles/upload-file-form.css"

function FileUploadForm() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileRemove = (file) => {
    const updatedFiles = selectedFiles.filter((f) => f !== file);
    setSelectedFiles(updatedFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    const email = event.target.value.trim();
    console.log(email)
    if(email == ""){
      event.target.classList.remove("invalid-email");
      event.target.classList.remove("valid-email");
      return;
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validEmail = regexEmail.exec(email)
    console.log(regexEmail.test(validEmail));
    if(!validEmail){
      event.target.classList.remove("valid-email");
      event.target.classList.add("invalid-email");
      return;
    }
    else{
      event.target.classList.add("valid-email");
      event.target.classList.remove("invalid-email");
      return;
    }
      

    // Aquí puedes agregar la lógica para manejar el cambio de la dirección de correo
  };

  return (
    <div className="max-w-md mx-auto pt-6 pl-2 bg-dark rounded shadow">

      <div
        className="border-2 border-dashed border-gray-300 p-4 mb-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-gray-500 mb-2">Drag and drop your files here</p>
        <input type="file" multiple onChange={handleFileSelect} />
        {selectedFiles.map((file, index) => (
          <div key={index} className="flex items-center mt-2">
            <span className="text-gray-700">{file.name}</span>
            <button
              className="ml-2 text-red-600"
              onClick={() => handleFileRemove(file)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 email-form-cloud p-2 rounded focus:outline-none"
            onChange={handleEmailChange}
            autoComplete="false"
            autoCorrect="false"
            required
          />
        </div>
        <div style={{display : "flex", flexDirection :"row", justifyContent: "space-between"}}>
            <button
            className="inline-flex items-center py-3 font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-transparent  bg-gradient-to-r from-blue-500 to-blue-800 px-14 text-md md:mt-0 focus:shadow-outline"
            type='submit'>
                <div className="flex text-lg">
                    <span className="justify-center">Upload File</span>
                </div>
            </button>
            <a
            className="inline-flex items-center py-3 font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-white  bg-gradient-to-r from-purple to-metal px-14 text-md md:mt-0 focus:shadow-outline"
            href="/api/auth/login">
                <div className="flex text-lg">
                    <span className="justify-center">Create account</span>
                </div>
            </a>
        </div>

      </form>
    </div>
  );
}

export default FileUploadForm;