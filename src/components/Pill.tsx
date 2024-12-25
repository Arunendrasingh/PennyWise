import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface PillProps {
  text: string;
  color: string;
  useBackground?: boolean;
}

const Pill: React.FC<PillProps> = ({ text, color, useBackground }) => {
  return (
    <View
      style={[pillStyles.pill, useBackground ? { backgroundColor: color } : {borderWidth:2, borderColor: color}]}
    >
      <Text style={[pillStyles.pillText, !useBackground ? { color: color } : { color: '#fff' }]}>{text}</Text>
    </View>
  );
};

const pillStyles = StyleSheet.create({
  pill: {
    paddingHorizontal: 4,
    width: "auto",
    height: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Pill;
