import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Add your icon package
import { darkGray, colorBlue } from "@/constants/Colors";

import ShowProfile from "@/components/profile/ShowProfile";
import { Link } from "expo-router";

export default function index(): JSX.Element {
  return (
    <View style={styles.container}>
      {/* Top Part - Profile Header */}

      <ShowProfile />

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
            url_path="/categories"
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
            icon={<FontAwesome name="download" size={20} color={colorBlue} />}
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

const OptionRow = ({
  icon,
  label,
  url_path,
}: {
  icon: JSX.Element;
  label: string;
  url_path?: string;
}) => (
  <TouchableOpacity style={styles.optionRow}>
    {icon}
    <Text style={styles.optionText}>{label}</Text>
    <Link href={url_path || "/"}>
      <FontAwesome name="chevron-right" size={20} color={darkGray} />
    </Link>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
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
