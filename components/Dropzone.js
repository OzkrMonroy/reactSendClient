import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import AppContext from "../context/app/appContext";
import AuthContext from "../context/auth/authContext";
import DropForm from "./DropForm";

const Dropzone = () => {
  const appContext = useContext(AppContext);
  const { loading, showAlert, uploadFile, createLink } = appContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext

  const [fileSize, setFileSize] = useState(1000000)


  useEffect(() => {
    if(user){
      setFileSize(25000000)
    }
  }, [user])

  const onDropRejected = () => {
    showAlert('El tamaño del archivo supera el límite. Crea una cuenta para enviar archivos pesados.')
  }

  const onDropAccepted = useCallback((acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    uploadFile(formData, acceptedFiles[0].path);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: fileSize});

  const filesList = acceptedFiles.map((file) => (
    <li
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
      key={file.lastModified}
    >
      <p className="text-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-500">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="w-full mt-10">
          <h4 className="text-2xl fond-bold text-center mb-4">Archivos</h4>
          <ul>{filesList}</ul>
          {isAuthenticated && <DropForm/>}
          {loading ? <p className="py-10 text-center text-gray-700">Subiendo archivo...</p> : (
            <button
              className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
              type="button"
              onClick={() => createLink()}
            >
              Crear enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />
          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Suélta el archivo
            </p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Arrastra el archivo aquí.
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button"
              >
                Seleccionar archivo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
