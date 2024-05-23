import { Text, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Text>J'aime les pistaches</Text>
      <Text>J'aime le poulet</Text>
      <HelloWave />
    </View>
  );
}
