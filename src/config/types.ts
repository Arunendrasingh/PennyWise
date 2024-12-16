import { FormikHandlers } from "formik";

export interface ProfileValues {
  name: string;
  phoneNumber: string;
  email: string;
  location?: string;
}

export interface RenderInputProps {
  label: string;
  fieldName: keyof ProfileValues;
  handleChange: FormikHandlers["handleChange"];
  handleBlur: FormikHandlers["handleBlur"];
  value: string;
  error?: string;
  touched?: boolean;
  keyboardType?: "default" | "phone-pad" | "email-address" | "number-pad";
  editable?: boolean;
}

// Store type

// Category type
export type IconLibrary = "MaterialIcons" | "AntDesign" | string;

export type CategoryType = {
  id: string;
  name: string;
  icon: string;
  iconLibrary: IconLibrary;
  description: string;
};

// Expense tracker
export type ExpenseType = {
  id?: string;
  notes: string;
  amount: string | number;
  date: Date;
  budget_id: string;
  user_id: string;
  budget?: string;
};
