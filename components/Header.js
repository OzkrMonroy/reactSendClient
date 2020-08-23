import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

import AuthContext from "../context/auth/authContext";
import AppContext from "../context/app/appContext";

const Header = () => {
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);

  const { user, getAuthenticatedUser, signOut } = authContext;
  const { resetState } = appContext

  const router = useRouter();

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  const redirect = () => {
    resetState();
    router.push('/');
  }

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img src="/logo.svg" alt="Icon home" className="w-64 mb-8 md:mb-0 cursor-pointer" onClick={redirect}/>
      <div>
        {user ? (
          <div className="flex items-center">
            <p className="mr-3">Hola {user.userName}</p>
            <button
              type="button"
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
              onClick={() => signOut()}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-3">
                Iniciar Sesión
              </a>
            </Link>
            <Link href="/signup">
              <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">
                Crear cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
