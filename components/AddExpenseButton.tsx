import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colorBlue } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  AddExpense: undefined;
};

const AddExpenseButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, "AddExpense">>();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("AddExpense")}
      >
        <AntDesign name="pluscircle" size={54} color={colorBlue} />
      </Pressable>
    </View>
  );
};

export default AddExpenseButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  button: {},
});
