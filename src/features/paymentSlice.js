// features/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentData: null,
    paymentStatus: 'idle', // 'idle', 'pending', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    setPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setPaymentError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPaymentData, setPaymentStatus, setPaymentError } = paymentSlice.actions;

export default paymentSlice.reducer;
