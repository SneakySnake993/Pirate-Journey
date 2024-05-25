import { createSlice } from '@reduxjs/toolkit';

const challenges = ['Challenge1', 'Challenge2', 'Challenge3'];
const initialState = challenges[0];

const lastUnlockedChallengeSlice = createSlice({
  name: 'lastUnlockedChallenge',
  initialState,
  reducers: {
    reset: () => initialState,
    unlock: (state, action) => {
      const challengeNumber = action.payload;
      if (challengeNumber >= 1 && challengeNumber <= challenges.length) {
        return challenges[challengeNumber - 1];
      }
      return state;
    }
  },
});

export const { reset, unlock } = lastUnlockedChallengeSlice.actions;

export default lastUnlockedChallengeSlice.reducer;