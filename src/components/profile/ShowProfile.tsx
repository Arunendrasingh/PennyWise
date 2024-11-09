import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import { colorBlue, darkGray } from "@/src/constants/Colors";
import { checkExistingUser } from "@/src/database/utils/userManager";
import { User } from "@/src/database/models";
import { useStore } from "zustand";
import expenseTrackerStore from "@/src/store/expenceTracker";

const ShowProfile = (): JSX.Element => {
  // const [user, setUser] = useState<User | null>(null);
  const { user} = useStore(expenseTrackerStore);
  return (
    <View style={styles.profileHeader}>
      {/* <Text style={styles.headerText}>Profile</Text> */}
      <View style={styles.imageSection}>
        <Image
          source={require("@/assets/images/profile/profile.png")}
          style={styles.profileImage}
        />

        {user && <Text style={styles.profileName}>{user.name}</Text>}
        <TouchableOpacity>
          <Link
            href={{
              pathname: "/profile/editProfile",
              params: { userId: user?.id },
            }}
          >
            <Text style={styles.editProfileText}>
              {user === null ? "Added New User" : "Edit Profile"}
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ShowProfile;
