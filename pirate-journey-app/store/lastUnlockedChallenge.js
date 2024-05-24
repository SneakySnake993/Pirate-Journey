import { createSlice } from '@reduxjs/toolkit';

const challenges = ['Challenge1', 'Challenge2', 'Challenge3'];
const initialState = challenges[0];

const lastUnlockedChallengeSlice = createSlice({
  name: 'lastUnlockedChallenge',
  initialState,
  reducers: {
    reset: () => initialState,
    next: (state) => {
      const lastChallengeIndex = challenges.indexOf(state);
      return challenges[(lastChallengeIndex + 1) % challenges.length]; 
      //% challenges.length to loop back to the first challenge
    },
  },
});

export const { reset, next } = lastUnlockedChallengeSlice.actions;

export default lastUnlockedChallengeSlice.reducer;