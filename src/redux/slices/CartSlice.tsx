import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct, CartState } from '../../vite-env';

const initialState: CartState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartProduct>) => {
      const product: CartProduct = {
        ...action.payload,
        mount: 1
      };
      state.items.push(product);
    },
    increase: (state, action: PayloadAction<number>) => {
      const productStored: CartProduct = state.items[action.payload];
      productStored.mount += 1;
      state.items[action.payload] = productStored;
    },
    decrease: (state, action) => {
      const productStored: CartProduct = state.items[action.payload];
      productStored.mount -= productStored.mount === 1 ? 0 : 1;
      state.items[action.payload] = productStored;
    },
    remove: (state, action: PayloadAction<number>) => {
      const newProducts: CartProduct[] = state.items.filter((product, i) => i !== action.payload);
      state.items = newProducts;
    },
    clear: (state) => {
      state.items = [];
    }
  }
});

export const { add, increase, decrease, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;
