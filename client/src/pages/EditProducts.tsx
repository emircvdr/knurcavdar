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
import React, { useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { EmirAPI } from "../services/broker";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast/Toast";
import { ProductBase } from "../interfaces/ProductInterface";
import { useParams } from "react-router-dom";

const EditProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState<ProductBase>({
    _id: "",
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
  useEffect(() => {
    if (id) {
      EmirAPI.getProductByID(id)
        .then((res) => {
          setProduct(res as ProductBase);
        })
        .catch((err) => {
          console.error("Urun getirilirken bir hata oluştu", err);
        });
    }
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (id) {
      Toast.fire({
        icon: "info",
        title: "Ön Görüşme güncelleniyor...",
        timer: 15000,
      });
      EmirAPI.updateProduct(id, {
        _id: product._id,
        name: product.name,
        price: product.price,
        productNumber: product.productNumber,
        image: product.image,
      })
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "Urun başarıyla güncellendi.",
          });
          navigate("/");
          console.log(res);
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Urun güncellenirken bir hata oluştu.",
          });
          console.error("Urun güncellenirken bir hata oluştu", err);
        });
    }
  };

  const handleDelete = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (id) {
      Toast.fire({
        icon: "info",
        title: "Ürün siliniyor...",
        timer: 15000,
      });
      EmirAPI.deleteProduct(id)
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "Ürün başarıyla silindi.",
          });
          navigate("/");
          console.log(res);
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Ürün silinirken bir hata oluştu.",
          });
          console.error("Ürün silinirken bir hata oluştu", err);
        });
    }
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
          <h1>Ürün Duzenleme Sayfası</h1>
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
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <TextField
              type="text"
              placeholder="Ürün Fiyatı"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <TextField
              type="text"
              placeholder="Ürün Numarasi"
              value={product.productNumber}
              onChange={(e) =>
                setProduct({ ...product, productNumber: e.target.value })
              }
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
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
                      setProduct({
                        ...product,
                        image: reader.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={(e) => {
                  e.preventDefault();
                  setProduct({ ...product, image: "" });
                }}
              >
                Resmi Sil
              </Button>
              <Button variant="contained" type="submit" onClick={handleSubmit}>
                Düzenle
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="error"
                onClick={handleDelete}
              >
                Ürünü Sil
              </Button>
            </div>
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

export default EditProducts;
