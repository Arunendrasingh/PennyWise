import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import images from "../constant/images";
import { defaultColors } from "../constant/Color";
import { login } from "../lib/appwrite";
import { useAuthContext } from "../context/AuthContext";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { loading, isLogged, refetch } = useAuthContext();

  if (loading) return <ActivityIndicator size="large" color="#00ff00" />;

  if (!loading && isLogged) {
    return <Redirect href="/" />;
  }

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to Login");
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.onboarding}
        resizeMode="cover"
        style={styles.images}
      >
        <View style={styles.singInContainer}>
          <TouchableOpacity onPress={() => handleLogin()}>
            <View style={styles.signInButton}>
              <Image source={images.googleIcon} resizeMode="stretch" />
              <Text style={styles.signInText}>Sign In with google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
  },
  images: {
    flex: 1,
    justifyContent: "center",
  },
  singInContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  signInButton: {
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
    padding: 10,
    borderRadius: 30,
    width: 250,
    shadowColor: defaultColors.paytmColors.primaryBlue,
    shadowOpacity: 0.5,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  signInText: {
    color: defaultColors.paytmColors.textBlack,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 15,
  },
});
