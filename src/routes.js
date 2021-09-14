import { lazy } from "react";

const routes = [
  {
    label: "",
    path: "/",
    exact: true,
    component: lazy(() => import("./pages/HomePage")),
    privated: true,
    restricted: true,
  },
  {
    label: "Regisrer",
    path: "/register",
    exact: true,
    component: lazy(() => import("./pages/RegistrationPage")),
    privated: false,
    restricted: true,
  },
  {
    label: "Login",
    path: "/login",
    exact: true,
    component: lazy(() => import("./pages/LoginPage")),
    privated: false,
    restricted: true,
  },
  {
    label: "ProductListPage",
    path: "/product-list",
    exact: true,
    component: lazy(() => import("./pages/ProductListPage/ProductListPage")),
    privated: true,
    restricted: false,
  },

  {
    label: "EditProduct",
    path: "/edit/:id",
    exact: true,
    component: lazy(() => import("./pages/AddProductPage/AddProductPage")),
    privated: true,
    restricted: false,
  },
  {
    label: "AddProduct",
    path: "/add",
    exact: true,
    component: lazy(() => import("./pages/AddProductPage/AddProductPage")),
    privated: true,
    restricted: false,
  },
];

export default routes;
