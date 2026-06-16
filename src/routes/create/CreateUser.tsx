import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import "./createuser.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContext, useEffect, useState } from "react";
import { UserContext, type User } from "../../context/UserContext";
import dayjs, { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";
import { validate, type FormErrors } from "./validation";

export default function CreateUser() {
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(new Date()));
  const [gender, setGender] = useState("male");

  const { itemId } = useParams();
  const context = useContext(UserContext);

  const [inputValues, setInputValues] = useState<User>({
    id: "",
    username: "",
    birthday: dateValue,
    email: "",
    address: "",
    gender: gender,
    telephone: "",
    website: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const foundUser = itemId
    ? context.users.find((user) => user.id === itemId)
    : undefined;

  useEffect(() => {
    if (foundUser) {
      setInputValues({
        ...foundUser,
      });

      setDateValue(foundUser.birthday ? dayjs(foundUser.birthday) : null);
      setGender(foundUser.gender);
    }
  }, [foundUser]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValues = {
      ...inputValues,
      [e.target.name]: e.target.value,
    };

    setInputValues(newValues);
    setErrors(validate(newValues));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched((prev) => ({
      ...prev,
      [e.target.name]: true,
    }));
  }

  function handleSelectChange(e: SelectChangeEvent) {
    setGender(e.target.value);
  }

  if (itemId && !foundUser) {
    return <h1>User not found</h1>;
  }

  const isFormValid = Object.keys(validate(inputValues)).length === 0;

  return (
    <>
      <div className="form-container">
        <div className="form-input">
          <span>Username</span>
          <TextField
            variant="filled"
            sx={{ width: "50ch" }}
            name="username"
            onChange={handleInputChange}
            value={inputValues.username}
            onBlur={handleBlur}
            error={touched.username && !!errors.username}
            helperText={touched.username ? errors.username : ""}
          />
        </div>
        <div className="form-input">
          <span>Geburtsdatum</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "50ch" }}
              name="birthday"
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              value={dateValue}
            />
          </LocalizationProvider>
        </div>
        <div className="form-input">
          <span>Geschlecht</span>
          <FormControl variant="filled" sx={{ width: "50ch" }}>
            <Select onChange={handleSelectChange} name="gender" value={gender}>
              <MenuItem value="male">Männlich</MenuItem>
              <MenuItem value="female">Weiblich</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-input">
          <span>Email Adresse</span>
          <TextField
            variant="filled"
            sx={{ width: "50ch" }}
            name="email"
            onChange={handleInputChange}
            value={inputValues.email}
            onBlur={handleBlur}
            error={touched.email && !!errors.email}
            helperText={touched.email ? errors.email : ""}
          />
        </div>
        <div className="form-input">
          <span>Post Adresse</span>
          <TextField
            variant="filled"
            sx={{ width: "50ch" }}
            name="address"
            onChange={handleInputChange}
            value={inputValues.address}
            onBlur={handleBlur}
            error={touched.address && !!errors.address}
            helperText={touched.address ? errors.address : ""}
          />
        </div>
        <div className="form-input">
          <span>Telefonnummer</span>
          <TextField
            variant="filled"
            sx={{ width: "50ch" }}
            name="telephone"
            onChange={handleInputChange}
            value={inputValues.telephone}
            onBlur={handleBlur}
            error={touched.telephone && !!errors.telephone}
            helperText={touched.telephone ? errors.telephone : ""}
          />
        </div>
        <div className="form-input">
          <span>Webseite</span>
          <TextField
            variant="filled"
            sx={{ width: "50ch" }}
            name="website"
            onChange={handleInputChange}
            value={inputValues.website}
            onBlur={handleBlur}
            error={touched.website && !!errors.website}
            helperText={touched.website ? errors.website : ""}
          />
        </div>
        {itemId ? (
          <Button
            disabled={!isFormValid}
            onClick={() => {
              context.setUsers({
                type: "EDIT",
                value: {
                  ...inputValues,
                  id: itemId,
                  birthday: dateValue,
                  gender: gender,
                },
              });
            }}
            className="btn-submit"
            variant="contained"
          >
            Edit
          </Button>
        ) : (
          <Button
            disabled={!isFormValid}
            onClick={() => {
              context.setUsers({
                type: "ADD",
                value: {
                  ...inputValues,
                  birthday: dateValue,
                  gender: gender,
                },
              });
            }}
            className="btn-submit"
            variant="contained"
          >
            Submit
          </Button>
        )}
      </div>
    </>
  );
}
