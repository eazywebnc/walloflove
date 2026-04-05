"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-all"
      title="Sign out"
    >
      <LogOut className="w-3.5 h-3.5" />
    </button>
  );
}
