import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  phone_number: "",
  name: "",
  token: "",
  status: "idle",
  error: null,
  address: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName, email, phone_number, name, token, userId, address } = action.payload;
      state.userId = userId;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phone_number = phone_number;
      state.name = name;
      state.token = token;
      state.address = address;
    },
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;