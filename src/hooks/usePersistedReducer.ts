import { useEffect, useReducer } from "react";
import type { User } from "../context/UserContext";
import type { Action } from "./UserReducer";

export function usePersistedReducer(
  reducer: React.Reducer<User[], Action>,
  key: string,
  init: User[],
) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as User[]) : init;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch] as const;
}
