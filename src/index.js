import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./Contexts/UserContext"; // Import the UserProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider> {/* Wrap the entire App in UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
