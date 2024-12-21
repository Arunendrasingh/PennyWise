import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { defaultColors } from "../constants/Colors";

const Card = ({title, date, amount}: {
  title: string;
  date: Date | string;
  amount: number;
}) => {

  const formatDate = (date: string | Date): string => {
    if (date instanceof Date) {
      // Convert the Date object into a string (e.g., ISO format)
      return date.toDateString(); // Example: "2023-12-21T10:20:30.000Z"
    }
    return date; // If it's already a string, return it as-is
  }
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.avatarContainer}>
          <Avatar title={title} fontSize={25} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.cardHeaderText}>{title}</Text>
          <Text style={styles.cardSecondlyText}>{formatDate(date)}</Text>
        </View>
      </View>
      <Text style={styles.cardAmountText}>{amount} $</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
    marginVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowColor: defaultColors.paytmColors.primaryBlue,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    padding: 8,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
  },
  avatarContainer: {
    width: 40,
    height: 40,
  },
  cardHeaderText: {
    color: defaultColors.paytmColors.textBlack,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "semibold",
  },
  cardSecondlyText: {
    color: defaultColors.paytmColors.secondaryTextGray,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "semibold",
  },
  cardAmountText: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
});
