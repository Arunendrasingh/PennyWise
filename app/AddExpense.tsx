import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Formik, setFieldValue } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colorBlue, darkGray } from "@/constants/Colors";
import { createLocalUser, getLocalUser } from "@/database/utils/userManager";

/**
 * AddExpense component
 *
 * This component is used to add new expense to the database.
 * It takes care of form validation, error handling and
 * submitting the form to the server.
 *
 * @returns {JSX.Element} AddExpense component
 */
const AddExpense = (): JSX.Element => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [items, setItems] = useState<{ label: string; value: string }[]>([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const initialValues = {
    amount: "",
    category: "",
    date: new Date(),
    note: "",
  };

  const addExpenseSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is Required!!")
      .min(1, "Amount cannot be zero")
      .positive("Amount must be positive")
      .integer(),
    category: Yup.string().required(),
    date: Yup.date().required(),
    note: Yup.string(),
  });

  const [show, setShow] = useState<boolean>(false);

  /**
   * On change handler for date picker
   *
   * @param {Date | null} selectedDate - selected date
   * @param {typeof setFieldValue} callable - function to call to update formik
   * @param {string} keyToUpdate - key to update in formik
   */
  const onDateSelect = (
    selectedDate: Date | undefined,
    callable: typeof setFieldValue,
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

  /**
   * Render error message
   *
   * @param {boolean | undefined} touchStatus - whether the field has been touched
   * @param {string | undefined} errorStatus - error message
   */
  const renderErrorMessage = (
    touchStatus: boolean | undefined,
    errorStatus: string | undefined
  ): JSX.Element | null => {
    try {
      return (
        <View>
          {touchStatus && errorStatus ? (
            <Text style={styles.errorText}>{errorStatus} </Text>
          ) : null}
        </View>
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const onAddExpenseSave =  async(values: typeof initialValues) => {
    console.log("Form Values: ", values);

    let getUser = await getLocalUser();

    if (getUser.length == 0){
      let newUser = await createLocalUser("Admin", "admin@gmail.com")


      console.log("Newly Created User: ", newUser)
    }

    console.log("Users are: ", getUser[0].collections)
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={initialValues}
        validationSchema={addExpenseSchema}
        onSubmit={(values) => onAddExpenseSave(values)}
      >
        {({
          handleChange,
          setFieldValue,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.header}>
              <AntDesign name="close" size={24} color="black" />
              <Text style={styles.headerText}>Add Transaction</Text>
              <Pressable onPress={handleSubmit}>
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
            {/* Form Container */}
            <View style={styles.formContainer}>
              {/* Amount Input */}
              <View style={styles.amountContainer}>
                <Text style={{ fontWeight: "regular", fontSize: 23 }}>
                  Amount
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="dollar" style={styles.rightIconStyle} />
                  <TextInput
                    style={styles.amountInput}
                    placeholder="Amount"
                    keyboardType="numeric"
                    value={values.amount}
                    onChangeText={handleChange("amount")}
                  />
                </View>
              </View>
              {renderErrorMessage(touched.amount, errors.amount)}
              {/* Category Dropdown */}
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.leftIconStyle}
                  data={items}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select Category" : "..."}
                  searchPlaceholder="Search..."
                  value={values.category}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item: { label: string; value: string }) => {
                    setFieldValue("category", item.value);
                    setIsFocus(false);
                  }}
                  renderRightIcon={() => (
                    <MaterialCommunityIcons
                      name="greater-than"
                      size={24}
                      style={styles.rightIconStyle}
                    />
                  )}
                  renderLeftIcon={() => (
                    <MaterialIcons
                      style={styles.leftIconStyle}
                      name="category"
                    />
                  )}
                  containerStyle={styles.dropdownModalStyle}
                />
                {renderErrorMessage(touched.category, errors.category)}
              </View>
              {/* Description Input */}
              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="edit-note"
                    style={styles.leftIconStyle}
                  />
                  <TextInput
                    style={styles.amountInput}
                    placeholderTextColor={darkGray}
                    placeholder="Add Note"
                  />
                </View>
                <MaterialCommunityIcons
                  name="greater-than"
                  style={styles.rightIconStyle}
                />
              </View>
              <View>
                <Pressable
                  onPress={() => setShow(!show)}
                  style={styles.inputContainer}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="calendar" style={styles.leftIconStyle} />
                    <Text>
                      {values.date?.toLocaleDateString()
                        ? values.date?.toLocaleDateString()
                        : "Select Date"}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="greater-than"
                    style={styles.rightIconStyle}
                  />
                </Pressable>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={values.date || new Date()}
                    is24Hour={true}
                    onChange={(_, selectedDate) =>
                      onDateSelect(selectedDate, setFieldValue, "date")
                    }
                  />
                )}
              </View>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  saveButtonText: {
    color: colorBlue,
    fontSize: 16,
  },
  formContainer: {
    height: 500,
  },
  amountInput: {
    marginLeft: 5,
    fontSize: 16,
  },
  amountContainer: {
    paddingHorizontal: 5,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.4,
    borderBottomColor: "gray",
    marginHorizontal: 8,
  },
  inputContainer: {
    width: "100%",
    height: 60,
    paddingLeft: 5,
    paddingRight: 21,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
  },
  dropdownContainer: {
    width: "100%",
    height: 60,
    paddingHorizontal: 5,
  },
  categoryDropdown: {
    flex: 1,
  },
  dropdownModalStyle: {
    borderWidth: 2,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 500,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  leftIconStyle: {
    alignSelf: "center",
    fontSize: 24,
    marginRight: 10,
    color: colorBlue,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  rightIconStyle: {
    color: darkGray,
    fontSize: 18,
  },
  errorText: {
    color: "crimson",
    padding: 10,
    fontSize: 15,
    fontWeight: "semibold",
  },
});
