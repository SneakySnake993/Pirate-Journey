import { createSlice } from '@reduxjs/toolkit';

const challenges = ['Challenge1', 'Challenge2', 'Challenge3'];
const initialState = challenges[2];

const lastUnlockedChallengeSlice = createSlice({
  name: 'lastUnlockedChallenge',
  initialState,
  reducers: {
    reset: () => initialState,
    unlock: (state, action) => {
      const challengeNumber = action.payload;
      //check is the challenge number is valid and is greater than the current challenge
      isChallengeGreaterThanCurrent = challengeNumber > challenges.indexOf(state) + 1;
      isChallengeValid = challengeNumber >= 1 && challengeNumber <= challenges.length;
      if (isChallengeGreaterThanCurrent && isChallengeValid) {
        return challenges[challengeNumber - 1];
      }
      return state;
    }
  },
});

export const { reset, unlock } = lastUnlockedChallengeSlice.actions;

export default lastUnlockedChallengeSlice.reducer;