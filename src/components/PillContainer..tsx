import React from "react";
import { View, StyleSheet } from "react-native";
import Pill from "./Pill";

interface ConnectedPillsProps {
  pill1Data: { text: string; color: string };
  pill2Data: { text: string; color: string };
  pill3Data: { text: string; color: string };
  lineColor: string;
}

const PillContainer: React.FC<ConnectedPillsProps> = ({
  pill1Data,
  pill2Data,
  pill3Data,
  lineColor,
}) => {
  return (
    <View style={Styles.container}>
      {/* First Pill */}
      <View style={Styles.pillWrapper}>
        <Pill
          text={pill1Data.text}
          color={pill1Data.color}
          useBackground={true}
        />
      </View>

      {/* Connecting Line */}
      <View style={Styles.line} />

      {/* Second and Third Pills */}
      <View style={Styles.rightPills}>
        {pill2Data ? (
          <Pill
            text={pill2Data.text}
            color={pill2Data.color}
            useBackground={false}
          />
        ) : null}
        <View
          style={[
            Styles.line,
            { backgroundColor: lineColor, marginHorizontal: 8 },
          ]}
        />
        {pill3Data ? (
          <Pill
            text={pill3Data.text}
            color={pill3Data.color}
            useBackground={false}
          />
        ) : null}
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
