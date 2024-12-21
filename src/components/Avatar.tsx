import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { generateHexColor } from "../utils/colorUtils";

const Avatar = ({ title, fontSize }: { title: string; fontSize: number }) => {
  const color = generateHexColor(title);
  return (
    <View style={[styles.avatarContainer, { backgroundColor: color }]}>
      <Text style={[styles.avatarHeaderText, { fontSize: fontSize }]}>{title.slice(0,1)}</Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatarContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarHeaderText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
