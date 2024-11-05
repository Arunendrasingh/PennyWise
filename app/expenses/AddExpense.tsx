import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";

const colorBlue = "#0666EB";
const darkGray = "#919191";
const lightGray = "#d9d9d9";

const AddTransactionScreen = () => {
  const [show, setShow] = useState<boolean>(false);
  const initialValues = {
    amount: "",
    category: "",
    note: "",
    date: new Date(),
    budget: "",
  };

  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    category: Yup.string().required("Category is required"),
    note: Yup.string(),
    budget: Yup.string().required("Budget is required"),
  });

  const handleFormSubmit = (values: typeof initialValues) => {
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
      onSubmit={handleFormSubmit}
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
          <View style={styles.amountSection}>
            <TextInput
              placeholder="Enter Amount"
              style={styles.amountInput}
              keyboardType="numeric"
              onChangeText={handleChange("amount")}
              onBlur={handleBlur("amount")}
              value={values.amount}
            />
            {touched.amount && errors.amount && (
              <Text style={styles.error}>{errors.amount}</Text>
            )}
          </View>

          {/* Other Details Section */}
          <View style={styles.detailsSection}>
            {/* Category Dropdown */}
            <View style={styles.inputRow}>
              <Icon name="category" size={24} color={darkGray} />
              <Dropdown
                style={styles.dropdown}
                placeholder="Select Category"
                data={[
                  { label: "Food", value: "food" },
                  { label: "Transport", value: "transport" },
                ]} // Example data
                labelField="label"
                valueField="value"
                value={values.category}
                onChange={(item) => setFieldValue("category", item.value)}
              />
              <Icon name="chevron-right" size={24} color={darkGray} />
            </View>
            {touched.category && errors.category && (
              <Text style={styles.error}>{errors.category}</Text>
            )}

            {/* Note Input */}
            <View style={styles.inputRow}>
              <Icon name="note" size={24} color={darkGray} />
              <TextInput
                placeholder="Note"
                style={styles.textInput}
                onChangeText={handleChange("note")}
                onBlur={handleBlur("note")}
                value={values.note}
              />
              <Icon name="chevron-right" size={24} color={darkGray} />
            </View>

            {/* Date Picker */}
            <Pressable
              onPress={() => setShow(!show)}
              style={styles.inputContainer}
            >
              <View style={styles.inputRow}>
                <Icon name="calendar-today" size={24} color={darkGray} />
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
              <Dropdown
                style={styles.dropdown}
                placeholder="Select Budget"
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
    padding: 20,
    justifyContent: "space-between",
  },
  amountSection: {
    borderBottomWidth: 1.5,
    borderColor: lightGray,
    paddingBottom: 10,
  },
  amountInput: {
    fontSize: 24,
    color: colorBlue,
    width: "79%",
    alignSelf: "center",
    textAlign: "center",
  },
  detailsSection: {
    // flex: 1,
    // justifyContent: 'space-between',
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: lightGray,
    paddingVertical: 10,
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
    paddingLeft: 10,
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
    fontSize: 12,
  },
});

export default AddTransactionScreen;
