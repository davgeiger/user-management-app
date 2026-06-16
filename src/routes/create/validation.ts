import type { User } from "../../context/UserContext";

export type FormErrors = {
  username?: string;
  email?: string;
  address?: string;
  telephone?: string;
  website?: string;
};

export function validate(values: User): FormErrors {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors: FormErrors = {};

  if (!values.username.trim()) {
    errors.username = "Username is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.address.trim()) {
    errors.address = "Address is required";
  }

  if (!values.telephone.trim()) {
    errors.telephone = "Telephone is required";
  } else if (!/^[\d\s()+-]+$/.test(values.telephone)) {
    errors.telephone = "Telephone contains invalid characters";
  }

  if (!values.website.trim()) {
    errors.website = "Website is required";
  }

  return errors;
}
