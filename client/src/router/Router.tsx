import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import AddProducts from "../pages/AddProducts";
import EditProducts from "../pages/EditProducts";

// import Schedule from "../pages/schedule/Schedule";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/urun-ekle" element={<AddProducts />} />
        <Route path="/urun/edit/:id" element={<EditProducts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
