import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import HorizontalMonthPicker from "@/src/components/HorizontalMonthPicker";
import { defaultColors } from "@/src/constants/Colors";
import ExpenseHistoryView from "@/src/components/history/ExpenseHistoryView";

const ExpenseHistory = () => {
  const [selectedMonth, setSelectedMonth] = React.useState<string | null>(null);
  console.log("Selected Month: ", selectedMonth);

  return (
    <SafeAreaView style={styles.container}>
      {/* First create a view for calender */}
      <View style={styles.monthContainer}>
        <HorizontalMonthPicker onSelectMonth={setSelectedMonth} />
      </View>

      {/* Write the View here for History detail */}

      {/* Then other details will come from here */}
      <View>
        <ExpenseHistoryView selectedMonth={selectedMonth} />
      </View>
      {/* <Text>ExpenseHistory</Text> */}
    </SafeAreaView>
  );
};

export default ExpenseHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  monthContainer: {
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
    paddingVertical: 10,
  },
});
