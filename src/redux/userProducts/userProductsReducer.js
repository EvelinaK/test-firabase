import { createReducer } from "@reduxjs/toolkit";
import authActions from "../auth/authActions";
import userActions from "./userProductsActions";

const initialState = {
  username: null,
  email: null,
  id: null,
  products: [],
  isLoading: true,
  error: null,
};

const userProduct = createReducer(initialState, {
  [authActions.loginSuccess]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [authActions.loginSuccess]: (state, { payload }) => payload.user,
  [userActions.getCurrentUserSuccess]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [userActions.getProductsSuccess]: (state, { payload }) => ({
    ...state,
    products: payload,
  }),
  [userActions.addProductSuccess]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [userActions.deleteProductSuccess]: (state, { payload }) => ({
    ...state,
    products: state.products.filter((product) => product.id !== payload),
  }),
  [userActions.updateProductSuccess]: (state, { payload }) => ({
    ...state,
    products: state.products.map((product) =>
      product.id === payload.id ? payload : product
    ),
  }),
});

export default userProduct;
