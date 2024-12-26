import React from "react";
import { SectionList, View, StyleSheet } from "react-native";
import Card from "../Card";
import PillContainer from "../PillContainer.";
import { defaultColors } from "@/src/constants/Colors";

const ExpenseHistoryView = () => {
  // Data structure for December 2024
  const data = [
    {
      date: "01 Dec",
      gain: 400,
      expense: 700,
      data: [
        {
          title: "Groceries",
          amount: 40,
          addedDate: "01 Dec 2024",
        },
        {
          title: "Transportation",
          amount: 140,
          addedDate: "01 Dec 2024",
        },
        {
          title: "Dining",
          amount: 240,
          addedDate: "01 Dec 2024",
        },
      ],
    },
    {
      date: "02 Dec",
      gain: 300,
      expense: 500,
      data: [
        {
          title: "Utilities",
          amount: 200,
          addedDate: "02 Dec 2024",
        },
        {
          title: "Entertainment",
          amount: 300,
          addedDate: "02 Dec 2024",
        },
      ],
    },
    // Repeat for all days in December 2024
  ];

  // Here Create a store, and setStore state in zustand to load the history, and update the history for each months

  const renderHeader = ({ section }) => {
    return (
      <View style={styles.headerContainer}>
        <PillContainer
          pill1Data={{ text: section.date, color: "#FF5733" }}
          pill2Data={{ text: section.gain, color: "#33B5FF" }}
          pill3Data={{ text: section.expense, color: "#9C33FF" }}
          lineColor="#B0B0B0"
        />
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <Card
      title={item.title}
      date={item.addedDate}
      amount={item.amount}
      useShadow={false}
    />
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.title + index}
        renderSectionHeader={renderHeader}
        renderItem={renderItem}
        // contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
  },
  headerContainer: {
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ExpenseHistoryView;
