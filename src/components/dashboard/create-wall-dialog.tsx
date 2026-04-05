"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface CreateWallDialogProps {
  children: React.ReactNode;
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
}

export function CreateWallDialog({ children }: CreateWallDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleNameChange(value: string) {
    setName(value);
    if (!slugEdited) {
      setSlug(generateSlug(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugEdited(true);
    setSlug(generateSlug(value));
  }

  function handleOpen(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form
      setName("");
      setDescription("");
      setSlug("");
      setSlugEdited(false);
      setError(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/walls", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            description: description.trim() || null,
            slug: slug || generateSlug(name),
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error ?? "Failed to create wall. Please try again.");
          return;
        }

        const { wall } = await res.json();
        setOpen(false);
        router.push(`/dashboard/walls/${wall.id}`);
        router.refresh();
      } catch {
        setError("An unexpected error occurred. Please try again.");
      }
    });
  }

  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>

      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="bg-[#111111] border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Create a new Wall</DialogTitle>
            <DialogDescription className="text-white/50">
              Give your Wall of Love a name and we&apos;ll set it up for you.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="wall-name" className="text-sm text-white/70">
                Wall name <span className="text-pink-400">*</span>
              </label>
              <Input
                id="wall-name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. My Product Testimonials"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-pink-500/50 focus:ring-pink-500/20"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label htmlFor="wall-slug" className="text-sm text-white/70">
                Slug
              </label>
              <div className="flex items-center rounded-lg border border-white/10 bg-white/5 overflow-hidden focus-within:border-pink-500/50">
                <span className="px-3 py-2 text-sm text-white/30 border-r border-white/10 shrink-0 select-none">
                  walloflove.eazyweb.nc/collect/
                </span>
                <input
                  id="wall-slug"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="my-wall"
                  className="flex-1 px-3 py-2 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label
                htmlFor="wall-description"
                className="text-sm text-white/70"
              >
                Description{" "}
                <span className="text-white/30 font-normal">(optional)</span>
              </label>
              <Textarea
                id="wall-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this wall for?"
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-pink-500/50 focus:ring-pink-500/20 resize-none"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <DialogFooter className="mt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!name.trim() || isPending}
                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:opacity-90 disabled:opacity-50 border-0"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating…
                  </>
                ) : (
                  "Create Wall"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
