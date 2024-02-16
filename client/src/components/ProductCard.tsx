import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function ProductCard(props: {
  image: string;
  title: string;
  productNumber: string;
  price: string;
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image={props.image}
      />
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            #{props.productNumber}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          Kişiye özel renk seçenekleri ile hazırlanmış dekorasyon ürünüdür.Satın
          almak için İnstagram ya da WhatsApp üzerinden iletişime
          geçebilirsiniz.
        </Typography>
        <br />
        <Typography variant="h5" color="CaptionText">
          {props.price} ₺
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            window.open("https://www.instagram.com/knurcavdar/", "_blank");
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
  );
}
