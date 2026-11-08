"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import usersJson from "../database/users.json";

export type User = (typeof usersJson)[number];

export const emptyUser: User = {
  _id: "",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "STUDENT",
  loginId: "",
  section: "",
  lastActivity: "",
  totalActivity: "",
};

type AccountContextValue = {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;

  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(usersJson);
  const addUser = (user: User) => setUsers((rows) => [...rows, user]);
  const updateUser = (user: User) => {
    setUsers((rows) => rows.map((row) => (row._id === user._id ? user : row)));
    if (currentUser?._id === user._id) setCurrentUser(user);
  };
  return (
    <AccountContext.Provider
      value={{ currentUser, setCurrentUser, users, addUser, updateUser }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const value = useContext(AccountContext);
  if (!value) {
    throw new Error("useAccountContext must be used inside AccountProvider");
  }
  return value;
}
