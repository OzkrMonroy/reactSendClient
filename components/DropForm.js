import React, { useState, useContext } from "react";
import AppContext from "../context/app/appContext";

const DropForm = () => {
  const appContext = useContext(AppContext);
  const { savePassword, saveDownloadsCount } = appContext;

  const [showPasswordInput, setShowPasswordInput] = useState(false);

  return (
    <div className="w-full mt-10">
      <div>
        <label className="text-lg text-gray-800">Eliminar tras:</label>
        <select className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500" onChange={e => saveDownloadsCount(parseInt(e.target.value))}>
          <option value="" selected disabled>
            -- Seleccione --
          </option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800">Proteger con Contraseña:</label>
          <input type="checkbox" onChange={() => setShowPasswordInput(!showPasswordInput)}/>
        </div>
        {showPasswordInput && <input type="password" className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500" onChange={e => savePassword(e.target.value)}/>}
      </div>
    </div>
  );
};

export default DropForm;
