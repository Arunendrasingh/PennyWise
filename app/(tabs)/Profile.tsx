import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Add your icon package
import { darkGray, colorBlue } from "@/constants/Colors";

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* Top Part - Profile Header */}
      <View style={styles.profileHeader}>
        {/* <Text style={styles.headerText}>Profile</Text> */}
        <View style={styles.imageSection}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/7f/5a/93/7f5a93164763d62faec8fa300dc28b7e.jpg",
            }} // Replace with your image URL or use local images
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <TouchableOpacity>
            <Text style={styles.editProfileText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Part - Personal Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionHeader}>Personal Settings</Text>
        <ScrollView contentContainerStyle={styles.optionList}>
          <OptionRow icon="language" label="Language" />
          <OptionRow icon="money" label="Currency" />
          <OptionRow icon="list-alt" label="Category" />
          <OptionRow icon="bullseye" label="Goals" />
          <OptionRow icon="bell" label="Notification" />
          <OptionRow icon="cogs" label="Settings" />
          <OptionRow icon="lock" label="Privacy Settings" />
          <OptionRow icon="mobile" label="Session Management" />
          <OptionRow icon="key" label="Change Password" />
          <OptionRow icon="palette" label="Dark Mode" />
          <OptionRow icon="question-circle" label="FAQ" />
          <OptionRow icon="support" label="Contact Support" />
          <OptionRow icon="bug" label="Report a Problem" />
          <OptionRow icon="credit-card" label="Payment Methods" />
          <OptionRow icon="info-circle" label="About" />
          <OptionRow icon="download" label="Download Data" />
          <OptionRow icon="trash-alt" label="Clear Cache" />
        </ScrollView>
      </View>
    </View>
  );
};

const OptionRow = ({ icon, label }: { icon: string; label: string }) => (
  <TouchableOpacity style={styles.optionRow}>
    <FontAwesome name={icon} size={20} color={colorBlue} />
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
    borderColor: "red",
    borderRadius: 40,
    marginBottom: 10,
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

export default Profile;
