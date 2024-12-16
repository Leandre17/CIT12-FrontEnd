import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../Contexts/UserContext"; // Import UserContext

const LoginPage = () => {
  const { login, user, logout } = useUser(); // Get login and logout functions
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.get("https://localhost:7182/api/User/Login", {
        params: {
          email: username,
          password,
        },
      });

      if (response.status === 200) {
        login({ username, token: response.data }); // Store user in context
      }
    } catch (err) {
      console.error("Login error:", err.response || err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
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
