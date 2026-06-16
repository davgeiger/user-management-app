import { createContext } from "react";
import type { Action } from "../hooks/UserReducer";
import type { Dayjs } from "dayjs";

export type User = {
  id: string;
  username: string;
  birthday: Dayjs | null;
  email: string;
  address: string;
  gender: string;
  telephone: string;
  website: string;
};

export const UserContext = createContext<{
  users: User[];
  setUsers: React.Dispatch<Action>;
}>({ users: [], setUsers: () => {} });
