import React from "react";
import { View, StyleSheet } from "react-native";
import Pill from "./Pill";

interface ConnectedPillsProps {
  pillData: { text: string; color: string }[];
  lineColor: string;
}

const PillContainer: React.FC<ConnectedPillsProps> = ({
  pillData,
  lineColor,
}) => {
  return (
    <View style={Styles.container}>
      {/* First Pill */}
      <View style={Styles.pillWrapper}>
        <Pill
          text={pillData[0].text}
          color={pillData[0].color}
          useBackground={true}
        />
      </View>

      {/* Connecting Line */}
      <View style={Styles.line} />

      {/* Second and Third Pills */}
      <View style={Styles.rightPills}>
        <Pill
          text={pillData[1].text}
          color={pillData[1].color}
          useBackground={false}
        />
        <View
          style={[
            Styles.line,
            { backgroundColor: lineColor, marginHorizontal: 8 },
          ]}
        />
        <Pill
          text={pillData[2].text}
          color={pillData[2].color}
          useBackground={false}
        />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pillWrapper: {
    alignItems: "flex-start",
  },
  rightPills: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.5,
    justifyContent: "flex-end",
  },
  line: {
    height: 2,
    backgroundColor: "#B0B0B0",
    flex: 1,
  },
});

export default PillContainer;
