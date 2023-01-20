import React from 'react';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { JYMLOGO } from '../../assets/assests';
import FormLogin from './FormLogin';
import FormSignUp from './FormSignUp';
import { IPropsLogin as Props } from '../../vite-env';
import { login } from '../../redux/slices/UserSlice';
import { useAppDispatch } from '../../redux/store/Hooks';
import Spiner from '../Spinner/Spiner';

export default function FormLoginSingUp(props: Props): JSX.Element {
  const { isLogin, setLoadedImage } = props;
  const [loading, setLoading] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
      onSubmit={(values) => {
        setLoading(!loading);
        setTimeout(() => {
          dispatch(
            login({
              name: 'carlos',
              accesToken: 'ff',
              typeUser: 'user'
            })
          );
        }, 2000);
      }}
    >
      {({ handleChange, handleSubmit, errors, values, touched }) => (
        <div className="block lg:flex 2xl:mt-20 2xl:mb-28 lg:justify-center py-4">
          <div className="w-full lg:w-3/6 xl:w-3/6 px-4 pt-4 lg:pt-0 mt-8 lg:mt-3 xl:mt-0">
            <img
              src={JYMLOGO}
              alt="JYMLOGO"
              className="m-auto w-60"
              onLoad={() => setLoadedImage(true)}
            />
            <form
              onSubmit={handleSubmit}
              className={`p-4 flex ${
                isLogin ? 'flex-col ' : 'flex-row flex-wrap gap-2'
              } justify-center items-center`}
            >
              {isLogin ? (
                <>
                  {/* Login */}
                  <FormLogin
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                </>
              ) : (
                <>
                  {/* Registro */}
                  <FormSignUp
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                </>
              )}
              <button
                type="submit"
                className="w-4/6  lg:w-full xl:w-11/12 mt-8 p-2 border rounded-md bg-blue-400 font-medium text-white transition-all duration-300"
                style={{
                  WebkitTapHighlightColor: 'rgb(0,0,0,0)'
                }}
              >
                {!loading ? isLogin ? 'Entrar' : 'Registrarse' : <Spiner />}
              </button>
              <div className="w-full lg:w-11/12 flex justify-center lg:justify-end  mt-3">
                <p className="mr-2">
                  {isLogin ? '¿Aun no tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                </p>
                <Link
                  to={`/${isLogin ? 'signUp' : 'login'}`}
                  className="underline hover:text-blue-400 transition-colors ease-out duration-300 "
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
