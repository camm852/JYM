export default function FormSignUp({ handleChange, values, errors, touched }: any): JSX.Element {
  return (
    <>
      <div className="w-full text-center">
        <h2 className="font-semibold">Registra tu cuenta para continuar</h2>
      </div>
      <div className="w-4/6 lg:w-5/12 py-2">
        <input
          type="text"
          name="name"
          id="name"
          value={values.name}
          className={`w-full text-slate-700  border-b border-gray-300 focus:outline-none  focus:border-blue-400 bg-transparent  ${
            errors.name && touched.name ? 'border-b-red-600' : ''
          } `}
          placeholder="Nombres"
          onChange={handleChange}
        />
      </div>
      <div className="w-4/6 lg:w-6/12 py-2">
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={values.lastname}
          className={`w-full  border-b text-slate-700 border-gray-300   focus:outline-none  focus:border-blue-400 bg-transparent  ${
            errors.lastname && touched.lastname ? 'border-b-red-600' : ''
          } `}
          placeholder="Apellidos"
          onChange={handleChange}
        />
      </div>
      <div className="w-4/6 lg:w-4/12 py-2">
        <input
          type="text"
          name="phone"
          id="phone"
          value={values.phone}
          className={`w-full border-b text-slate-700 border-gray-300  focus:outline-none  focus:border-blue-400 bg-transparent  ${
            errors.phone && touched.phone ? 'border-b-red-600' : ''
          } `}
          placeholder="Número de Teléfono"
          onChange={handleChange}
        />
      </div>
      <div className="w-4/6 lg:w-7/12 py-2">
        <input
          type="text"
          name="email"
          id="email"
          value={values.email}
          className={`w-full border-b  text-slate-700 border-gray-300  focus:outline-none  focus:border-blue-400 bg-transparent  ${
            errors.email && touched.email ? 'border-b-red-600' : ''
          } `}
          placeholder="Dirección de email"
          onChange={handleChange}
        />
      </div>
      <div className="w-4/6  lg:w-5/12 py-2">
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          className={`w-full   text-slate-700 border-b border-gray-300  focus:outline-none  focus:border-blue-400 bg-transparent  ${
            errors.password && touched.password ? 'border-b-red-600 mt-1' : ''
          } `}
          placeholder="Contraseña"
          onChange={handleChange}
        />
      </div>
      <div className="w-4/6  lg:w-6/12 py-2">
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={values.confirmPassword}
          className={`w-full text-slate-700  border-b border-gray-300   focus:outline-none  focus:border-blue-400 bg-transparent  ${
            errors.confirmPassword && touched.confirmPassword ? 'border-b-red-600 mt-1' : ''
          } `}
          placeholder="Confirmar contraseña"
          onChange={handleChange}
        />
      </div>
    </>
  );
}
