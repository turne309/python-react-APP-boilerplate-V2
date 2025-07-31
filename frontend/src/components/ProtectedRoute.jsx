import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// This function is just some frontend auth protection for routing.
// It's not the entire authorization since it's on the front end, rather some extra auth for user experience purposes
function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  });

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    // Send the refresh token to the backend to get a new access token
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      // If response is 'success' set auth state to true --> otherwise set auth state to fa;se
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, ResizeObserver.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      console.log(err);
      setIsAuthorized(false);
    }
  };
  const auth = async () => {
    // Look at access token to see if we have one
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    // If there is one, check if expired
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    // If expired, refresh for user
    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      // If we can't refresh, direct user to login again
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
