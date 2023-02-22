import React from 'react';
import makeAnimated from 'react-select/animated';
import Select, { StylesConfig } from 'react-select';
import { Tab } from '@headlessui/react';
import apiUrl from '../utils/api';
import {
  IFormProduct,
  IOptionType,
  IErrorFormProduct,
  TProductTable
} from '../vite-env';
import {
  categoriesTap,
  optionsCategories,
  optionsColors,
  optionsSizes,
  sizeClothingTop
} from '../utils/optionsSelect';
import { useAppSelector } from '../redux/store/Hooks';
import Spiner from './SpinnerCircle/SpinerCircle';

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ');
}

interface IMessageToast {
  error: boolean;
  message: string;
}

interface IPropsFormProduct {
  setOpenToast: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageToast: React.Dispatch<React.SetStateAction<IMessageToast>>;
  product?: TProductTable;
}

export default function FormProduct({
  setOpenToast,
  setMessageToast,
  product
}: IPropsFormProduct): JSX.Element {
  const [selectedFile, setSelectedFile] = React.useState<Blob>();
  const [preview, setPreview] = React.useState<string>();
  const [index, setIndex] = React.useState<number>(
    product?.type === 'bag' ? 0 : product?.type === 'topWear' ? 1 : 2
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const [colors, setColors] = React.useState<IOptionType[]>([]);
  const [categories, setCategories] = React.useState<IOptionType[]>([]);
  const [sizes, setSizes] = React.useState<IOptionType[]>([]);

  const [form, setForm] = React.useState<IFormProduct>({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    price: product?.price ?? 0,
    gender: product?.gender ?? '',
    description: product?.description ?? '',
    colors: product?.colors ?? [],
    sizes: product?.sizes ?? [],
    categories: product?.categories ?? [],
    type: product?.type ?? 'bag'
  });

  const [error, setError] = React.useState<IErrorFormProduct>({
    name: false,
    slug: false,
    price: false,
    image: false,
    size: false,
    category: false,
    gender: false,
    colors: false
  });

  const { accessToken } = useAppSelector((state) => state.user);

  // Preview image
  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return undefined;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // Slug
  React.useEffect(() => {
    const slug = form.name.toLowerCase().split(' ').join('-');
    setForm({ ...form, slug });
  }, [form.name]);

  // Submit Product
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<null> => {
    e.preventDefault();
    setLoading(true);

    const errors: IErrorFormProduct = {
      name: form.name.length === 0 ?? false,
      slug: form.slug.length === 0 ?? false,
      price: form.price === 0 ?? false,
      gender: form.gender.length === 0 ?? false,
      image: (selectedFile === undefined && !product?.image) ?? false,
      size: (index > 0 && form.sizes.length === 0) ?? false,
      category: form.categories.length === 0 ?? false,
      colors: form.colors.length === 0 ?? false
    };

    const existError = Object.values(errors).map((value) => value || false);
    setError(errors);
    if (existError.includes(true)) {
      setOpenToast(true);
      setMessageToast({
        error: true,
        message: 'Faltam campos'
      });
      setLoading(false);
      return null;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('slug', form.slug);
    formData.append('price', `${form.price}`);
    formData.append('gender', form.gender);
    formData.append('description', form.description);
    formData.append('sizes', form.sizes.join('-'));
    formData.append('colors', form.colors.join('-'));
    formData.append('categories', form.categories.join('-'));
    formData.append('type', form.type);

    if ((!product?.image && preview) || (product?.image && preview)) {
      formData.append('file', selectedFile ?? '');
    }

    try {
      if (product?.id === 0) {
        await apiUrl.post('/producto/', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setMessageToast({ error: false, message: 'Agregado correctamente' });
      } else {
        await apiUrl.put(`/producto/${product?.id}/`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setMessageToast({ error: false, message: 'Actualizado correctamente' });
      }
      setOpenToast(true);
      setLoading(false);
      setTimeout(() => window.location.reload(), 1500);
    } catch (errorResponse: any) {
      console.log(errorResponse);
      if (errorResponse?.code === 'ERR_BAD_REQUEST') {
        setMessageToast({
          error: true,
          message: 'Ya existe el producto'
        });
      }
      if (errorResponse?.code === 'ERR_NETWORK') {
        setMessageToast({
          error: true,
          message: 'Servidor no disponible'
        });
      }
      setLoading(false);
      setOpenToast(true);
      setLoading(false);
    }
    return null;
  };

  // change image
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  // reset state type product
  const resetInitialState = (selectIndex: number): void => {
    setForm({
      ...form,
      colors: [],
      sizes: [],
      type:
        selectIndex === 0 ? 'bag' : selectIndex === 1 ? 'topWear' : 'downWear'
    });
  };

  // change mayority properties of the form
  const handleForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    if (e.target.name !== 'price') {
      setForm({ ...form, [e.target.name]: e.target.value });
    } else setForm({ ...form, [e.target.name]: +e.target.value });
  };

  // change sizes product
  const handleSizeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!form.sizes.includes(e.target.name)) {
      setForm({ ...form, sizes: [...form.sizes, e.target.name] });
      return;
    }
    const newSizes = form.sizes.filter((size) => size !== e.target.name);
    setForm({ ...form, sizes: newSizes });
  };

  // change sizes product react-select
  const handleSizeSelect = (e: readonly IOptionType[]): void => {
    const sizesToState: IOptionType[] = e.map((size) => ({
      label: size.label,
      value: size.value
    }));
    const sizesToForm: Array<string> = e.map((size) => size.value);
    setSizes(sizesToState);
    setForm({ ...form, sizes: sizesToForm });
  };

  // change color
  const handleColor = (e: readonly IOptionType[]): void => {
    const colorsToForm: Array<string> = e.map((color) => color.value);
    const colorsToState: IOptionType[] = e.map((color) => ({
      label: color.label,
      value: color.value
    }));
    setColors(colorsToState);
    setForm({ ...form, colors: colorsToForm });
  };

  // change categories
  const handleCategory = (e: readonly IOptionType[]): void => {
    const categoriesToForm: Array<string> = e.map((category) => category.value);
    const categoriesToState: IOptionType[] = e.map((color) => ({
      label: color.label,
      value: color.value
    }));
    setCategories(categoriesToState);
    setForm({ ...form, categories: categoriesToForm });
  };

  // chage gender
  const handleGender = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, gender: e.target.name });
  };

  const colorsFromTable: IOptionType[] | null =
    form.colors.length === 0
      ? null
      : form.colors.map((color) => ({
          value: color,
          label: color.charAt(0).toUpperCase() + color.slice(1)
        }));

  const categoriesFromTable: IOptionType[] | null =
    form.categories.length === 0
      ? null
      : form.categories.map((category) => ({
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1)
        }));

  const sizesFromTable: IOptionType[] | null =
    form.sizes.length === 0
      ? null
      : form.sizes.map((category) => ({
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1)
        }));

  // Style Select
  const animateSelect = makeAnimated();

  const colourStyle: StylesConfig<IOptionType, true> = {
    multiValueLabel: (styles) => ({
      ...styles,
      color: '#fff',
      textOverflow: 'v',
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
      <div className="lg:w-full p-5">
        <h2 className="text-2xl font-semibold">Información del Producto</h2>
        <form className="pt-5" onSubmit={handleSubmit}>
          <div className="mb-2 flex flex-wrap gap-1">
            {/* Inputs Text */}
            <div className="w-full sm:w-4/12">
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Nombre"
                autoComplete="off"
                className={`p-2 outline-none bg-slate-200 rounded-md w-full  focus:bg-slate-100 ${
                  error.name ? 'border border-red-400' : 'border-none'
                }`}
                onChange={handleForm}
              />
              {error.name && (
                <span className="text-red-400 text-sm">
                  El nombre es obligatorio
                </span>
              )}
            </div>
            <div className="w-full sm:w-4/12">
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
              {error.slug && (
                <span className="text-red-400 text-sm">
                  El slug es obligatorio
                </span>
              )}
            </div>
            <div className="w-full sm:w-3/12">
              <input
                type="text"
                name="price"
                value={form.price}
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
                <span className="text-red-400 text-sm">
                  El precio es obligatorio
                </span>
              )}
            </div>

            {/* Bolzos, camisetas, vestidos, etc */}
            <div className="w-full">
              <div className="w-full px-2 sm:px-0">
                <h3 className="mt-4 mb-3 font-semibold text-xl">
                  Información Adicional
                </h3>
                <Tab.Group
                  onChange={(selectedIndex) => {
                    setIndex(selectedIndex);
                    resetInitialState(selectedIndex);
                  }}
                  selectedIndex={
                    form.type === 'bag' ? 0 : form.type === 'topWear' ? 1 : 2
                  }
                >
                  {/* Tap to change type product */}
                  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {categoriesTap.map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 outline-none',
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

                  {/* Bag */}
                  <div className="mt-2">
                    {index === 0 && (
                      <>
                        <h3 className="mt-4 mb-3 font-semibold text-lg">
                          Colores del bolzo
                        </h3>
                        <Select
                          placeholder="Elige los Colores..."
                          isMulti
                          value={
                            form.colors.length === 0 ? colors : colorsFromTable
                          } // if is edit product
                          options={optionsColors}
                          components={animateSelect}
                          styles={colourStyle}
                          onChange={handleColor}
                        />
                        {error.colors && (
                          <span className="text-red-400 text-sm">
                            Al menos un color
                          </span>
                        )}
                      </>
                    )}

                    {/* Top wear */}
                    {index === 1 && (
                      <>
                        <h3 className="mt-4 mb-3 font-semibold text-lg">
                          Tallas de la Prenda
                        </h3>

                        <ul className="items-center w-full text-sm font-medium  bg-slate-200 rounded-xl border-gray-200 sm:flex text-gray-400">
                          {sizeClothingTop.map((size, i) => (
                            <li
                              key={i}
                              className="w-full border-b border-white sm:border-b-0 sm:border-r "
                            >
                              <div className="flex items-center pl-3">
                                <input
                                  type="checkbox"
                                  checked={form.sizes.includes(size)}
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
                          <span className="text-red-400 text-sm">
                            Al menos una talla
                          </span>
                        )}
                        <h3 className="mt-4 mb-3 font-semibold text-lg">
                          Colores de la Prenda
                        </h3>
                        <Select
                          placeholder="Elige los Colores..."
                          isMulti
                          value={
                            form.colors.length === 0 ? colors : colorsFromTable
                          } // if is edit product
                          options={optionsColors}
                          components={animateSelect}
                          styles={colourStyle}
                          onChange={handleColor}
                        />
                      </>
                    )}

                    {/* Down Wear */}
                    {index === 2 && (
                      <>
                        <h3 className="mt-4 mb-3 font-semibold text-lg">
                          Tallas de la Prenda
                        </h3>
                        <Select
                          placeholder="Elige las tallas..."
                          isMulti
                          value={
                            form.sizes.length === 0 ? sizes : sizesFromTable
                          } // if is edit product
                          options={optionsSizes}
                          components={animateSelect}
                          styles={colourStyle}
                          onChange={handleSizeSelect}
                        />
                        {error.size && (
                          <span className="text-red-400 text-sm">
                            Al menos una talla
                          </span>
                        )}
                        <h3 className="mt-4 mb-3 font-semibold text-lg">
                          Colores de la Prenda
                        </h3>
                        <Select
                          placeholder="Elige los Colores..."
                          isMulti
                          value={
                            form.colors.length === 0 ? colors : colorsFromTable
                          } // if is edit product
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

          {/* Gender  */}
          <div>
            <h3 className="mt-4 mb-3 font-semibold text-lg">Género</h3>
            <ul className="items-center w-full text-sm font-medium  bg-slate-200 rounded-xl border-gray-200 sm:flex text-gray-400">
              <li className="w-full border-b border-white sm:border-b-0 sm:border-r ">
                <div className="flex items-center pl-3">
                  <input
                    type="checkbox"
                    className="w-5 h-4 appearance-none bg-white border border-white rounded-lg checked:border-sky-400 checked:bg-sky-500"
                    checked={form.gender === 'men'}
                    name="men"
                    id="men"
                    onChange={handleGender}
                  />
                  <label
                    htmlFor="men"
                    className="py-3 ml-2 w-full text-sm font-medium"
                  >
                    Masculino
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-white sm:border-b-0 sm:border-r ">
                <div className="flex items-center pl-3">
                  <input
                    type="checkbox"
                    className="w-5 h-4 appearance-none bg-white border border-white rounded-lg checked:border-sky-400 checked:bg-sky-500"
                    checked={form.gender === 'women'}
                    name="women"
                    id="women"
                    onChange={handleGender}
                  />
                  <label
                    htmlFor="women"
                    className="py-3 ml-2 w-full text-sm font-medium"
                  >
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
                  <label
                    htmlFor="unisex"
                    className="py-3 ml-2 w-full text-sm font-medium"
                  >
                    Unisex
                  </label>
                </div>
              </li>
            </ul>
            {error.gender && (
              <span className="text-red-400 text-sm">
                Tienes que elegir un género
              </span>
            )}
          </div>

          {/* Categorias */}
          <div className="w-full px-2 sm:px-0">
            <h3 className="mt-4 mb-3 font-semibold text-lg">Categorias</h3>
            <Select
              placeholder="Elige las categorias..."
              isMulti
              value={
                form.categories.length === 0 ? categories : categoriesFromTable
              } // if is edit product
              options={optionsCategories}
              components={animateSelect}
              styles={colourStyle}
              onChange={handleCategory}
            />
            {error.category && (
              <span className="text-red-400 text-sm">
                Al menos una categoria
              </span>
            )}
          </div>

          {/* Descripcion  */}
          <div className="max-w-md">
            <h3 className="mt-4 mb-3 font-semibold text-lg">Descripción</h3>
            <textarea
              id="message"
              rows={1}
              name="description"
              value={form.description}
              onChange={handleForm}
              className="resize-none block p-2.5 w-full text-sm text-gray-900 border bg-gray-50 rounded-lg  border-gray-300  focus:outline-sky-600 "
              placeholder="Escribe la descripción del producto...."
            />
          </div>

          {/* Imagen */}
          <h3 className="mt-4 mb-3 font-semibold text-lg">
            Imagen del producto
          </h3>
          <div className="flex flex-wrap items-center justify-center w-full">
            <div className="w-full md:w-1/2">
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG
                  </p>
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
                <span className="text-red-400 text-sm">
                  La imagen es obligatoria
                </span>
              )}
            </div>
            <div className="w-full  md:w-1/2 flex justify-center">
              {preview || product?.image ? (
                <div className="h-full w-full p-4 flex justify-center">
                  <img
                    src={preview ?? product?.image}
                    alt="producto"
                    className=" h-56 w-56 rounded-md"
                  />
                </div>
              ) : (
                <div className="h-20 lg:h-full flex justify-center items-center">
                  <p>Imagen aún no cargada</p>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 p-2 border rounded-md bg-blue-400 font-medium text-white transition-all duration-300"
            style={{
              WebkitTapHighlightColor: 'rgb(0,0,0,0)'
            }}
          >
            {!loading ? 'Agregar producto' : <Spiner />}
          </button>
        </form>
      </div>
    </div>
  );
}

FormProduct.defaultProps = {
  product: {
    id: 0,
    name: '',
    slug: '',
    description: '',
    image: '',
    categories: [],
    sizes: [],
    colors: [],
    type: 'bag',
    state: true,
    price: 0,
    gender: ''
  }
};
