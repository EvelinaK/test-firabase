import userProductActions from "./userProductsActions";
import DB from "../../services/backend.service.js";
import { storage } from "../../firebase/firebase.js";
const addProduct = (product) => async (dispatch) => {
  dispatch(userProductActions.addProductRequest());
  await transformImage(product);
  DB.createProduct(product)
    .then(() => {
      dispatch(userProductActions.addProductSuccess(product));
      window.history.back();
    })
    .catch((err) => {
      if (err.response === '"product" is not allowed to be empty') {
        dispatch(
          userProductActions.addProductError("Please, choose a product")
        );
      } else dispatch(userProductActions.addProductError(err.message));
    });
};



const transformImage = async(product)=> {
  const fileRef = storage.child(product.image.name);
  await fileRef.put(product.image);
  const fileUrl = await fileRef.getDownloadURL();
    product.image = fileUrl;
}

const getProducts = (product) => async (dispatch) => {
  dispatch(userProductActions.getProductsRequest());
  dispatch(userProductActions.getProductsSuccess(product));

};

const deleteProduct = (id) => (dispatch) => {
  dispatch(userProductActions.deleteProductRequest());
  DB.removeProduct(id)
    .then(() => {
      dispatch(userProductActions.deleteProductSuccess(id));
    })
    .catch((err) => dispatch(userProductActions.deleteProductError(err)));
};

const updateProduct = (id, product) => async (dispatch) => {
  dispatch(userProductActions.updateProductRequest());
  
  await transformImage(product);
  DB.updateProduct(id, product)
    .then(() => {
      dispatch(userProductActions.updateProductSuccess(product));
      window.history.back();
    })
    .catch((err) => dispatch(userProductActions.updateProductError(err)));
};
export { addProduct, deleteProduct, getProducts, updateProduct };
