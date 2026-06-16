import type { User } from "../context/UserContext";

export type Action =
  | { type: "ADD"; value: User }
  | { type: "EDIT"; value: User }
  | { type: "DELETE"; value: string };

export default function userReducer(state: User[], action: Action) {
  switch (action.type) {
    case "ADD":
      {
        const uuid = self.crypto.randomUUID();
        return [...state, { ...action.value, id: uuid }];
      }
      break;
    case "EDIT":
      {
        console.log(action.value);
        const filtered = state.filter((user) => user.id !== action.value.id);

        return [...filtered, action.value];
      }
      break;

    case "DELETE": {
      return state.filter((user) => user.id !== action.value);
    }

    default:
      return state;
  }
}
