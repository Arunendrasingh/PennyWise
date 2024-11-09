import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";
import useCategories from "@/src/hooks/useCategories";
import { createExpense } from "@/src/database/utils/expenseManager";
import { ExpenseType } from "@/src/config/types";
import expenseTrackerStore from "@/src/store/expenceTracker";
import { useStore } from "zustand";

const colorBlue = "#0666EB";
const darkGray = "#919191";
const lightGray = "#d9d9d9";

const AddTransactionScreen = () => {
  const [show, setShow] = useState<boolean>(false);

  const { user } = useStore(expenseTrackerStore);

  const categories = useCategories();
  const initialValues: ExpenseType = {
    notes: "",
    amount: "",
    date: new Date(),
    category_id: "",
    user_id: "",
  };

  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    category_id: Yup.string().required("Category is required"),
    notes: Yup.string().optional(),
    budget: Yup.string().required("Budget is required"),
  });

  const handleFormSubmit = (values: typeof initialValues, resetForm: any) => {
    try {
      const newExpense = createExpense(
        values.notes,
        parseFloat(values.amount),
        values.date,
        values.category_id,
        user.id
      );
      resetForm();
      console.log(newExpense);
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  };

  const onDateSelect = (
    selectedDate: Date | undefined,
    callable: any,
    keyToUpdate: string
  ): void => {
    if (selectedDate === undefined) {
      return;
    }
    try {
      setShow(false);
      callable(keyToUpdate, selectedDate);
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
          {/* Amount Section */}
          <View>
            <View style={styles.amountSection}>
              <TextInput
                placeholder="Enter Amount"
                style={styles.amountInput}
                keyboardType="numeric"
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                value={values.amount?.toString()}
              />
            </View>
            {touched.amount && errors.amount && (
              <Text style={styles.error}>{errors.amount}</Text>
            )}
          </View>

          {/* Other Details Section */}
          <View style={styles.detailsSection}>
            {/* Category Dropdown */}
            <View style={styles.inputRow}>
              <Icon name="category" size={24} color={colorBlue} />
              <Text style={styles.label}>Category</Text>
              <Dropdown
                style={styles.dropdown}
                placeholder=""
                selectedTextStyle={styles.selectedTextStyle}
                data={categories} // Example data
                labelField="name"
                valueField="id"
                iconStyle={{ display: "none" }}
                value={values.category_id}
                onChange={(item) => setFieldValue("category_id", item.id)}
              />
              <Icon name="chevron-right" size={24} color={colorBlue} />
            </View>
            {touched.category_id && errors.category_id && (
              <Text style={styles.error}>{errors.category_id}</Text>
            )}

            {/* Note Input */}
            <View style={styles.inputRow}>
              <Icon name="note" size={24} color={colorBlue} />
              <TextInput
                placeholder="Note"
                style={styles.textInput}
                onChangeText={handleChange("notes")}
                onBlur={handleBlur("notes")}
                value={values.notes}
              />
              <Icon name="chevron-right" size={24} color={colorBlue} />
            </View>

            {/* Date Picker */}
            <Pressable onPress={() => setShow(!show)}>
              <View style={styles.inputRow}>
                <Icon name="calendar-today" size={24} color={darkGray} />
                <Text style={styles.label}>Date</Text>
                {show && (
                  <DateTimePicker
                    value={values.date}
                    mode="date"
                    display="default"
                    onChange={(_, selectedDate) =>
                      onDateSelect(selectedDate, setFieldValue, "date")
                    }
                  />
                )}
                <Text style={styles.dateText}>
                  {values.date.toLocaleDateString()}
                </Text>
                <Icon name="chevron-right" size={24} color={darkGray} />
              </View>
            </Pressable>

            {/* Budget Dropdown */}
            <View style={styles.inputRow}>
              <Icon name="attach-money" size={24} color={darkGray} />
              <Text style={styles.label}>Budget</Text>
              <Dropdown
                style={styles.dropdown}
                placeholder=""
                iconStyle={{ display: "none" }} // hide the dropdown icon
                selectedTextStyle={styles.selectedTextStyle}
                data={[
                  { label: "Monthly", value: "monthly" },
                  { label: "Weekly", value: "weekly" },
                ]} // Example data
                labelField="label"
                valueField="value"
                value={values.budget}
                onChange={(item) => setFieldValue("budget", item.value)}
              />
              <Icon name="chevron-right" size={24} color={darkGray} />
            </View>
            {touched.budget && errors.budget && (
              <Text style={styles.error}>{errors.budget}</Text>
            )}
          </View>

          {/* Submit Button Section */}
          <View style={styles.buttonSection}>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Add Transaction</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-around",
  },
  amountSection: {
    borderBottomWidth: 1.5,
    borderColor: lightGray,
    paddingBottom: 10,
    paddingTop: 40,
    flexDirection: "row",
  },
  amountInput: {
    fontSize: 24,
    color: colorBlue,
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: darkGray,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: darkGray,
    fontWeight: "bold",
    paddingRight: 10,
    textAlign: "right",
  },
  detailsSection: {
    flex: 0.6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dropdown: {
    flex: 1,
    paddingLeft: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
  },
  dateText: {
    flex: 1,
    color: darkGray,
    paddingRight: 10,
    textAlign: "right",
  },
  buttonSection: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: colorBlue,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 15,
  },
});

export default AddTransactionScreen;
