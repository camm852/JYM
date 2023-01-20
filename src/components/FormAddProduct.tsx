import React from 'react';
import { Tab } from '@headlessui/react';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { IFormProduct, IOptionType, IErrorFormProduct } from '../vite-env';
import apiUrl from '../utils/baseUrl';
import { optionsCategories, optionsColors, optionsSizes } from '../utils/optionsSelect';

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ');
}

export default function FormAddProduct(): JSX.Element {
  const [selectedFile, setSelectedFile] = React.useState<Blob | MediaSource | undefined>(undefined);
  const [preview, setPreview] = React.useState<string>();
  const [index, setIndex] = React.useState<number>(0);
  const [form, setForm] = React.useState<IFormProduct>({
    name: '',
    slug: '',
    price: 0,
    gender: '',
    colors: [],
    sizes: [],
    categories: [],
    type: 'bag'
  });

  const [error, setError] = React.useState<IErrorFormProduct>({
    name: false,
    slug: false,
    price: false,
    image: false,
    size: false,
    category: false,
    gender: false
  });

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);

      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  React.useEffect(() => {
    const slug = form.name.toLowerCase().split(' ').join('-');
    setForm({ ...form, slug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<undefined> => {
    e.preventDefault();

    setError({
      name: form.name.length === 0 ?? false,
      slug: form.slug.length === 0 ?? false,
      price: form.price === 0 ?? false,
      gender: form.gender.length === 0 ?? false,
      image: selectedFile === undefined ?? false,
      size: (index > 0 && form.sizes.length === 0) ?? false,
      category: form.categories.length === 0 ?? false
    });

    const existError = Object.values(error).map((value) => value || false);

    if (existError.includes(true)) return undefined;

    console.log(form);
    console.log(selectedFile);

    // const response = await apiUrl.post('/', {
    //   headers: {
    //     // Authorization: `Bearer ${user.token}`
    //   }
    // });

    // if (response.status === 200) {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    // }

    return undefined;
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const resetInitialState = (selectIndex: number): void => {
    setForm({
      ...form,
      colors: [],
      sizes: [],
      type: selectIndex === 0 ? 'bag' : 'clothes'
    });
  };

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSizeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!form.sizes.includes(e.target.name)) {
      setForm({ ...form, sizes: [...form.sizes, e.target.name] });
      return;
    }
    const newSizes = form.sizes.filter((size) => size !== e.target.name);
    setForm({ ...form, sizes: newSizes });
  };

  const handleSizeSelect = (e: readonly IOptionType[]): void => {
    const sizes: Array<string> = e.map((size) => size.value);
    setForm({ ...form, sizes });
  };

  const handleColor = (e: readonly IOptionType[]): void => {
    const colors: Array<string> = e.map((color) => color.value);
    setForm({ ...form, colors });
  };

  const handleCategory = (e: readonly IOptionType[]): void => {
    const categories: Array<string> = e.map((category) => category.value);
    setForm({ ...form, categories });
  };

  const handleGender = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, gender: e.target.name });
  };

  const categories = ['Bolsos', 'Camisetas Blusas Vestidos', 'Jeanes Leggins Shorts'];

  const sizeClothingTop = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  //* *Style Select */

  const animateSelect = makeAnimated();

  const colourStyle: StylesConfig<IOptionType, true> = {
    multiValueLabel: (styles) => ({
      ...styles,
      color: '#fff',
      backgroundColor: '#0ea5e9',
      padding: '3px 8px'
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: '#fff',
      ':hover': {
        backgroundColor: '#000',
        color: 'white'
      }
    })
  };

  return (
    <div className="flex flex-row flex-wrap lg:flex-nowrap bg-gray-50">
      <div className="lg:w-2/3 p-5">
        <h2 className="text-2xl font-semibold">Información del Producto</h2>
        <form className="pt-5" onSubmit={handleSubmit}>
          <div className="mb-2 flex flex-wrap gap-1">
            {/* */}
            {/* Inputs Text */}
            <div className="w-full sm:w-2/5">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                autoComplete="off"
                className={`p-2 outline-none bg-slate-200 rounded-md w-full  focus:bg-slate-100 ${
                  error.name ? 'border border-red-400' : 'border-none'
                }`}
                onChange={handleForm}
              />
              {error.name && <span className="text-red-400 text-sm">El nombre es obligatorio</span>}
            </div>
            <div className="w-full sm:w-2/6">
              <input
                type="text"
                name="slug"
                value={form.slug}
                placeholder="Slug"
                autoComplete="off"
                disabled
                className={`p-2 outline-none bg-slate-200 rounded-md w-full  focus:bg-slate-100 ${
                  error.slug ? 'border border-red-400' : 'border-none'
                }`}
                onChange={handleForm}
              />
              {error.slug && <span className="text-red-400 text-sm">El slug es obligatorio</span>}
            </div>
            <div className="w-full sm:w-3/12">
              <input
                type="text"
                name="price"
                placeholder="Precio"
                autoComplete="off"
                className={`p-2 outline-none bg-slate-200 rounded-md w-full  focus:bg-slate-100 ${
                  error.price ? 'border border-red-400' : 'border-none'
                }`}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={handleForm}
              />
              {error.price && (
                <span className="text-red-400 text-sm">El precio es obligatorio</span>
              )}
            </div>

            {/* Bolzos, camisetas, vestidos, etc */}
            <div className="w-full">
              <div className="w-full max-w-xl px-2 sm:px-0">
                <h3 className="mt-4 mb-3 font-semibold text-xl">Información Adicional</h3>
                <Tab.Group
                  onChange={(selectedIndex) => {
                    setIndex(selectedIndex);
                    resetInitialState(selectedIndex);
                  }}
                >
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {categories.map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue- 700',
                            selected
                              ? 'bg-white shadow text-blue-500'
                              : 'text-blue-50 hover:bg-white/[0.12] hover:text-white'
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                  <div className="mt-2">
                    {index === 0 && (
                      <>
                        <h3 className="mt-4 mb-3 font-semibold text-lg">Colores del bolzo</h3>
                        <Select
                          placeholder="Elige los Colores..."
                          isMulti
                          options={optionsColors}
                          components={animateSelect}
                          styles={colourStyle}
                          onChange={handleColor}
                        />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <h3 className="mt-4 mb-3 font-semibold text-lg">Tallas de la Prenda</h3>

                        <ul className="items-center w-full text-sm font-medium  bg-slate-200 rounded-xl border-gray-200 sm:flex text-gray-400">
                          {sizeClothingTop.map((size, i) => (
                            <li
                              key={i}
                              className="w-full border-b border-white sm:border-b-0 sm:border-r "
                            >
                              <div className="flex items-center pl-3">
                                <input
                                  type="checkbox"
                                  className="w-5 h-4 appearance-none bg-white border border-white rounded-lg checked:border-sky-400 checked:bg-sky-500"
                                  onChange={handleSizeInput}
                                  name={size}
                                  id={size}
                                />
                                <label
                                  htmlFor={size}
                                  className="py-3 ml-2 w-full text-sm font-medium"
                                >
                                  {size}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                        {error.size && (
                          <span className="text-red-400 text-sm">Al menos una talla</span>
                        )}
                        <h3 className="mt-4 mb-3 font-semibold text-lg">Colores de la Prenda</h3>
                        <Select
                          placeholder="Elige los Colores..."
                          isMulti
                          options={optionsColors}
                          components={animateSelect}
                          styles={colourStyle}
                          onChange={handleColor}
                        />
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <h3 className="mt-4 mb-3 font-semibold text-lg">Tallas de la Prenda</h3>
                        <Select
                          placeholder="Elige las tallas..."
                          isMulti
                          options={optionsSizes}
                          components={animateSelect}
                          styles={colourStyle}
                          onChange={handleSizeSelect}
                        />
                        {error.size && (
                          <span className="text-red-400 text-sm">Al menos una talla</span>
                        )}
                        <h3 className="mt-4 mb-3 font-semibold text-lg">Colores de la Prenda</h3>
                        <Select
                          placeholder="Elige los Colores..."
                          isMulti
                          options={optionsColors}
                          components={animateSelect}
                          styles={colourStyle}
                          onChange={handleColor}
                        />
                      </>
                    )}
                  </div>
                </Tab.Group>
              </div>
            </div>
          </div>

          {/* Genero */}
          <div>
            <h3 className="mt-4 mb-3 font-semibold text-lg">Género</h3>
            <ul className="items-center max-w-lg text-sm font-medium  bg-slate-200 rounded-xl border-gray-200 sm:flex text-gray-400">
              <li className="w-full border-b border-white sm:border-b-0 sm:border-r ">
                <div className="flex items-center pl-3">
                  <input
                    type="checkbox"
                    className="w-5 h-4 appearance-none bg-white border border-white rounded-lg checked:border-sky-400 checked:bg-sky-500"
                    checked={form.gender === 'male'}
                    name="male"
                    id="male"
                    onChange={handleGender}
                  />
                  <label htmlFor="male" className="py-3 ml-2 w-full text-sm font-medium">
                    Masculino
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-white sm:border-b-0 sm:border-r ">
                <div className="flex items-center pl-3">
                  <input
                    type="checkbox"
                    className="w-5 h-4 appearance-none bg-white border border-white rounded-lg checked:border-sky-400 checked:bg-sky-500"
                    checked={form.gender === 'female'}
                    name="female"
                    id="female"
                    onChange={handleGender}
                  />
                  <label htmlFor="female" className="py-3 ml-2 w-full text-sm font-medium">
                    Fememino
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-white sm:border-b-0 sm:border-r ">
                <div className="flex items-center pl-3">
                  <input
                    type="checkbox"
                    className="w-5 h-4 appearance-none bg-white border border-white rounded-lg checked:border-sky-400 checked:bg-sky-500"
                    checked={form.gender === 'unisex'}
                    name="unisex"
                    id="unisex"
                    onChange={handleGender}
                  />
                  <label htmlFor="unisex" className="py-3 ml-2 w-full text-sm font-medium">
                    Unisex
                  </label>
                </div>
              </li>
            </ul>
            {error.gender && (
              <span className="text-red-400 text-sm">Tienes que elegir un género</span>
            )}
          </div>
          <div className="w-full max-w-xl px-2 sm:px-0">
            <h3 className="mt-4 mb-3 font-semibold text-lg">Categorias</h3>
            <Select
              placeholder="Elige las categorias..."
              isMulti
              options={optionsCategories}
              components={animateSelect}
              styles={colourStyle}
              onChange={handleCategory}
            />
            {error.category && <span className="text-red-400 text-sm">Al menos una categoria</span>}
          </div>

          {/* Imagen */}
          <h3 className="mt-4 mb-3 font-semibold text-lg">Imagen del producto</h3>
          <div className="flex flex-wrap items-center justify-center w-full">
            <div className="w-full md:w-1/2 lg:w-full">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-56 border-2  border-dashed rounded-lg cursor-pointer bg-slate-200 hover:bg-slate-300 hover:border-slate-500 ${
                  error.image ? 'border-red-400' : 'border-slate-300'
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-4 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click para subir</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={onSelectFile}
                  accept="image/*"
                />
              </label>
              {error.image && (
                <span className="text-red-400 text-sm">La imagen es obligatoria</span>
              )}
            </div>
            <div className="w-full  md:w-1/2 lg:hidden ">
              {preview ? (
                <div className="h-full p-4 flex lg:p-0">
                  <img src={preview} alt="producto" className="" />
                </div>
              ) : (
                <div className="h-20 lg:h-full flex justify-center items-center">
                  <p>Imagen aún no cargada</p>
                </div>
              )}
            </div>
          </div>
          <button className="w-full p-2 bg-sky-500 rounded-md mt-2 text-white" type="submit">
            Agregar
          </button>
        </form>
      </div>
      <div className="w-full lg:w-1/3 hidden lg:block">
        {preview ? (
          <div className="h-full p-4 flex justify-center items-center lg:p-0">
            <img src={preview} alt="producto" className="w-60 h-64" />
          </div>
        ) : (
          <div className="h-20 lg:h-full flex justify-center items-center">
            <p>Imagen aún no cargada</p>
          </div>
        )}
      </div>
    </div>
  );
}
