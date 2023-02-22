export default function FormLogin({
  handleChange,
  values,
  errors,
  touched
}: any): JSX.Element {
  return (
    <>
      <h2 className="font-semibold">Entra a tu cuenta para continuar</h2>
      <div className="w-4/6 lg:w-full xl:w-11/12">
        <input
          type="text"
          name="email"
          id="email"
          value={values.email}
          className={`w-full text-slate-700 border-b border-gray-300 mt-8 focus:outline-none  focus:border-blue-400 bg-transparent ${
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
          className={`w-full text-slate-700  border-b border-gray-300  mt-4  focus:outline-none focus:border-blue-400 bg-transparent ${
            errors.password && touched.password ? 'border-b-red-600 mt-1' : ''
          } `}
          placeholder="contraseña"
          onChange={handleChange}
        />
        {errors.password && touched.password ? (
          <div className="w-full sm:w-2/3 lg:w-full text-left  pt-2 text-red-500">
            {errors.password}
          </div>
        ) : null}
      </div>
    </>
  );
}
