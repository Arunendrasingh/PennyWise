import AddExpenseButton from "@/components/AddExpenseButton";
import { Text, View, StyleSheet, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
// import {} from "";

export default function Index(): JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <View> */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("@/assets/images/profile/profile.jpg")}
              style={styles.profileImage}
            />
            <View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileText}>Hello</Text>
              </View>
              <Text style={styles.normalText}>Charles David: local user</Text>
            </View>
          </View>
          <View style={styles.bellContainer}>
            <FontAwesome name="bell-o" size={24} color="black" />
            <View style={styles.badge}>
              <Text style={styles.badgeText} />
            </View>
          </View>
        </View>
        {/* </View> */}
        <View>
          <Text>
            This view is for a card: which contains the total sum of total
            expenses by you.
          </Text>
        </View>
        <View>
          <Text>
            This view is for a card: which contains the total sum of total
            expenses by you.
          </Text>
        </View>

        <View>
          <Text>This View is for Statistics and Graph</Text>
        </View>

        <View>
          <Text>
            This View contains at-least 5 Category and also contains a link go
            to Category page, where user can View all Category details and also
            can added Category.
          </Text>
        </View>

        <View>
          <Text>
            This View contains at-least 5 Expense and also contains a link go to
            Expense page, where user can View all Expense details and also can
            added Expense.
          </Text>
        </View>
        <Text>
          This is a Home screen to to show all stats and other details
        </Text>

        <Text>Edit app/(tabs)/index.tsx to edit this screen.</Text>

        <Text>Now add other details like: Expense and other things</Text>
        <AddExpenseButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // marginTop: 5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  normalText: {
    fontSize: 16,
  },
  profileTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "red",
    borderRadius: 9,
    width: 10,
    height: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 3,
    fontWeight: "bold",
  },
});
