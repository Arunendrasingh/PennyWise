import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen and do what can do⬆️⬆️😕😕🤣🤣😍😍.</Text>
      <Link href={"/sign-in"}>Sign-In</Link>
      <Link href={"/profile"}>Profile</Link>
      <Link href={"/history"}>History</Link>
      <Link href={"/statistics"}>Statistics</Link>
    </View>
  );
}
