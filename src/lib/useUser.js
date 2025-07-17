import { useState, useEffect } from "react";
import api from "@/lib/axios";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/user/me");
        setUser(res.data.user); // make sure it's .user (based on your Postman response)
      } catch (err) {
        console.error(
          "Failed to load user info:",
          err.response?.data || err.message
        );
      }
    }

    fetchUser();
  }, []);

  return user;
}
