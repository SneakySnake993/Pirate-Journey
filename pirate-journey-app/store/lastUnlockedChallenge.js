import { createSlice } from '@reduxjs/toolkit';

const challenges = ['Challenge1', 'Challenge2', 'Challenge3'];

const initialState = { value: challenges[0] }

const lastUnlockedChallengeSlice = createSlice({
  name: 'lastUnlockedChallenge',
  initialState,
  reducers: {
    reset: () => initialState,
    unlock: (state, action) => {
      console.log('state', state);
      const challengeNumber = action.payload;
      //check is the challenge number is valid and is greater than the current challenge
      isChallengeGreaterThanCurrent = challengeNumber > challenges.indexOf(state) + 1;
      isChallengeValid = challengeNumber >= 1 && challengeNumber <= challenges.length;
      if (isChallengeGreaterThanCurrent && isChallengeValid) {
        return { value: challenges[challengeNumber - 1] };
      }
      return state;
    }
  },
});

export const { reset, unlock } = lastUnlockedChallengeSlice.actions;
export default lastUnlockedChallengeSlice.reducer;