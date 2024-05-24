import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import ChallengeIntro from "@/components/ChallengeIntro";

export default function Challenge1({navigation}) {
  const textIntro = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur";
  const helpText = "This is the help text for Challenge 1";
  const textIntro2 = "Bonsoir mes petits poulets";
  return (
      <ChallengeIntro
        backgroundImage={require("@/assets/images/challenge-1.png")}
        introText={textIntro}
        helpText={helpText}
      />
  );
}