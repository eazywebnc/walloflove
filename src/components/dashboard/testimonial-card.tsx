"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Star, Loader2 } from "lucide-react";

type TestimonialStatus = "pending" | "approved" | "rejected";

interface TestimonialCardProps {
  id: string;
  authorName: string;
  authorTitle?: string | null;
  authorCompany?: string | null;
  authorAvatarUrl?: string | null;
  content: string;
  rating?: number | null;
  status: TestimonialStatus;
  wallId: string;
}

const statusConfig: Record<
  TestimonialStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  },
  rejected: {
    label: "Rejected",
    className: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  },
};

export function TestimonialCard({
  id,
  authorName,
  authorTitle,
  authorCompany,
  authorAvatarUrl,
  content,
  rating,
  status: initialStatus,
  wallId,
}: TestimonialCardProps) {
  const [status, setStatus] = useState<TestimonialStatus>(initialStatus);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const authorLine = [authorTitle, authorCompany].filter(Boolean).join(" @ ");
  const { label, className } = statusConfig[status];

  async function updateStatus(newStatus: "approved" | "rejected") {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/walls/${wallId}/testimonials/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (res.ok) {
          setStatus(newStatus);
          router.refresh();
        }
      } catch {
        // silently fail — user can retry
      }
    });
  }

  return (
    <Card className="bg-[#111111] border-white/10 hover:border-white/20 transition-colors duration-150">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 shrink-0">
              {authorAvatarUrl && (
                <AvatarImage src={authorAvatarUrl} alt={authorName} />
              )}
              <AvatarFallback className="bg-gradient-to-br from-pink-500 to-violet-600 text-white text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {authorName}
              </p>
              {authorLine && (
                <p className="text-xs text-white/40 truncate">{authorLine}</p>
              )}
            </div>
          </div>

          <Badge
            variant="outline"
            className={`shrink-0 text-xs font-medium border ${className}`}
          >
            {label}
          </Badge>
        </div>

        {/* Star rating */}
        {rating !== null && rating !== undefined && (
          <div className="flex items-center gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < rating
                    ? "text-amber-400 fill-amber-400"
                    : "text-white/15"
                }`}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <p className="text-sm text-white/70 leading-relaxed line-clamp-4 mb-4">
          {content}
        </p>

        {/* Actions */}
        {status === "pending" && (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => updateStatus("approved")}
              disabled={isPending}
              className="flex-1 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/20 h-8 text-xs"
            >
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  Approve
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={() => updateStatus("rejected")}
              disabled={isPending}
              className="flex-1 bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/20 h-8 text-xs"
            >
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <X className="w-3.5 h-3.5 mr-1.5" />
                  Reject
                </>
              )}
            </Button>
          </div>
        )}

        {status === "approved" && (
          <Button
            size="sm"
            onClick={() => updateStatus("rejected")}
            disabled={isPending}
            className="w-full bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/15 h-8 text-xs"
          >
            <X className="w-3.5 h-3.5 mr-1.5" />
            Reject
          </Button>
        )}

        {status === "rejected" && (
          <Button
            size="sm"
            onClick={() => updateStatus("approved")}
            disabled={isPending}
            className="w-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/15 h-8 text-xs"
          >
            <Check className="w-3.5 h-3.5 mr-1.5" />
            Approve
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
