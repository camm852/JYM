import React from 'react';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import logo from '../assets/JYMLOGO.png';

interface Props {
  isLogin: boolean;
}

export default function FormLoginSingUp(props: Props) {
  const { isLogin } = props;

  const schema = isLogin
    ? Yup.object().shape({
        email: Yup.string().required('Escribe un email').email('Un email valido'),
        password: Yup.string().required('Escribe una contraseña')
      })
    : Yup.object().shape({
        name: Yup.string()
          .required('Escribe tu nombre')
          .min(10, 'Minimo 10 caracteres')
          .max(20, 'Máximo 20 caracteres'),
        phone: Yup.string()
          .phone('CO', 'Introduce un número correcto')
          .required('Número de Teléfono'),
        email: Yup.string().required('Escribe un email').email('Un email valido'),
        password: Yup.string().required('Escribe una contraseña'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
          .required('Las contraseñas no coinciden'),
        address: Yup.string()
          .required('Introduce una dirección')
          .min(10, 'Minimo 10 caracteres')
          .max(30, 'Máximo 30 caracteres')
      });

  return (
    <Formik
      initialValues={
        isLogin
          ? { email: '', password: '' }
          : {
              name: '',
              email: '',
              phone: '',
              address: '',
              password: '',
              confirmPassword: ''
            }
      }
      validationSchema={schema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          console.log('submit');
        }, 1000);
      }}
    >
      {({ handleChange, handleSubmit, errors, values, touched }) => (
        <div className="block lg:flex lg:justify-center">
          <div className="w-full  lg:w-3/6 xl:w-3/6 px-4 mt-8 lg:mt-3 xl:mt-3">
            <img src={logo} alt="logo" className="m-auto mt-4 sm:mt-0 w-56" />
            <form
              onSubmit={handleSubmit}
              className={`p-4 flex ${
                isLogin ? 'flex-col ' : 'flex-row flex-wrap gap-2'
              } justify-center items-center`}
            >
              {isLogin ? (
                <>
                  {/* Login */}
                  <h2 className="font-semibold">Entra a tu cuenta para continuar</h2>
                  <div className="w-4/6 lg:w-full xl:w-11/12">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={values.email}
                      className={`w-full text-slate-700 border-b border-gray-300 mt-8 focus:outline-none  focus:border-orange-200 bg-transparent ${
                        errors.email && touched.email ? 'border-b-red-600 mt-3' : ''
                      } `}
                      placeholder="ejemplo@gmail.com"
                      onChange={handleChange}
                    />
                    {errors.email && touched.email ? (
                      <div className="w-full sm:w-2/3 lg:w-full text-left pt-2 text-red-500 ">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-4/6 lg:w-full xl:w-11/12">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={values.password}
                      className={`w-full text-slate-700  border-b border-gray-300  mt-4  focus:outline-none focus:border-orange-200 bg-transparent ${
                        errors.password && touched.password ? 'border-b-red-600 mt-1' : ''
                      } `}
                      placeholder="**********************"
                      onChange={handleChange}
                    />
                    {errors.password && touched.password ? (
                      <div className="w-full sm:w-2/3 lg:w-full text-left  pt-2 text-red-500">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  {/* Registro */}
                  <div className="w-full text-center">
                    <h2 className="font-semibold">Registra tu cuenta para continuar</h2>
                  </div>
                  <div className="w-4/6 lg:w-5/12">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={values.name}
                      className={`w-full text-slate-700  border-b border-gray-300 focus:outline-none mt-8 focus:border-orange-200 bg-transparent ${
                        errors.name && touched.name ? 'border-b-red-600 mt-3' : ''
                      } `}
                      placeholder="Nombre Completo"
                      onChange={handleChange}
                    />
                    {errors.name && touched.name ? (
                      <div className="w-full  sm:w-2/3 lg:w-full text-left pt-2 text-red-500 ">
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-4/6 lg:w-6/12">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={values.email}
                      className={`w-full  border-b text-slate-700 border-gray-300   focus:outline-none mt-8 focus:border-orange-200 bg-transparent ${
                        errors.email && touched.email ? 'border-b-red-600 mt-3' : ''
                      } `}
                      placeholder="Dirección Email"
                      onChange={handleChange}
                    />
                    {errors.email && touched.email ? (
                      <div className="w-full  sm:w-2/3 lg:w-full text-left pt-2 text-red-500 ">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-4/6 lg:w-4/12">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={values.phone}
                      className={`w-full border-b text-slate-700 border-gray-300  focus:outline-none mt-8 focus:border-orange-200 bg-transparent ${
                        errors.phone && touched.phone ? 'border-b-red-600 mt-3' : ''
                      } `}
                      placeholder="Número de Teléfono"
                      onChange={handleChange}
                    />
                    {errors.phone && touched.phone ? (
                      <div className="w-full  sm:w-2/3 lg:w-full text-left pt-2 text-red-500 ">
                        {errors.phone}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-4/6 lg:w-7/12">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={values.address}
                      className={`w-full border-b  text-slate-700 border-gray-300  focus:outline-none mt-8 focus:border-orange-200 bg-transparent ${
                        errors.address && touched.address ? 'border-b-red-600 mt-3' : ''
                      } `}
                      placeholder="Dirección de Residencia"
                      onChange={handleChange}
                    />
                    {errors.address && touched.address ? (
                      <div className="w-full  sm:w-2/3 lg:w-full text-left pt-2 text-red-500 ">
                        {errors.address}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-4/6  lg:w-5/12">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={values.password}
                      className={`w-full   text-slate-700 border-b border-gray-300  focus:outline-none mt-8 focus:border-orange-200 bg-transparent ${
                        errors.password && touched.password ? 'border-b-red-600 mt-1' : ''
                      } `}
                      placeholder="**********************"
                      onChange={handleChange}
                    />
                    {errors.password && touched.password ? (
                      <div className="w-full sm:w-2/3 lg:w-full text-left  pt-2 text-red-500">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-4/6  lg:w-6/12">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={values.confirmPassword}
                      className={`w-full text-slate-700  border-b border-gray-300   focus:outline-none mt-8 focus:border-orange-200 bg-transparent ${
                        errors.confirmPassword && touched.confirmPassword
                          ? 'border-b-red-600 mt-1'
                          : ''
                      } `}
                      placeholder="**********************"
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="w-full  sm:w-2/3 lg:w-full text-left  pt-2 text-red-500">
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-4/6  lg:w-full xl:w-11/12 mt-8 p-2 border rounded-md bg-orange-200 hover:bg-orange-300 font-medium hover:text-white transition-all duration-300"
              >
                {isLogin ? 'Entrar' : 'Registrarse'}
              </button>
              <div className="w-full lg:w-11/12 flex justify-center lg:justify-end  mt-3">
                <p className="mr-2">
                  {isLogin ? '¿Aun no tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                </p>
                <Link
                  to={`/${isLogin ? 'signUp' : 'login'}`}
                  className="underline hover:text-orange-300 transition-colors ease-out duration-300 "
                >
                  {!isLogin ? 'Entrar' : 'Registrarse'}
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}
