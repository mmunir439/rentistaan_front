// app/logout/page.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/utils/token";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    logoutUser(router);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600 text-lg">Logging you out...</p>
    </div>
  );
}
