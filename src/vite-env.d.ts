import { GroupBase, StylesConfig } from 'react-select';
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
  image: string;
}

export interface IPropsCarouseProducts {
  products: Array<string>;
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

export interface PropsIcons {
  className: string;
}

export interface IPropsCart {
  setActiveCart: React.Dispatch<React.SetStateAction<boolean>>;
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
}

export interface IPropsCartProduct {
  indexProduct: number;
  product: CartProduct;
}

export interface IPropsToast {
  stateToast: boolean;
  openToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFormProduct {
  name: string;
  slug: string;
  price: number;
  gender: string;
  colors: string[];
  sizes: string[];
  categories: string[];
  type: string;
}

export interface IErrorFormProduct {
  name: boolean;
  slug: boolean;
  price: boolean;
  image: boolean;
  size: boolean;
  category: boolean;
  gender: boolean;
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
  products: CartProduct[];
  purchaseRef: string;
  paymentRef: string;
  total: number;
}

// React-select

export interface IOptionType {
  label: string;
  value: string;
}

// Redux

export type TCartState = {
  items: CartProduct[];
};

export interface IUserState {
  name: string;
  accesToken: string;
  typeUser: string;
}
