import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartProduct, ICartState } from '../../vite-env';

const initialState: ICartState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ICartProduct>) => {
      const product: ICartProduct = {
        ...action.payload,
        mount: 1
      };
      state.items.push(product);
    },
    increase: (state, action: PayloadAction<number>) => {
      const productStored: ICartProduct = state.items[action.payload];
      productStored.mount += 1;
      state.items[action.payload] = productStored;
    },
    decrease: (state, action) => {
      const productStored: ICartProduct = state.items[action.payload];
      productStored.mount -= productStored.mount === 1 ? 0 : 1;
      state.items[action.payload] = productStored;
    },
    remove: (state, action: PayloadAction<number>) => {
      const newProducts: ICartProduct[] = state.items.filter((product, i) => i !== action.payload);
      state.items = newProducts;
    },
    clear: (state) => {
      state.items = [];
    }
  }
});

export const { add, increase, decrease, remove, clear } = cartSlice.actions;

export default cartSlice.reducer;
