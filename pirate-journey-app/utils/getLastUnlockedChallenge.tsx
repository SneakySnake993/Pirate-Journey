// get last unlcoke challenge using use selector from redux, i want to use this function in my components
import { useSelector } from 'react-redux';
import lastUnlockedChallenge from '@/store/lastUnlockedChallenge';

function getLastUnlockedChallengeIndex(challenges: string[]) {
  const lastUnlockedChallengeValue = useSelector(state => state.lastUnlockedChallenge.value);
  const lastUnlockedIndex = challenges.findIndex(challenge => challenge === lastUnlockedChallengeValue) || 0;
  return lastUnlockedIndex;
};

export default getLastUnlockedChallengeIndex;