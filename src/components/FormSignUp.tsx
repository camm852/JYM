export default function FormSignUp({ handleChange, values, errors, touched }: any): JSX.Element {
  return (
    <>
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
            errors.confirmPassword && touched.confirmPassword ? 'border-b-red-600 mt-1' : ''
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
  );
}
