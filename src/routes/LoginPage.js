import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext"; // Import UserContext

const LoginPage = () => {
  const { login, user, logout } = useUser(); // Get login and logout functions
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // For add user
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [addUserMessage, setAddUserMessage] = useState("");

  // Handle login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get(
        "https://localhost:7182/api/User/Login",
        {
          params: { email: username, password },
        }
      );

      if (response.status === 200) {
        console.log("Login Response:", response.data); // Debug backend response
        const { userId, username } = response.data;
        login({ id: userId, username }); // Save userId and username in context
        console.log("UserContext Saved:", { id: userId, username });
      }
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError("Invalid credentials. Please try again.");
    }
  };

  // Handle add user form
  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddUserMessage("");

    try {
      const response = await axios.post(
        "https://localhost:7182/api/User/AddViaFunction",
        null,
        {
          params: {
            username: newUsername,
            email: newEmail,
            password: newPassword,
          },
        }
      );

      if (response.status === 200) {
        setAddUserMessage("User added successfully!");
      }
    } catch (err) {
      console.error("Add user error:", err.response || err);
      setAddUserMessage("Failed to add user. Try again.");
    }
  };

  return (
    <div>
      {/* Login Section */}
      {!user ? (
        <>
          <h1>Welcome to the Login Page</h1>
          <h4>Please sign in underneath:</h4>
          <form onSubmit={handleSubmit}>
            <label>Email: </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit">Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          {/* Add User Section */}
          <br /> <br /> <br />
          <h4>Don't have an account? Create one below:</h4>
          <form onSubmit={handleAddUser}>
            <label>Username: </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
            <br />
            <label>Email: </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
            <br />
            <label>Password: </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit">Create Account</button>
            {addUserMessage && <p>{addUserMessage}</p>}
          </form>
        </>
      ) : (
        <div>
          <h2>Welcome back, {user.username}!</h2>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
