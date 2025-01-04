import { Image, StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import images from "../constant/images";
import { defaultColors } from "../constant/Color";

const SignIn = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.onboarding}
        resizeMode="cover"
        style={styles.images}
      >
        <View style={styles.singInContainer}>
          <View style={styles.signInButton}>
            <Image source={images.googleIcon} resizeMode="stretch" />
            <Text style={styles.signInText}>Sign In with google</Text>
          </View>
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
    borderWidth: 1,
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
