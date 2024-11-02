import { RenderInputProps } from "@/config/types";
import { StyleSheet, TextInput, Text } from "react-native";

const RenderInputBox = ({
  label,
  fieldName,
  handleChange,
  handleBlur,
  value,
  error,
  touched,
  keyboardType = "default",
}: RenderInputProps) => (
  <>
    <Text style={styles.optionLabel}>{label}</Text>
    <TextInput
      style={styles.inputBox}
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      onChangeText={handleChange(fieldName)}
      onBlur={handleBlur(fieldName)}
      keyboardType={keyboardType}
    />
    {error && touched && <Text style={styles.errorText}>{error}</Text>}
  </>
);

const styles = StyleSheet.create({
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
  errorText: { color: "red", fontSize: 12, marginTop: 4 },
});

export default RenderInputBox;
