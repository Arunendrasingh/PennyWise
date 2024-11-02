import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import RenderInputBox from "@/components/RenderInput";
import { ProfileValues } from "@/config/types";

const ProfileUpdateScreen: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string()
      .matches(/^\d]+$/, "Phone number must be digits")
      .required("Phone Number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    location: Yup.string().required("Location is required"),
  });

  const handleSave = (values: ProfileValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        phoneNumber: "",
        email: "",
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
            <Text style={styles.profileName}>
              {/* {values.fullName || "Profile Name"} */}
              This is text
            </Text>
            <Pressable
              onPress={() => {
                /* add image picker functionality here */
              }}
            >
              <Text style={styles.editLink}>Edit Photo</Text>
            </Pressable>
          </View>

          {/* Section 2: Profile Details */}
          <View style={styles.section2}>
            {
              <RenderInputBox
                label="Full Name"
                fieldName="fullName"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.fullName}
                error={errors.fullName}
                touched={touched.fullName}
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
                keyboardType="phone-pad"
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
            <Pressable
              style={styles.saveButton}
              onPress={handleSubmit as () => void}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

// const renderInput = ({
//   label,
//   fieldName,
//   handleChange,
//   handleBlur,
//   value,
//   error,
//   touched,
//   keyboardType = "default",
// }: RenderInputProps) => (
//   <>
//     <Text style={styles.optionLabel}>{label}</Text>
//     <TextInput
//       style={styles.inputBox}
//       placeholder={`Enter ${label.toLowerCase()}`}
//       value={value}
//       onChangeText={handleChange(fieldName)}
//       onBlur={handleBlur(fieldName)}
//       keyboardType={keyboardType}
//     />
//     {error && touched && <Text style={styles.errorText}>{error}</Text>}
//   </>
// );

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
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 12, marginTop: 4 },
});

export default ProfileUpdateScreen;
