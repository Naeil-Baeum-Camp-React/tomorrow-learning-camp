import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenditureList: localStorage.getItem('expenditureList') ? JSON.parse(localStorage.getItem('expenditureList')) : [],
};

const expenditureSlice = createSlice({
  name: 'expenditure',
  initialState,
  reducers: {
    createExpenditure: (state, action) => {
      state.expenditureList = sortExpendituresByDate([...state.expenditureList, action.payload]);
    },
    updateExpenditure: (state, action) => {
      state.expenditureList = sortExpendituresByDate(
        state.expenditureList.map((expenditure) => {
          if (expenditure.id === action.payload.id) {
            Object.assign(expenditure, action.payload);
          }
          return expenditure;
        })
      );
    },
    deleteExpenditure: (state, action) => {
      state.expenditureList = sortExpendituresByDate(
        state.expenditureList.filter((expenditure) => expenditure.id !== action.payload)
      );
    },
  },
});
const sortExpendituresByDate = (expenditureList) => {
  return expenditureList.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const { createExpenditure, updateExpenditure, deleteExpenditure } = expenditureSlice.actions;
export default expenditureSlice.reducer;
