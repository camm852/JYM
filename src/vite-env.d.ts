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
}

export interface PropsIcons {
  className: string;
}
