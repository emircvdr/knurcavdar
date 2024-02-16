import Navbar from "../components/Navbar";
import "../css/globalcss.css";
import ProductCard from "../components/ProductCard";
import { Container } from "@mui/material";
// import cüce from "../assets/cüce.jpg";
// import cüce2 from "../assets/cüce2.jpg";
// import cüce3 from "../assets/cüce3.jpg";
// import deneme from "../assets/PHOTO-2024-02-14-01-34-26.jpg";
import { EmirAPI } from "../services/broker";
import React, { useState } from "react";
import { ProductBase } from "../interfaces/ProductInterface";
const MainPage = () => {
  const [products, setProducts] = useState<ProductBase[]>([]);
  React.useEffect(() => {
    EmirAPI.getProducts().then((res) => {
      console.log(res);
      setProducts([...res].reverse() as ProductBase[]);
    });
  }, []);
  return (
    <>
      <Navbar />

      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          alignContent: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        {products.map((product: ProductBase) => {
          return (
            <ProductCard
              key={product._id}
              image={product.image}
              title={product.name}
              productNumber={product.productNumber}
              price={product.price}
            />
          );
        })}
      </Container>
    </>
  );
};

export default MainPage;
