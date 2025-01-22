import React, { createContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkAndLogOff = () => {
    const token = localStorage.getItem("token");
    if (!token) { 
      loggoff(() => {
        navigate(`/`);
        console.log("User logged off due to missing token.");
      });
    }
  };

  useEffect(() => {
    checkAndLogOff();
  }, []); 

  const setCurrentUser = (userData) => {
    const token = userData.access_token;
    localStorage.setItem("token", token);

    const userString = JSON.stringify(userData.user);
    localStorage.setItem("user", userString);

    setUser(userData.user);
  };

  const getCurrentUser = () => {
    const userString = localStorage.getItem("user");
    if (user) {
      return user;
    }
    if (userString) {
      return JSON.parse(userString);
    }
  };

  const loggoff = (callBack) => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    callBack();
  };

  const value = useMemo(() => ({
    user,
    setCurrentUser,
    getCurrentUser,
    loggoff,
  }));

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
