// src/lib/useUser.js
import { useState, useEffect } from "react";
import api from "@/lib/axios";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/user/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to load user info:", err);
      }
    }
    fetchUser();
  }, []);

  return user;
}
