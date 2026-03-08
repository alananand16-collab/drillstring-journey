import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import type { Experience } from "@/data/portfolioData";

interface Props {
  experience: Experience | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ExperienceModal({ experience, open, onOpenChange }: Props) {
  if (!experience) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-brand/20 bg-[#1a1a1a] text-white sm:max-w-2xl">
        <DialogHeader>
          <div className="mb-1 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-white/10 bg-white/5 text-[8px] text-white/50">
              {experience.logo}
            </div>
            <div>
              <DialogTitle className="text-lg text-white">{experience.role}</DialogTitle>
              <DialogDescription className="text-sm text-white/50">
                {experience.company} • {experience.location} • {experience.dates}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <ul className="space-y-3">
            {experience.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {b}
              </li>
            ))}
          </ul>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Tools</h4>
            <div className="flex flex-wrap gap-2">
              {experience.tools.map((t) => (
                <Badge key={t} variant="secondary" className="bg-brand/15 text-brand border-brand/20 text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {experience.awards && experience.awards.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Awards</h4>
              <div className="flex flex-wrap gap-2">
                {experience.awards.map((a) => (
                  <div key={a} className="flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1">
                    <Trophy className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-yellow-400">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
