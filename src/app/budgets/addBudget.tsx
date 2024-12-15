import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";
import useCategories from "@/src/hooks/useCategories";
// import { createBudget } from "@/src/database/utils/budgetManager"; // Replace with your budget creation function
import expenseTrackerStore from "@/src/store/expenceTracker";
import { useStore } from "zustand";
import { defaultColors } from "@/src/constants/Colors";
import { createBudgets } from "@/src/database/utils/budgetManager";

const addBudget = () => {
  const [showStartDatePicker, setShowStartDatePicker] =
    useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const { user } = useStore(expenseTrackerStore);

  const categories = useCategories();
  const initialValues = {
    name: "",
    amount: 0,
    startDate: new Date(),
    endDate: new Date(),
    category_id: "",
    user_id: user.id,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Budget name is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    category_id: Yup.string().required("Category is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
  });

  const handleFormSubmit = (values: typeof initialValues, resetForm: any) => {
    try {
        console.log("Creating new Budget")
        const newBudget = createBudgets(
            values.name,
            values.amount,
            values.startDate,
            values.endDate,
            values.category_id,
            values.user_id
        )

        resetForm()
        console.log(newBudget)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          {/* Budget Name */}
          <View style={styles.inputRow}>
            <Icon
              name="edit"
              size={24}
              color={defaultColors.paytmColors.textBlack}
            />
            <TextInput
              placeholder="Budget Name"
              style={styles.textInput}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
          </View>
          {touched.name && errors.name && (
            <Text style={styles.error}>{errors.name}</Text>
          )}

          {/* Budget Amount */}
          <View style={styles.inputRow}>
            <Icon
              name="attach-money"
              size={24}
              color={defaultColors.paytmColors.textBlack}
            />
            <TextInput
              placeholder="Enter Amount"
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(value) => setFieldValue("amount", value)}
              onBlur={handleBlur("amount")}
              value={values.amount}
            />
          </View>
          {touched.amount && errors.amount && (
            <Text style={styles.error}>{errors.amount}</Text>
          )}

          {/* Category Dropdown */}
          <View style={styles.inputRow}>
            <Icon
              name="category"
              size={24}
              color={defaultColors.paytmColors.textBlack}
            />
            <Dropdown
              style={styles.dropdown}
              placeholder="Select Category"
              data={categories}
              labelField="name"
              valueField="id"
              value={values.category_id}
              onChange={(item) => setFieldValue("category_id", item.id)}
            />
          </View>
          {touched.category_id && errors.category_id && (
            <Text style={styles.error}>{errors.category_id}</Text>
          )}

          {/* Start Date Picker */}
          <Pressable onPress={() => setShowStartDatePicker(true)}>
            <View style={styles.inputRow}>
              <Icon
                name="calendar-today"
                size={24}
                color={defaultColors.paytmColors.textBlack}
              />
              <Text style={styles.label}>Start Date</Text>
              <Text style={styles.dateText}>
                {values.startDate.toLocaleDateString()}
              </Text>
            </View>
          </Pressable>
          {showStartDatePicker && (
            <DateTimePicker
              value={values.startDate}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => {
                setShowStartDatePicker(false);
                setFieldValue("startDate", selectedDate || values.startDate);
              }}
            />
          )}
          {touched.startDate && errors.startDate && (
            <Text style={styles.error}>{errors.startDate}</Text>
          )}

          {/* End Date Picker */}
          <Pressable onPress={() => setShowEndDatePicker(true)}>
            <View style={styles.inputRow}>
              <Icon
                name="calendar-today"
                size={24}
                color={defaultColors.paytmColors.textBlack}
              />
              <Text style={styles.label}>End Date</Text>
              <Text style={styles.dateText}>
                {values.endDate.toLocaleDateString()}
              </Text>
            </View>
          </Pressable>
          {showEndDatePicker && (
            <DateTimePicker
              value={values.endDate}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => {
                setShowEndDatePicker(false);
                setFieldValue("endDate", selectedDate || values.endDate);
              }}
            />
          )}
          {touched.endDate && errors.endDate && (
            <Text style={styles.error}>{errors.endDate}</Text>
          )}

          {/* Submit Button */}
          <View style={styles.buttonSection}>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Add Budget</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  // Reuse styles from AddTransactionScreen
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputRow: {
    flexDirection: "row",
    // alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: defaultColors.paytmColors.backgroundWhite,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  textInput: { flex: 1, paddingLeft: 10 },
  dropdown: { flex: 1, paddingLeft: 10 },
  dateText: {
    flex: 1,
    color: defaultColors.paytmColors.secondaryTextGray,
    textAlign: "right",
  },
  label: {
    fontSize: 16,
    color: defaultColors.paytmColors.secondaryTextGray,
    paddingLeft: 10,
  },
  buttonSection: { marginTop: 20 },
  submitButton: {
    backgroundColor: defaultColors.paytmColors.primaryBlue,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: defaultColors.paytmColors.backgroundWhite,
    fontSize: 16,
  },
  error: { color: "red", fontSize: 15 },
});

export default addBudget;
