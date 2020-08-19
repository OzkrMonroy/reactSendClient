import React, { useContext } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../context/auth/authContext";

const Login = () => {
  const authContext = useContext(AuthContext);
  const { userAuthenticated } = authContext

  const formik = useFormik({
    initialValues: {
      userEmail: "",
      userPassword: "",
    },
    validationSchema: Yup.object({
      userEmail: Yup.string()
        .required("El correo es obligatorio")
        .email("Ingresa un correo válido"),
      userPassword: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: values => {
      userAuthenticated(values.userEmail)
      console.log(values)
    }
  });
  
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-900 text-center my-4">
          Iniciar sesión
        </h2>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="userEmail"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Correo electrónico"
                  id="userEmail"
                  value={formik.values.userEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.userEmail && formik.errors.userEmail ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error:</p>
                    <p>{formik.errors.userEmail}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="userPassword"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Contraseña"
                  id="userPassword"
                  value={formik.values.userPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.userPassword && formik.errors.userPassword ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error:</p>
                    <p>{formik.errors.userPassword}</p>
                  </div>
                ) : null}
              </div>

              <input
                type="submit"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                value="Iniciar sesión"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
