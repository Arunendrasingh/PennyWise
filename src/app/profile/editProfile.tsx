import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import RenderInputBox from "@/src/components/RenderInput";
import { ProfileValues } from "@/src/config/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  createUser,
  getUserById,
  updateUser,
} from "@/src/database/utils/userManager";
import { User } from "@/src/database/models";
import { useStore } from "zustand";
import expenseTrackerStore from "@/src/store/expenceTracker";

const ProfileUpdateScreen: React.FC = () => {
  const navigate = useNavigation();

  const { userId }: { userId: string } = useLocalSearchParams();

  const { user, setUser } = useStore(expenseTrackerStore);

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone Number must be digits")
      .length(10, "Phone Number must be 10 digits")
      .required("Phone Number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    location: Yup.string().required("Location is required"),
  });

  useEffect(() => {
    // Fetch profile details from the database
    // and set them in the state
    async function loadUserWithId(userId: string) {
      const user = await getUserById(userId);
      if (user) {
        setUser(user);
      }
    }
    if (userId) {
      loadUserWithId(userId);
    }
  }, []);

  // when userId is provided, then component must show the loading state
  if (!user && userId) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleSave = async (values: ProfileValues) => {
    if (userId && user) {
      const updatedUser = await updateUser(userId, values);
      if (updatedUser) {
        setUser(updatedUser);
        navigate.goBack();
      }
    } else {
      const newUser = await createUser(
        values.name,
        values.email,
        values.phoneNumber
      );
      if (newUser) {
        setUser(newUser);
        navigate.goBack();
      }
    }
  };

  // saveButtonStatus
  const enableDisableSaveButton = (values: ProfileValues): boolean => {
    if (user) {
      return (
        values.name === user?.name &&
        values.phoneNumber === user?.phoneNumber &&
        values.email === user?.email
      );
    }

    return false;
  };

  return (
    <Formik
      initialValues={{
        name: user ? user.name : "",
        phoneNumber: user ? user.phoneNumber : "",
        email: user ? user.email : "",
        location: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSave(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          {/* Section 1: Profile Image & Name */}
          <View style={styles.section1}>
            <Image
              source={
                profilePhoto
                  ? { uri: profilePhoto }
                  : require("@/assets/images/profile/profile.png")
              }
              style={styles.profileImage}
            />

            <Pressable
              onPress={() => {
                /* add image picker functionality here */
              }}
            >
              <Text style={styles.editLink}>Edit Profile Photo</Text>
            </Pressable>
          </View>

          {/* Section 2: Profile Details */}
          <View style={styles.section2}>
            {
              <RenderInputBox
                label="Full Name"
                fieldName="name"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.name}
                error={errors.name}
                touched={touched.name}
              />
            }
            {
              <RenderInputBox
                label="Phone Number"
                fieldName="phoneNumber"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.phoneNumber}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
                keyboardType="number-pad"
                editable={!user}
              />
            }
            {
              <RenderInputBox
                label="Email"
                fieldName="email"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                editable={!user}
              />
            }
            {
              <RenderInputBox
                label="Location"
                fieldName="location"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.location}
                error={errors.location}
                touched={touched.location}
              />
            }
          </View>

          {/* Section 3: Save Button */}
          <View style={styles.section3}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                enableDisableSaveButton(values) && styles.disabledSaveButton,
              ]}
              onPress={handleSubmit as () => void}
              disabled={enableDisableSaveButton(values)}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  section1: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  profileName: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  editLink: { color: "#0666EB", textDecorationLine: "underline" },
  section2: { marginBottom: 20 },
  optionLabel: { fontSize: 16, marginVertical: 8, color: "#333" },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    height: 55,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  section3: { alignItems: "center" },
  saveButton: {
    backgroundColor: "#0666EB",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  disabledSaveButton: {
    backgroundColor: "#064536EB",
  },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 12, marginTop: 4 },
});

export default ProfileUpdateScreen;
