import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "CartToast",
  initialState: {
    cartToast: true, // Initial visibility state for the cart toast
  },
  reducers: {
    cartItem: (state, action) => {
      const { cartname } = action.payload;
      
      // Use === for comparison to avoid assignment mistake
      if (cartname === "CartScreen") {
        state.cartToast = false;  // Hide cart toast when on CartScreen
      } else {
        state.cartToast = true;   // Show cart toast on other screens
      }
    },
  },
});

export const { cartItem } = cartSlice.actions;

export default cartSlice.reducer;
