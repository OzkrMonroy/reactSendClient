import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout';
import AuthContext from '../context/auth/authContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import AppContext from '../context/app/appContext';
import Alert from '../components/Alert';

const Index = () => {
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);

  const { getAuthenticatedUser, user } = authContext
  const { message_file } = appContext;

  useEffect(() => {
    getAuthenticatedUser()
  }, [])
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        { message_file && <Alert message={message_file} color="red" intensity="500"/> }
        <div className="lg:flex md:shadow-lg p-5 rounded-lg bg-white py-10">
          <Dropzone/>
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Comparte archivos de forma privada, sencilla y segura</h2>
            <p className="text-lg leading-loose">
              <span className="text-red-500 font-bold">ReactSend</span> te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado después de ser descargado.
              Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.
            </p>
            {!user && (<Link href="/signup">
              <a><span className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta</span> para mayores beneficios</a>
            </Link>)}
          </div>
        </div>
      </div>
    </Layout>
  );
}
 
export default Index;
