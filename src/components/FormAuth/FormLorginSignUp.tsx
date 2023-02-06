import React from 'react';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { JYMLOGO } from '../../assets/assests';
import FormLogin from './FormLogin';
import FormSignUp from './FormSignUp';
import { IPropsLogin as Props } from '../../vite-env';
import apiUrl from '../../utils/baseUrl';
import { useAppDispatch } from '../../redux/store/Hooks';
import Spiner from '../Spinner/Spiner';
import Toast from '../Toast';
import { login } from '../../redux/slices/UserSlice';

export default function FormLoginSingUp(props: Props): JSX.Element {
  const { isLogin, setLoadedImage } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openToast, setOpenToast] = React.useState<boolean>(false);
  const [error, setError] = React.useState<{
    error: boolean;
    message: string;
    textToast: string;
  }>({
    error: false,
    message: '',
    textToast: ''
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const userLogin = async (values: { email?: string; password?: string }) => {
    try {
      const response = await apiUrl.post('/login/', values);

      setError({
        error: false,
        message: '',
        textToast: 'Login exitoso'
      });

      setOpenToast(true);

      setTimeout(() => {
        setLoading(false);
        dispatch(login(response.data));
      }, 2000);
    } catch (e: any) {
      if (e?.code === 'ERR_BAD_REQUEST') {
        setError({
          error: true,
          message: e.response.data.message,
          textToast: 'Login fallido'
        });
        setOpenToast(true);
      }
      if (e?.code === 'ERR_NETWORK') {
        setError({
          error: true,
          message: 'Servidor no disponible',
          textToast: 'Login fallido'
        });
      }
      setLoading(false);
    }
  };

  const userSingUp = async (values: {
    name: string;
    email: string;
    phone: string;
    lastname: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await apiUrl.post('/usuario/', values);
      console.log(response);

      setError({
        error: false,
        message: '',
        textToast: 'Registro Exitoso'
      });

      setOpenToast(true);

      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 2000);
    } catch (e: any) {
      console.log(e);
      if (e?.code === 'ERR_BAD_REQUEST' && e.response.data.message) {
        setError({
          error: true,
          message: e.response.data.message,
          textToast: 'Registro fallido'
        });
      }
      if (e?.code === 'ERR_BAD_REQUEST' && !e.response?.data?.message) {
        setError({
          error: true,
          message: '',
          textToast: 'Registro fallido'
        });
      }
      if (e?.code === 'ERR_NETWORK') {
        setError({
          error: true,
          message: 'Servidor no disponible',
          textToast: 'Registro fallido'
        });
      }
      setOpenToast(true);
      setLoading(false);
    }
  };

  const schema = isLogin
    ? Yup.object().shape({
        email: Yup.string()
          .required('Escribe un email')
          .email('Un email valido'),
        password: Yup.string().required('Escribe una contraseña')
      })
    : Yup.object().shape({
        name: Yup.string()
          .required('Escribe tu nombre')
          .min(10, 'Minimo 8 caracteres')
          .max(20, 'Máximo 20 caracteres'),
        lastname: Yup.string()
          .required('Escribe tu nombre')
          .min(10, 'Minimo 8 caracteres')
          .max(20, 'Máximo 20 caracteres'),
        phone: Yup.string()
          .phone('CO', 'Introduce un número correcto')
          .required('Número de Teléfono'),
        email: Yup.string()
          .required('Escribe un email')
          .email('Un email valido'),
        password: Yup.string().required('Escribe una contraseña'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
          .required('Las contraseñas no coinciden')
      });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        lastname: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        setLoading(true);
        setError({
          error: false,
          message: '',
          textToast: ''
        });
        if (!isLogin) await userSingUp(values);
        else {
          await userLogin({ email: values.email, password: values.password });
        }
      }}
    >
      {({ handleChange, handleSubmit, errors, values, touched }) => (
        <>
          <div className="block lg:flex 2xl:mt-20 2xl:mb-28 lg:justify-center py-4">
            <div className="w-full lg:w-3/6 xl:w-3/6 px-4 pt-4 lg:pt-0 mt-8 lg:mt-3 xl:mt-0">
              <img
                src={JYMLOGO}
                alt="JYMLOGO"
                className="m-auto w-60"
                onLoad={() => setLoadedImage(true)}
              />
              {error.error && error.message && (
                <div className="bg-red-500 p-2 mx-auto w-1/2 rounded-md text-white text-center">
                  {error.message}
                </div>
              )}
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
                    {isLogin
                      ? '¿Aun no tienes una cuenta?'
                      : '¿Ya tienes una cuenta?'}
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
          <div
            className={`fixed  ${
              !openToast ? '-right-full' : 'right-8'
            } bottom-1 transition-all duration-150 ease-in-out z-50`}
          >
            {error.error ? (
              <Toast
                openToast={setOpenToast}
                stateToast={openToast}
                error
                text={error.textToast}
              />
            ) : (
              <Toast
                openToast={setOpenToast}
                stateToast={openToast}
                text={error.textToast}
              />
            )}
          </div>
        </>
      )}
    </Formik>
  );
}
