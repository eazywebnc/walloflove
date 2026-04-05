import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing_code`);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error("[auth/callback] exchangeCodeForSession error:", error);
    return NextResponse.redirect(
      `${origin}/auth/login?error=auth_callback_failed`
    );
  }

  const user = data.user;

  // Upsert wol_users record for new users
  try {
    const admin = createAdminClient();

    const { data: existing } = await admin
      .from("wol_users")
      .select("id")
      .eq("auth_id", user.id)
      .single();

    if (!existing) {
      const name =
        user.user_metadata?.full_name ??
        user.user_metadata?.name ??
        user.email?.split("@")[0] ??
        "User";

      await admin.from("wol_users").insert({
        auth_id: user.id,
        email: user.email,
        name,
        plan: "free",
      });

      // Create default settings row
      await admin.from("wol_settings").insert({
        user_id: user.id,
        brand_color: "#ec4899",
      });
    }
  } catch (err) {
    // Non-fatal: log and continue
    console.error("[auth/callback] wol_users upsert error:", err);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
