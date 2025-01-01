import React from "react";
import { SectionList, View, StyleSheet, Text } from "react-native";
import Card from "../Card";
import PillContainer from "../PillContainer.";
import { defaultColors } from "@/src/constants/Colors";
import { loadExpenses } from "@/src/database/utils/expenseManager";
import { useStore } from "zustand";
import expenseTrackerStore from "@/src/store/expenseTracker";
import { getMonthStartAndEndDates } from "@/src/utils/utils";

const ExpenseHistoryView = ({ selectedMonth }: { selectedMonth: string }) => {
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
  
  console.log("Selected History Month: ", selectedMonth);
  const { user } = useStore(expenseTrackerStore);

  React.useEffect(() => {
    // Load the data from the store
    async function loadCurrentSelectedExpenseHistory() {
      const userId = user?.id;
      if (!userId) {
        console.log("User not found");
        return;
      }

      const startEndDate = getMonthStartAndEndDates(selectedMonth);

      console.log(`Start Date: ${startEndDate.startOfMonth}, End Date: ${startEndDate.endOfMonth}`);

      const expenses = await loadExpenses(
        userId,
        startEndDate.startOfMonth,
        startEndDate.endOfMonth
      );

      console.log("Expenses: ", expenses);
      // Load the data from the store
    }
    loadCurrentSelectedExpenseHistory();
    // set the data to the data variable
  }, [selectedMonth]);

  // Here Create a store, and setStore state in zustand to load the history, and update the history for each months
  // First I need the current selected month, then split it and load all the expense which are added for that month

  // If selectedHistory is null or undefined then  show the message, pleases select month to display the history or some better message
  if (!selectedMonth) {
    return (
      <View style={styles.container}>
        <Text>Please select a month to view the history</Text>
      </View>
    );
  }

  // Here load the expense history for the selected month using the useState which run whenever the selectedMonth changed
  // Then load the data from the store and set the data to the data variable

  const renderHeader = ({
    section,
  }: {
    section: { date: string; gain: string; expense: string };
  }) => {
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

  const renderItem = ({
    item,
  }: {
    item: { title: string; addedDate: string | Date; amount: number };
  }) => (
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
