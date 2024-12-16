import React, { createContext, useContext, useState } from "react";

// Create a UserContext
const UserContext = createContext();

// Custom hook for using the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to log in
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Store in localStorage
    setUser(userData);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
