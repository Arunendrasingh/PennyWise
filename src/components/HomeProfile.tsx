import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import icons from "../constant/icons";
import { useAuthContext } from "../context/AuthContext";

const HomeProfile = () => {

  const {user} = useAuthContext();

  console.log(user);
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileImageContainer}>
        <Image source={user?.avatar? {uri: user.avatar} :icons.Profile} style={styles.profileImage} />
        <View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileText}>Hello</Text>
          </View>
          <Text style={styles.normalText}>{user?.name}</Text>
        </View>
      </View>
      <View style={styles.bellContainer}>
        <FontAwesome name="bell-o" size={24} color="black" />
        <View style={styles.badge}>
          <Text style={styles.badgeText} />
        </View>
      </View>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
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
  // Badge Container
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
