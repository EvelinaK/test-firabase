import { createAction } from "@reduxjs/toolkit";

const deleteProductRequest = createAction("userProduct/deleteProductRequest");
const deleteProductSuccess = createAction("userProduct/deleteProductSuccess");
const deleteProductError = createAction("userProduct/deleteProductError");

const getProductsRequest = createAction("userProduct/getProductsRequest");
const getProductsSuccess = createAction("userProduct/getProductsSuccess");
const getProductsError = createAction("userProduct/getProductsError");

const addProductRequest = createAction("userProduct/addProductRequest");
const addProductSuccess = createAction("userProduct/addProductSuccess");
const addProductError = createAction("userProduct/addProductError");

const updateProductRequest = createAction("userProduct/addProductRequest");
const updateProductSuccess = createAction("userProduct/addProductSuccess");
const updateProductError = createAction("userProduct/addProductError");


const actions = {
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductError,
  addProductRequest,
  addProductSuccess,
  addProductError,
  getProductsRequest,
  getProductsSuccess,
  getProductsError,
  updateProductRequest,
  updateProductSuccess,
  updateProductError,
};

export default actions;
