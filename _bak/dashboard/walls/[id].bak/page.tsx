import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestimonialCard } from "@/components/dashboard/testimonial-card";
import {
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
  Code2,
  Link2,
  Palette,
  Edit3,
} from "lucide-react";

interface WallPageProps {
  params: Promise<{ id: string }>;
}

export default async function WallPage({ params }: WallPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Fetch wall
  const { data: wall } = await supabase
    .from("wol_walls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!wall) notFound();

  // Fetch testimonials
  const { data: testimonials } = await supabase
    .from("wol_testimonials")
    .select("*")
    .eq("wall_id", id)
    .order("created_at", { ascending: false });

  const allTestimonials = testimonials ?? [];
  const approved = allTestimonials.filter((t) => t.status === "approved");
  const pending = allTestimonials.filter((t) => t.status === "pending");
  const totalRating =
    allTestimonials.filter((t) => t.rating != null).reduce((s, t) => s + (t.rating ?? 0), 0) /
    (allTestimonials.filter((t) => t.rating != null).length || 1);

  const collectUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://walloflove.eazyweb.nc"}/collect/${wall.slug}`;
  const embedScript = `<script src="https://walloflove.eazyweb.nc/embed/${wall.id}.js"></script>\n<div id="walloflove-${wall.id}"></div>`;

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{wall.name}</h1>
          {wall.description && (
            <p className="text-sm text-white/50 mt-1">{wall.description}</p>
          )}
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-all">
          <Edit3 className="w-4 h-4" />
          Edit
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard
          icon={<MessageSquare className="w-4 h-4 text-pink-400" />}
          value={allTestimonials.length}
          label="Total"
        />
        <StatCard
          icon={<CheckCircle className="w-4 h-4 text-emerald-400" />}
          value={approved.length}
          label="Approved"
        />
        <StatCard
          icon={<Clock className="w-4 h-4 text-amber-400" />}
          value={pending.length}
          label="Pending"
        />
        <StatCard
          icon={<Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
          value={allTestimonials.some((t) => t.rating != null) ? totalRating.toFixed(1) : "—"}
          label="Avg. Rating"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="testimonials">
        <TabsList className="bg-white/5 border border-white/10 mb-6">
          <TabsTrigger
            value="testimonials"
            className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/10"
          >
            Testimonials
          </TabsTrigger>
          <TabsTrigger
            value="collect"
            className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/10"
          >
            Collect
          </TabsTrigger>
          <TabsTrigger
            value="embed"
            className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/10"
          >
            Embed
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-white/10"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Testimonials tab */}
        <TabsContent value="testimonials">
          {allTestimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-7 h-7 text-white/20" />
              </div>
              <p className="text-white/50 text-sm">No testimonials yet</p>
              <p className="text-white/30 text-xs mt-1">
                Share your collection link to start getting testimonials.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allTestimonials.map((t) => (
                <TestimonialCard
                  key={t.id}
                  id={t.id}
                  authorName={t.author_name}
                  authorTitle={t.author_title}
                  authorCompany={t.author_company}
                  authorAvatarUrl={t.author_avatar_url}
                  content={t.content}
                  rating={t.rating}
                  status={t.status}
                  wallId={wall.id}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Collect tab */}
        <TabsContent value="collect">
          <div className="max-w-lg space-y-6">
            <div className="rounded-xl border border-white/10 bg-[#111111] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="w-4 h-4 text-pink-400" />
                <h3 className="text-sm font-semibold text-white">
                  Shareable link
                </h3>
              </div>
              <p className="text-xs text-white/50 mb-3">
                Share this link with your customers so they can leave a
                testimonial.
              </p>
              <CopyField value={collectUrl} />
            </div>

            {/* QR code placeholder */}
            <div className="rounded-xl border border-white/10 bg-[#111111] p-5">
              <h3 className="text-sm font-semibold text-white mb-3">
                QR Code
              </h3>
              <div className="w-32 h-32 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-xs text-white/30 text-center">
                  QR Code
                  <br />
                  (coming soon)
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Embed tab */}
        <TabsContent value="embed">
          <div className="max-w-2xl space-y-4">
            <div className="rounded-xl border border-white/10 bg-[#111111] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-pink-400" />
                <h3 className="text-sm font-semibold text-white">
                  Embed on your website
                </h3>
              </div>
              <p className="text-xs text-white/50 mb-4">
                Copy and paste this code snippet where you want your Wall of
                Love to appear.
              </p>
              <div className="rounded-lg bg-[#0a0a0a] border border-white/10 p-4 font-mono text-xs text-emerald-300 leading-relaxed whitespace-pre overflow-x-auto">
                {embedScript}
              </div>
              <CopyField value={embedScript} className="mt-3" />
            </div>
          </div>
        </TabsContent>

        {/* Settings tab */}
        <TabsContent value="settings">
          <WallSettings wall={wall} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────────── */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111111] p-4">
      <div className="flex items-center gap-2 mb-1">{icon}</div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/40 mt-0.5">{label}</p>
    </div>
  );
}

function CopyField({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 ${className}`}
    >
      <span className="flex-1 text-xs text-white/70 truncate font-mono">
        {value}
      </span>
      {/* Copy button is a client interaction — use a client component wrapper or just label for now */}
      <CopyButton text={value} />
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  // We render a static button; JS copy is handled via inline onclick
  // For a pure server component, we just provide the UI affordance
  return (
    <button
      onClick={undefined}
      data-copy={text}
      className="shrink-0 text-xs text-white/50 hover:text-pink-400 transition-colors px-2 py-1 rounded hover:bg-white/10 copy-btn"
    >
      Copy
    </button>
  );
}

function WallSettings({ wall }: { wall: Record<string, unknown> }) {
  const themes = [
    { id: "dark", label: "Dark", bg: "#0a0a0a" },
    { id: "light", label: "Light", bg: "#ffffff" },
    { id: "auto", label: "Auto", bg: "linear-gradient(135deg, #0a0a0a 50%, #ffffff 50%)" },
  ];

  return (
    <div className="max-w-lg space-y-6">
      {/* Wall name */}
      <div className="rounded-xl border border-white/10 bg-[#111111] p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white">Wall details</h3>

        <div className="space-y-1.5">
          <label className="text-xs text-white/50">Name</label>
          <input
            defaultValue={wall.name as string}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 outline-none focus:border-pink-500/50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-white/50">Description</label>
          <textarea
            defaultValue={(wall.description as string) ?? ""}
            rows={3}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 outline-none focus:border-pink-500/50 resize-none"
          />
        </div>

        <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
          Save changes
        </button>
      </div>

      {/* Theme picker */}
      <div className="rounded-xl border border-white/10 bg-[#111111] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4 text-pink-400" />
          <h3 className="text-sm font-semibold text-white">Theme</h3>
        </div>
        <div className="flex gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-12 h-12 rounded-lg border-2 border-white/10 group-hover:border-pink-500/50 transition-colors"
                style={{ background: theme.bg }}
              />
              <span className="text-xs text-white/50">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
