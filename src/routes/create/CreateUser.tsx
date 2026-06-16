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

  const foundUser = itemId
    ? context.users.find((user) => user.id === itemId)
    : null;

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
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  }
  function handleSelectChange(e: SelectChangeEvent) {
    setGender(e.target.value);
  }

  if (itemId) {
    if (!foundUser) return <div>User not found</div>;
    const initialValues = {
      ...foundUser,
      birthday: foundUser.birthday ? dayjs(foundUser.birthday) : null,
    };

    const isChanged =
      JSON.stringify(inputValues) !== JSON.stringify(initialValues) ||
      dateValue !== initialValues.birthday ||
      gender !== initialValues.gender;

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
              <Select
                onChange={handleSelectChange}
                name="gender"
                value={gender}
              >
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
            />
          </div>
          <Button
            disabled={!isChanged}
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
        </div>
      </>
    );
  }

  // No User selected
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
          />
        </div>
        <div className="form-input">
          <span>Post Adresse</span>
          <TextField
            variant="filled"
            sx={{ width: "50ch" }}
            name="address"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-input">
          <span>Telefonnummer</span>
          <TextField
            variant="filled"
            sx={{ width: "50ch" }}
            name="telephone"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-input">
          <span>Webseite</span>
          <TextField
            variant="filled"
            sx={{ width: "50ch" }}
            name="website"
            onChange={handleInputChange}
          />
        </div>
        <Button
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
      </div>
    </>
  );
}
