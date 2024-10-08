import AddExpenseButton from "@/components/AddExpenseButton";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

export default function Index(): JSX.Element {
  return (
    <View style={styles.container}>
      <View>
        <Text>This View is for Profile and icon button</Text>
      </View>
      <View>
        <Text>This view is for a card: which contains the total sum of total expenses by you.</Text>
      </View>

      <View>
        <Text>This View is for Statistics and Graph</Text>
      </View>

      <View>
        <Text>
          This View contains at-least 5 Category and also contains a link go to Category page, where user can View all 
          Category details and also can added Category.
        </Text>
      </View>

      <View>
        <Text>
          This View contains at-least 5 Expense and also contains a link go to Expense page, where user can View all 
          Expense details and also can added Expense.
        </Text>
      </View>
      <Text>This is a Home screen to to show all stats and other details</Text>

      <Text>Edit app/(tabs)/index.tsx to edit this screen.</Text>

      <Text>Now add other details like: Expense and other things</Text>
      <AddExpenseButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
