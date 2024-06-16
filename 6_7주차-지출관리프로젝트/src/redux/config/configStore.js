import { configureStore } from '@reduxjs/toolkit';
import expenditure from '../slices/expenditureSlice.js';

const store = configureStore({
  reducer: {
    expenditure
  }
});

export default store;
