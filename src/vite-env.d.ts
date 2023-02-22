import React from 'react';
/// <reference types="vite/client" />

export interface IPropsCarousel {
  images: string[];
  showButtons?: boolean;
  autoPlay?: boolean;
}

export interface IPropsButtonMenu {
  setNavBar: React.Dispatch<React.SetStateAction<boolean>>;
  navBar: boolean;
}

export interface IPropsCardProduct {
  product: TProductTable;
}

export interface IPropsCarouseProducts {
  products: TProductTable[];
}

export interface ILinksNavBar {
  title: string;
  subMenu: {
    id: number;
    to: string;
    name: string;
  }[];
}

export interface IPropsNavBar {
  openNavBar: boolean;
  setNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPropsLogin {
  isLogin: boolean;
  setLoadedImage: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPropsIcons {
  className: string;
}

export interface IPropsCart {
  activeCart: boolean;
  products: CartProduct[];
}

export interface ICartProduct {
  image: string;
  name: string;
  price: number;
  description: string;
  mount: number;
  color: string;
  size: string;
  id: number;
}

export interface IPropsCartProduct {
  indexProduct: number;
  product: ICartProduct;
}

export interface IFormProduct {
  name: string;
  slug: string;
  price: number;
  gender: string;
  description: string;
  colors: string[];
  sizes: string[];
  categories: string[];
  type: string;
}

export type TProductTable = IFormProduct & {
  image: string;
  state: bool;
  id: number;
};

export interface IErrorFormProduct {
  name: boolean;
  slug: boolean;
  price: boolean;
  image: boolean;
  size: boolean;
  category: boolean;
  gender: boolean;
  colors: boolean;
}

export interface IPropsToast {
  error?: boolean;
  text: string;
  stateToast: boolean;
  openToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormCheckout {
  buyerEmail: string;
  buyerFullName: string;
  shippingAddress: string;
  shippingCity: string;
  payerPhone: string;
  payerDocument: string;
}

export interface IConfirmPurchase {
  products: ICartProduct[];
  purchaseRef: string;
  paymentRef: string;
  total: number;
  buyerEmail: string;
  buyerPhone: string;
  processingDate: string;
  shippingAddress: string;
  city: string;
  department: string;
}

export interface ICardStatistics {
  title: string;
  value: number;
  percent: number;
  footer: string;
  icon?: React.ReactNode;
}

export interface IPropsModal {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}

export interface IPropsShoppingProducts {
  items: ICartProduct[];
}

// React-select

export interface IOptionType {
  label: string;
  value: string;
}

// Redux

export type ICartState = {
  items: ICartProduct[];
  visible: boolean;
};

export interface IUserState {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  rol: string;
  accessToken: string;
  refreshToken: string;
}
