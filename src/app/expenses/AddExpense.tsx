import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  createExpenseWithBudgetUpdate,
} from "@/src/database/utils/expenseManager";
import { ExpenseType } from "@/src/config/types";
import expenseTrackerStore from "@/src/store/expenseTracker";
import { useStore } from "zustand";
import { defaultColors } from "@/src/constants/Colors";
import useBudgets from "@/src/hooks/useBudgets";

const AddTransactionScreen = () => {
  const [show, setShow] = useState<boolean>(false);

  const { user } = useStore(expenseTrackerStore);

  const budgets = useBudgets(0, 100);
  const initialValues: ExpenseType = {
    notes: "",
    amount: "",
    date: new Date(),
    budget_id: "",
    user_id: user?.id,
  };

  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    budget_id: Yup.string().required("Budget is required"),
    notes: Yup.string().optional(),
  });

  const handleFormSubmit = (values: typeof initialValues, resetForm: any) => {
    try {
      const newExpense = createExpenseWithBudgetUpdate(values.notes, parseFloat(values.amount), values.date, values.budget_id, user.id);
      resetForm();
      console.log("This is a new Expense: ", newExpense);
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
                onChangeText={(value) => setFieldValue("amount", value)}
                onBlur={handleBlur("amount")}
                value={values.amount}
                textAlign="center"
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
              <Icon
                name="attach-money"
                size={24}
                color={defaultColors.paytmColors.textBlack}
              />
              <Text style={styles.label}>Budget</Text>
              <Dropdown
                style={styles.dropdown}
                placeholder=""
                selectedTextStyle={styles.selectedTextStyle}
                data={budgets} // Example data
                labelField="title"
                valueField="id"
                iconStyle={{ display: "none" }}
                value={values.budget_id}
                onChange={(item) => setFieldValue("budget_id", item.id)}
              />
              <Icon
                name="chevron-right"
                size={24}
                color={defaultColors.paytmColors.textBlack}
              />
            </View>
            {touched.budget_id && errors.budget_id && (
              <Text style={styles.error}>{errors.budget_id}</Text>
            )}

            {/* Note Input */}
            <View style={styles.inputRow}>
              <Icon
                name="note"
                size={24}
                color={defaultColors.paytmColors.textBlack}
              />
              <TextInput
                placeholder="Note"
                style={styles.textInput}
                onChangeText={handleChange("notes")}
                onBlur={handleBlur("notes")}
                value={values.notes}
              />
              <Icon
                name="chevron-right"
                size={24}
                color={defaultColors.paytmColors.textBlack}
              />
            </View>

            {/* Date Picker */}
            <Pressable onPress={() => setShow(!show)}>
              <View style={styles.inputRow}>
                <Icon
                  name="calendar-today"
                  size={24}
                  color={defaultColors.paytmColors.textBlack}
                />
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
                <Icon
                  name="chevron-right"
                  size={24}
                  color={defaultColors.paytmColors.textBlack}
                />
              </View>
            </Pressable>

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
    borderColor: defaultColors.paytmColors.secondaryTextGray,
    paddingBottom: 10,
    paddingTop: 40,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
  amountInput: {
    fontSize: 24,
    color: defaultColors.paytmColors.textBlack,
  },
  label: {
    fontSize: 16,
    color: defaultColors.paytmColors.secondaryTextGray,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: defaultColors.paytmColors.secondaryTextGray,
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
    color: defaultColors.paytmColors.secondaryTextGray,
    paddingRight: 10,
    textAlign: "right",
  },
  buttonSection: {
    marginTop: 20,
  },
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
  error: {
    color: "red",
    fontSize: 15,
  },
});

export default AddTransactionScreen;
