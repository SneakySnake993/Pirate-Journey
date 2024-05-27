import { createSlice } from '@reduxjs/toolkit';

const initialState = { value : false };

const challenge2IntroSlice = createSlice({
  name: 'challenge2Intro',
  initialState,
  reducers: {
    reset: () => initialState,
    finishedTyping: (state) => {
      state.value = true
      console.log(state.value)
    },
  },
});
console.log(initialState)

export const { reset, finishedTyping } = challenge2IntroSlice.actions;
export default challenge2IntroSlice.reducer;