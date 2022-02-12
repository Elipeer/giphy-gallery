import { createSlice } from "@reduxjs/toolkit";

export const appSettings = createSlice({
  name: "appSettings",
  initialState: {
    loaderOn: false,
    favoriteGiphys: []
  },
  reducers: {
    setLoaderOn: (state) => {
      state.loaderOn = true;
    },
    setLoaderOff: (state) => {
      state.loaderOn = false;
    },
    setFavoriteGiphys: (state, action) => {
      state.favoriteGiphys = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoaderOn, setLoaderOff, setFavoriteGiphys } = appSettings.actions;

export default appSettings.reducer;
