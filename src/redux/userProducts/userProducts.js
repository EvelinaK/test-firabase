
const getProducts = (state) => state.userProduct.notAllowedProducts;
const getUserId = (state) => state.userProduct.id;
const getSummaries = (state) => state.userProduct.summaries;

const selectors = {
  getProducts,
  getUserId,
  getSummaries,
};
export default selectors;
