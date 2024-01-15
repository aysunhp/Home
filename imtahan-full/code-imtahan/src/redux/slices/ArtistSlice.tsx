import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllArtists = createAsyncThunk(
  "artists/getAllArtists",
  async () => {
    const response = await axios
      .get("http://localhost:3003/artists")
      .then((res) => {
        return res.data;
      });
    console.log(response);
    return response;
  }
);

export const postArtist = createAsyncThunk(
  "artists/postArtist",
  async (item: PostedArtist) => {
    const response = await axios
      .post("http://localhost:3003/artists", item)
      .then((res) => {
        return res.data;
      });
    console.log(response);
    return response;
  }
);

export const deleteArtist = createAsyncThunk(
  "artists/deleteArtist",
  async (item: Artist) => {
    const id = item._id;
    const response = axios
      .delete("http://localhost:3003/artists/" + id)
      .then((res) => {
        return res.data;
      });
    console.log(response);
    return response;
  }
);

export interface PostedArtist {
  name: string;
  age: string;
  gender: string;
  genre: string;
}

export interface Artist {
  name: string;
  age: string;
  gender: string;
  genre: string;
  _id: string;
}

export interface Basket extends Artist {
  quantity: number;
}

export interface ArtistState {
  artist: Artist;
  data: Artist[];
  basket: Basket[];
  wishlist: Artist[];
  status: "loading" | "succeeded" | "failed";
}

const initialState: ArtistState = {
  artist: {
    name: "",
    age: "",
    gender: "",
    genre: "",
    _id: "",
  },
  data: [],
  basket: [],
  wishlist: [],
  status: "loading",
};

export const artistSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addBasket: (state, action: PayloadAction<Artist>) => {
      let found = [...state.basket].findIndex(
        (item) => item._id == action.payload._id
      );

      if (found !== -1) {
        state.basket = current(state.basket).map((item, index) =>
          index === found ? { ...item, quantity: item.quantity + 1 } : item
        );
        console.log(state.basket);
      } else {
        let obj = {
          ...action.payload,
          quantity: 1,
        };
        state.basket = [...current(state.basket), obj];
        console.log(state.basket);
      }
    },
    increaseBasket: (state, action: PayloadAction<Artist>) => {
      let found = [...state.basket].findIndex(
        (item) => item._id == action.payload._id
      );

      state.basket = current(state.basket).map((item, index) =>
        index === found ? { ...item, quantity: item.quantity + 1 } : item
      );
      console.log(state.basket);
    },
    decreaseBasket: (state, action: PayloadAction<Artist>) => {
      let found = [...state.basket].findIndex(
        (item) => item._id == action.payload._id
      );

      state.basket = current(state.basket).map((item, index) =>
        index === found ? { ...item, quantity: item.quantity - 1 } : item
      );
      console.log(state.basket);
    },
    deleteBasket: (state, action: PayloadAction<Artist>) => {
      state.basket = state.basket.filter(
        (item) => item._id != action.payload._id
      );
    },
    addWishlist: (state, action: PayloadAction<Artist>) => {
      let found = state.wishlist.find((item) => item._id == action.payload._id);

      console.log("found", found);
      if (!found) {
        state.wishlist = [...current(state.wishlist), { ...action.payload }];
      } else {
        state.wishlist = state.wishlist.filter(
          (item) => item._id != action.payload._id
        );
      }

      console.log(state.wishlist);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllArtists.pending, (state) => {
        console.log("pending");
        state.status = "loading";
      })
      .addCase(getAllArtists.fulfilled, (state, action) => {
        console.log("fulfiled");
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllArtists.rejected, (state) => {
        console.log("error");
        state.status = "failed";
      });

    builder
      .addCase(deleteArtist.pending, (state) => {
        console.log("pending");
        state.status = "loading";
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        console.log("fulfiled");
        state.status = "succeeded";
        console.log(action.payload);
        state.data = state.data.filter(
          (item) => item._id !== current(action.payload)?._id
        );
      })
      .addCase(deleteArtist.rejected, (state) => {
        console.log("error");
        state.status = "failed";
      });

    builder
      .addCase(postArtist.pending, (state) => {
        console.log("pending");
        state.status = "loading";
      })
      .addCase(postArtist.fulfilled, (state, action) => {
        console.log("fulfiled");
        state.status = "succeeded";
        console.log(action.payload);
        state.data = [...current(state.data), current(action.payload)];
        console.log(state.data);
      })
      .addCase(postArtist.rejected, (state) => {
        console.log("error");
        state.status = "failed";
      });
  },
});

export const {
  addBasket,
  addWishlist,
  increaseBasket,
  decreaseBasket,
  deleteBasket,
} = artistSlice.actions;

export default artistSlice.reducer;
