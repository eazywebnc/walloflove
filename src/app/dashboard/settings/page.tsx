import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { User, Palette, CreditCard, Bell, ExternalLink } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Fetch wol_users record
  const { data: wolUser } = await supabase
    .from("wol_users")
    .select("*")
    .eq("auth_id", user.id)
    .single();

  // Fetch settings
  const { data: settings } = await supabase
    .from("wol_settings")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const displayName = wolUser?.name ?? user.user_metadata?.full_name ?? "";
  const plan: string = wolUser?.plan ?? "free";
  const brandColor: string = settings?.brand_color ?? "#ec4899";

  const planConfig: Record<string, { label: string; color: string; price: string; features: string[] }> = {
    free: {
      label: "Free",
      color: "text-white/50",
      price: "$0/mo",
      features: ["1 wall", "Up to 50 testimonials", "Basic embed"],
    },
    pro: {
      label: "Pro",
      color: "text-pink-400",
      price: "$19/mo",
      features: ["Unlimited walls", "Unlimited testimonials", "Custom branding", "Priority support"],
    },
    agency: {
      label: "Agency",
      color: "text-violet-400",
      price: "$49/mo",
      features: ["Everything in Pro", "Client workspaces", "White-label", "API access"],
    },
  };

  const currentPlan = planConfig[plan] ?? planConfig.free;

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-white/50 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <section className="rounded-xl border border-white/10 bg-[#111111] p-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-pink-400" />
            <h2 className="text-sm font-semibold text-white">Profile</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-white/50">Full name</label>
              <input
                defaultValue={displayName}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 outline-none focus:border-pink-500/50 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/50">Email</label>
              <input
                value={user.email ?? ""}
                readOnly
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/40 outline-none cursor-not-allowed"
              />
              <p className="text-xs text-white/30">
                Email cannot be changed here.
              </p>
            </div>

            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              Save profile
            </button>
          </div>
        </section>

        {/* Branding */}
        <section className="rounded-xl border border-white/10 bg-[#111111] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Palette className="w-4 h-4 text-pink-400" />
            <h2 className="text-sm font-semibold text-white">Branding</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-white/50">Brand color</label>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg border border-white/10 shrink-0 cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: brandColor }}
                />
                <input
                  type="color"
                  defaultValue={brandColor}
                  className="w-full h-10 px-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white cursor-pointer"
                />
              </div>
              <p className="text-xs text-white/30">
                Used as the primary color in your embedded walls.
              </p>
            </div>

            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              Save branding
            </button>
          </div>
        </section>

        {/* Plan */}
        <section className="rounded-xl border border-white/10 bg-[#111111] p-6">
          <div className="flex items-center gap-2 mb-5">
            <CreditCard className="w-4 h-4 text-pink-400" />
            <h2 className="text-sm font-semibold text-white">Plan</h2>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 mb-4">
            <div>
              <span className={`text-sm font-semibold ${currentPlan.color}`}>
                {currentPlan.label} plan
              </span>
              <p className="text-xs text-white/40 mt-0.5">{currentPlan.price}</p>
            </div>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                plan === "free"
                  ? "bg-white/10 text-white/50 border-white/10"
                  : "bg-pink-500/15 text-pink-400 border-pink-500/20"
              }`}
            >
              Current
            </span>
          </div>

          <ul className="space-y-1.5 mb-5">
            {currentPlan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {plan === "free" && (
            <a
              href="/dashboard/billing"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Upgrade to Pro
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </section>

        {/* Notifications */}
        <section className="rounded-xl border border-white/10 bg-[#111111] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-4 h-4 text-pink-400" />
            <h2 className="text-sm font-semibold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "new_testimonial",
                label: "New testimonial",
                description: "Get notified when someone submits a testimonial",
              },
              {
                id: "weekly_digest",
                label: "Weekly digest",
                description: "Receive a weekly summary of your testimonials",
              },
              {
                id: "marketing",
                label: "Product updates",
                description: "News about WallOfLove features and updates",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm text-white">{item.label}</p>
                  <p className="text-xs text-white/40 mt-0.5">
                    {item.description}
                  </p>
                </div>
                {/* Toggle switch */}
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    defaultChecked={item.id !== "marketing"}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 rounded-full bg-white/10 peer-checked:bg-pink-500 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>
            ))}

            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              Save preferences
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
