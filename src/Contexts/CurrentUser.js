import React, { useEffect, createContext, useState } from "react";

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          "http://localhost:3001/authentication/profile",
          {
            headers: {
              authToken: token,
            },
          }
        );
        if (response.status === 204) {
          setCurrentUser(null); // No user is logged in
        } else if (response.ok) {
          const user = await response.json();
          setCurrentUser(user);
        } else {
          setCurrentUser(null); // Handle other possible responses
        }
      } catch (error) {
        console.error("Failed to fetch the current user", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    getLoggedInUser();
  }, []);

  return (
    <CurrentUser.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </CurrentUser.Provider>
  );
}

export default CurrentUserProvider;
