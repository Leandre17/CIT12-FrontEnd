import React, { createContext, useContext, useState, useEffect } from "react";

// Create a UserContext
const UserContext = createContext();

// Custom hook for using the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    console.log("Saved User in LocalStorage:", savedUser); // Debug
    if (savedUser) {
        setUser(JSON.parse(savedUser));
    }
    setLoading(false);
}, []);

  // Function to log in
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // userData will contain { id, username }
};

  // Function to log out
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};