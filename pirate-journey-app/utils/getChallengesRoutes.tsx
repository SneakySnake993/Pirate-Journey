import { APP_STRINGS } from "@/constants/ApplicationStrings";
function getChallengesRoutes(): string[] {
  const challenges = [APP_STRINGS.CHALLENGE1_ROUTE, APP_STRINGS.CHALLENGE2_ROUTE, APP_STRINGS.CHALLENGE3_ROUTE];
  return challenges;
}
export default getChallengesRoutes;