import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome, MaterialIcons, FontAwesome6 } from "@expo/vector-icons"; // Add your icon package
import { darkGray, colorBlue, defaultColors } from "@/src/constants/Colors";

import ShowProfile from "@/src/components/profile/ShowProfile";
import { Link, router, useRouter } from "expo-router";

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
            icon={
              <FontAwesome6
                name="sack-dollar"
                size={20}
                color={defaultColors.paytmColors.textBlack}
              />
            }
            label="Budget"
            value={"$1000"}
            url_path="/budgets"
          />
          <OptionRow
            icon={
              <FontAwesome
                name="money"
                size={20}
                color={defaultColors.paytmColors.textBlack}
              />
            }
            label="Currency"
          />
          <OptionRow
            icon={
              <FontAwesome
                name="list-alt"
                size={20}
                color={defaultColors.paytmColors.textBlack}
              />
            }
            label="Category"
            url_path="/categories"
          />
          <OptionRow
            icon={
              <FontAwesome
                name="cogs"
                size={20}
                color={defaultColors.paytmColors.textBlack}
              />
            }
            label="Settings"
          />
          <OptionRow
            icon={
              <FontAwesome
                name="support"
                size={20}
                color={defaultColors.paytmColors.textBlack}
              />
            }
            label="Contact Support"
          />
          <OptionRow
            icon={
              <FontAwesome
                name="download"
                size={20}
                color={defaultColors.paytmColors.textBlack}
              />
            }
            label="Download Data"
          />
          <OptionRow
            icon={
              <FontAwesome
                name="info-circle"
                size={20}
                color={defaultColors.paytmColors.textBlack}
              />
            }
            label="About"
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
  value,
}: {
  icon: JSX.Element;
  label: string;
  url_path?: string;
  value?: string;
}) => {
  const router = useRouter()
  return (
    // <Link href={url_path || "/"} asChild>
    <TouchableOpacity
      style={styles.optionRow}
      onPress={() => router.push(url_path ?? "/")}
    >
      {icon}
      <Text style={styles.optionText}>{label}</Text>
      <View style={styles.optionRow}>
        {value && <Text style={styles.optionValue}>{value}</Text>}
        <FontAwesome name="chevron-right" size={20} color={darkGray} />
      </View>
    </TouchableOpacity>
    // </Link>
  );
};

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
    color: defaultColors.paytmColors.primaryBlue,
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
    color: defaultColors.paytmColors.textBlack,
    marginLeft: 15,
  },
  optionValue: {
    marginRight: 15,
    fontSize: 16,
    color: defaultColors.paytmColors.textBlack,
  },
});
