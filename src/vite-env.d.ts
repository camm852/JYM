/// <reference types="vite/client" />

export interface PropsCarousel {
  images: string[];
  showButtons?: boolean;
  autoPlay?: boolean;
}

export interface PropsButtonMenu {
  setNavBar: React.Dispatch<React.SetStateAction<boolean>>;
  navBar: boolean;
}

export interface PropsCardProduct {
  image: string;
}

export interface PropsCarouseProducts {
  products: Array<string>;
}

export interface LinksNavBar {
  id: number;
  to: string;
  name: string;
}

export interface PropsNavBar {
  openNavBar: boolean;
}
export interface PropsLogin {
  isLogin: boolean;
  setLoadedImage: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PropsIcons {
  className: string;
}

export interface PropsCart {
  setActiveCart: React.Dispatch<React.SetStateAction<boolean>>;
  activeCart: boolean;
  products: CartProduct[];
}

export interface CartProduct {
  image: string;
  name: string;
  price: number;
  description: string;
  mount: number;
  color: string;
  size: string;
}

export interface PropsCartProduct {
  indexProduct: number;
  product: CartProduct;
}

// Redux

export interface CartState {
  items: CartProduct[];
}
