import React, { useState, useContext } from "react";
import Layout from "../../components/Layout";
import axiosClient from "../../config/axios";
import AppContext from "../../context/app/appContext";
import Alert from "../../components/Alert";

export async function getServerSideProps({ params }) {
  const { link } = params;
  try {
    const response = await axiosClient.get(`/api/linksCreator/${link}`);

    return {
      props: {
        link: response.data,
      },
    };
  } catch (error) { 
    return {
      props: {
        link: null
      }
    }
   }
}

export async function getServerSidePaths() {
  try {
    const linksResponse = await axiosClient.get("/api/linksCreator");
    return {
      paths: linksResponse.data.linksList.map((link) => ({
        params: { link: link.fileUrl },
      })),
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
}

export default ({ link }) => {
  
  if(!link) return (
    <Layout>
      <p className="text-center text-gray-700 text-3xl">
        El archivo que estás buscando ya ha sido eliminado
      </p>
    </Layout>
  )

  const [hasPassword, setHasPassword] = useState(link.password);
  const [password, setPassword] = useState("");
  const [fileLink, setFileLink] = useState(link.file);

  const appContext = useContext(AppContext);
  const { showAlert, message_file } = appContext;

  const verifyPassword = async (e) => {
    e.preventDefault();

    const data = {
      password,
    };

    try {
      const response = await axiosClient.post(
        `/api/linksCreator/${link.link}`,
        data
      );
      setHasPassword(response.data.password);
      setFileLink(response.data.file);
      console.log(response.data, link);
    } catch (error) {
      showAlert(error.response.data.msg);
    }
  };


  return (
    <Layout>
      {hasPassword ? (
        <>
          <p className="text-center text-gray-700">
            Este enlance está protegido con una contraseña, ingrésala para
            desbloquear:
          </p>
          {message_file && (
            <Alert message={message_file} color="red" intensity="500" />
          )}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verifyPassword(e)}
              >
                <div className="mb-4">
                  <label
                    htmlFor="filePassword"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Contraseña del archivo
                  </label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Contraseña"
                    id="filePassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Desbloquear"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo:
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/files/${fileLink}`}
              className="bg-red-500 px-10 py-3 text-white uppercase rounded font-bold cursor-pointer text-center"
              download
            >
              Descargar
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
