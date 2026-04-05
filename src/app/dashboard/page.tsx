import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, LayoutGrid } from "lucide-react";
import { WallCard } from "@/components/dashboard/wall-card";
import { CreateWallDialog } from "@/components/dashboard/create-wall-dialog";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: walls, error } = await supabase
    .from("wol_walls")
    .select(
      `
      id,
      name,
      slug,
      description,
      is_active,
      created_at,
      wol_testimonials(count)
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const wallList = walls ?? [];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Your Walls</h1>
          <p className="text-sm text-white/50 mt-1">
            Manage and embed your testimonial walls
          </p>
        </div>
        <CreateWallDialog>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Create Wall
          </button>
        </CreateWallDialog>
      </div>

      {/* Walls grid */}
      {wallList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {wallList.map((wall) => (
            <Link key={wall.id} href={`/dashboard/walls/${wall.id}`}>
              <WallCard
                id={wall.id}
                name={wall.name}
                description={wall.description}
                isActive={wall.is_active}
                createdAt={wall.created_at}
                testimonialCount={
                  (wall.wol_testimonials as unknown as { count: number }[])?.[0]
                    ?.count ?? 0
                }
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-600/20 border border-pink-500/20 flex items-center justify-center">
          <LayoutGrid className="w-10 h-10 text-pink-400/60" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
          <Plus className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-2">
        No walls yet
      </h2>
      <p className="text-sm text-white/50 max-w-xs mb-6">
        Create your first Wall of Love to start collecting and displaying
        customer testimonials.
      </p>

      <CreateWallDialog>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Create your first wall
        </button>
      </CreateWallDialog>
    </div>
  );
}
