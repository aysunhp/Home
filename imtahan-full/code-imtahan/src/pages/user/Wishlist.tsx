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
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  getAllArtists,
  addBasket,
  addWishlist,
} from "./../../redux/slices/ArtistSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector((state: RootState) => state.artist.wishlist);
  useEffect(() => {
    dispatch(getAllArtists());
  }, [dispatch]);
  return (
    <>
      <Container maxWidth="xl">
        <CssBaseline />
        <h1>Wishlist</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            {wishlist &&
              wishlist.map((item) => {
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
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => {
                            console.log("basket clicked");
                            dispatch(addBasket(item));
                          }}
                        >
                          <ShoppingBasketIcon />
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            console.log("fav clicked");
                            dispatch(addWishlist(item));
                          }}
                        >
                          <FavoriteIcon style={{ color: "red" }} />
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

export default Wishlist;
