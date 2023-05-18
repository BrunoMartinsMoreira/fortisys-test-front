import { Routes, Route } from "react-router-dom";
import { ListProductsPage } from "../pages/Products/ListProductsPage";
import { AddProductPage } from "../pages/Products/AddProductPage";
import { AppLayout } from "./Layouts/AppLayout";
import { EditProductPage } from "../pages/Products/EditProductPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<ListProductsPage />} />
        <Route path="/products/new" element={<AddProductPage />} />
        <Route path="/product/edit" element={<EditProductPage />} />
      </Route>
    </Routes>
  );
};
