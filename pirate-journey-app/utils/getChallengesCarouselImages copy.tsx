function getChallengesCarouselImages(): { title: string, image: any }[] {
  const challengeImages = [
    { title: 'Challenge1', image: require('@/assets/images/challenge1-carousel.png') },
    { title: 'Challenge2', image: require('@/assets/images/challenge2-carousel.png') },
    { title: 'Challenge3', image: require('@/assets/images/challenge3-carousel.png') },
  ];
  return challengeImages;
}

export default getChallengesCarouselImages;