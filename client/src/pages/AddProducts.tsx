import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { EmirAPI } from "../services/broker";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast/Toast";
import { ProductCreate } from "../interfaces/ProductInterface";

const AddProducts = () => {
  const [product, setProduct] = React.useState<ProductCreate>({
    name: "",
    price: "",
    image: "",
    productNumber: "",
  });
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleSubmit = (e: { preventDefault: () => void }) => {
    Toast.fire({
      icon: "info",
      title: "Ürün ekleniyor...",
      timer: 15000,
    });
    e.preventDefault();
    EmirAPI.createProduct(product)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "Ürün başarıyla eklendi.",
        });
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        gap: "10px",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            gap: "10px",
            padding: "10px",
          }}
        >
          <h1>Ürün Ekleme Sayfası</h1>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              gap: "10px",
              padding: "10px",
            }}
          >
            <TextField
              type="text"
              placeholder="Ürün Adı"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <TextField
              type="text"
              placeholder="Ürün Fiyatı"
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <TextField
              type="text"
              placeholder="Ürün Numarasi"
              onChange={(e) =>
                setProduct({ ...product, productNumber: e.target.value })
              }
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Resim Ekle
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  const file = e.target.files![0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setProduct({ ...product, image: reader.result as string });
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </Button>
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Kaydet
            </Button>
          </form>
        </div>
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image={product.image}
            />
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  #{product.productNumber}
                </Typography>
              </div>
              <Typography variant="body2" color="text.secondary">
                Kişiye özel renk seçenekleri ile hazırlanmış dekorasyon
                ürünüdür.Satın almak için İnstagram ya da WhatsApp üzerinden
                iletişime geçebilirsiniz.
              </Typography>
              <br />
              <Typography variant="h5" color="CaptionText">
                {product.price} ₺
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/knurcavdar/",
                    "_blank"
                  );
                }}
              >
                <InstagramIcon />
              </Button>
              <Button
                size="small"
                onClick={() => {
                  window.open("https://wa.me/message/VWYNWCCG26EYC1", "_blank");
                }}
              >
                <WhatsAppIcon />
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AddProducts;
