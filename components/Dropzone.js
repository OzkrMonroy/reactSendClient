import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axiosClient from "../config/axios";

const Dropzone = () => {
  const onDropRejected = () => {
    console.log('No se pudo subir');
  }

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const response = await axiosClient.post("/api/files", formData);
    console.log(response.data);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

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

  const handleOnCreateLink = () => {
    console.log("Creando el enlace...");
  };

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="w-full mt-10">
          <h4 className="text-2xl fond-bold text-center mb-4">Archivos</h4>
          <ul>{filesList}</ul>
          <button
            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
            type="button"
            onClick={() => handleOnCreateLink()}
          >
            Crear enlace
          </button>
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
