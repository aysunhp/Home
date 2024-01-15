import * as React from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  deleteArtist,
  Artist,
} from "./../../redux/slices/ArtistSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";

const Home = () => {
  const [gender, setGender] = React.useState("");
  console.log(gender);
  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.artist.data);
  useEffect(() => {
    dispatch(getAllArtists());
  }, [dispatch]);

  const handleDelete = async (item: Artist) => {
    try {
      await dispatch(deleteArtist(item));
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
       
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Gender"
            onChange={handleChange}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          {data &&
            data.map((item) => {
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
                        <FavoriteIcon />
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          handleDelete(item);
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
  );
};

export default Home;
