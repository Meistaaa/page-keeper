import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { User } from "@/types/User";

// Define User interface

// Define context value type
interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the context with the correct type
const UserContext = createContext<UserContextValue | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/auth/me`,
          { withCredentials: true }
        );
        console.log(response.data);
        setUser(response.data.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error gracefully (e.g., show error message)
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
