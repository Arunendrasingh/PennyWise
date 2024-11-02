import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"; // Add your icon package
import { darkGray, colorBlue } from "@/constants/Colors";
import { Link } from "expo-router";

export default function index(): JSX.Element {
  return (
    <View style={styles.container}>
      {/* Top Part - Profile Header */}
      <View style={styles.profileHeader}>
        {/* <Text style={styles.headerText}>Profile</Text> */}
        <View style={styles.imageSection}>
          <Image
            source={require("@/assets/images/profile/profile.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <TouchableOpacity>
            <Link href="/profile/editProfile">
              <Text style={styles.editProfileText}>Edit</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Part - Personal Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionHeader}>Personal Settings</Text>
        <ScrollView contentContainerStyle={styles.optionList}>
          <OptionRow
            icon={<FontAwesome name="language" size={20} color={colorBlue} />}
            label="Language"
          />
          <OptionRow
            icon={<FontAwesome name="money" size={20} color={colorBlue} />}
            label="Currency"
          />
          <OptionRow
            icon={<FontAwesome name="list-alt" size={20} color={colorBlue} />}
            label="Category"
          />
          <OptionRow
            icon={<FontAwesome name="bullseye" size={20} color={colorBlue} />}
            label="Goals"
          />
          <OptionRow
            icon={<FontAwesome name="bell" size={20} color={colorBlue} />}
            label="Notification"
          />
          <OptionRow
            icon={<FontAwesome name="cogs" size={20} color={colorBlue} />}
            label="Settings"
          />
          <OptionRow
            icon={<FontAwesome name="lock" size={20} color={colorBlue} />}
            label="Privacy Settings"
          />
          <OptionRow
            icon={<FontAwesome name="mobile" size={20} color={colorBlue} />}
            label="Session Management"
          />
          <OptionRow
            icon={<FontAwesome name="key" size={20} color={colorBlue} />}
            label="Change Password"
          />
          <OptionRow
            icon={<FontAwesome name="language" size={20} color={colorBlue} />}
            label="Dark/Light Theme"
          />
          <OptionRow
            icon={
              <FontAwesome name="question-circle" size={20} color={colorBlue} />
            }
            label="FAQ"
          />
          <OptionRow
            icon={<FontAwesome name="support" size={20} color={colorBlue} />}
            label="Contact Support"
          />
          <OptionRow
            icon={<FontAwesome name="bug" size={20} color={colorBlue} />}
            label="Report a Problem"
          />
          {/* <OptionRow icon="credit-card" label="Payment Methods" /> */}
          <OptionRow
            icon={
              <FontAwesome name="info-circle" size={20} color={colorBlue} />
            }
            label="About"
          />
          <OptionRow
            icon={
              <FontAwesome name="download" size={20} color={colorBlue} />
            }
            label="Download Data"
          />
          <OptionRow
            icon={<MaterialIcons name="clear" size={20} color={colorBlue} />}
            label="Clear Cache"
          />
        </ScrollView>
      </View>
    </View>
  );
}

const OptionRow = ({ icon, label }: { icon: JSX.Element; label: string }) => (
  <TouchableOpacity style={styles.optionRow}>
    {icon}
    <Text style={styles.optionText}>{label}</Text>
    <FontAwesome name="chevron-right" size={20} color={darkGray} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  profileHeader: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: darkGray,
    marginBottom: 6,
  },
  imageSection: {
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 40,
    marginBottom: 10,
    borderColor: "white",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  editProfileText: {
    color: colorBlue,
    fontSize: 16,
    marginTop: 5,
  },
  settingsSection: {
    flex: 0.7,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: colorBlue,
    marginBottom: 15,
  },
  optionList: {
    paddingBottom: 20,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderColor: "#ddd",
    height: 60,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
});
