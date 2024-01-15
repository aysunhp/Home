import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import {
  getAllArtists,
  increaseBasket,
  decreaseBasket,
  deleteBasket,
} from "./../../redux/slices/ArtistSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";

const Basket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const basket = useSelector((state: RootState) => state.artist.basket);
  useEffect(() => {
    dispatch(getAllArtists());
  }, [dispatch]);
  return (
    <>
      <Container maxWidth="xl">
        <CssBaseline />
        <h1>Basket</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            {basket &&
              basket.map((item) => {
                return (
                  <Grid xs={4} sm={6} xl={3} key={item._id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image=""
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Age: {item.age}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Genre: {item.genre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Gender: {item.gender}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            dispatch(increaseBasket(item));
                          }}
                        >
                          <TextIncreaseIcon />
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            dispatch(decreaseBasket(item));
                          }}
                        >
                          <TextDecreaseIcon />
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            console.log("fav clicked");
                            dispatch(deleteBasket(item));
                          }}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Basket;
