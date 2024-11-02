import { FormikHandlers } from "formik";

export interface ProfileValues {
    fullName: string;
    phoneNumber: string;
    email: string;
    location: string;
  }


export interface RenderInputProps {
  label: string;
  fieldName: keyof ProfileValues;
  handleChange: FormikHandlers["handleChange"];
  handleBlur: FormikHandlers["handleBlur"];
  value: string;
  error?: string;
  touched?: boolean;
  keyboardType?: "default" | "phone-pad" | "email-address";
}
