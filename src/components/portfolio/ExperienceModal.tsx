import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import type { Experience } from "@/data/portfolioData";

import logoSPGlobal from "@/assets/logo-spglobal.jpg";
import logoEnverus from "@/assets/logo-enverus.webp";
import logoONGC from "@/assets/logo-ongc.png";

const companyLogoMap: Record<string, string> = {
  "S&P Global": logoSPGlobal,
  Enverus: logoEnverus,
  ONGC: logoONGC,
};

interface Props {
  experience: Experience | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ExperienceModal({ experience, open, onOpenChange }: Props) {
  if (!experience) return null;

  const logoSrc = companyLogoMap[experience.company];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl border-0 p-0 overflow-hidden"
        style={{
          background: "rgba(12,14,20,0.98)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 25px 80px rgba(0,0,0,0.8)",
        }}
      >
        <div className="p-6 md:p-8">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {logoSrc ? (
                  <img src={logoSrc} alt={experience.company} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm font-bold" style={{ color: "hsl(var(--brand))" }}>{experience.logo}</span>
                )}
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-white">{experience.role}</DialogTitle>
                <DialogDescription className="text-sm text-white/40 mt-1">{experience.location}</DialogDescription>
                <p className="text-xs text-white/25 mt-0.5 font-mono">{experience.startDate} — {experience.endDate}</p>
              </div>
            </div>
          </DialogHeader>

          {experience.preview && (
            <p className="mt-5 text-sm italic text-white/50 leading-relaxed border-l-2 pl-4" style={{ borderColor: "hsl(var(--brand) / 0.3)" }}>
              {experience.preview}
            </p>
          )}

          <div className="mt-5 space-y-3">
            {experience.bullets.map((bullet, i) => (
              <div key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "hsl(var(--brand) / 0.5)" }} />
                <p className="text-sm text-white/55 leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {experience.tools.map((tool) => (
              <Badge
                key={tool}
                variant="outline"
                className="text-[10px] font-medium border-white/10 text-white/40 bg-white/[0.02]"
              >
                {tool}
              </Badge>
            ))}
          </div>

          {experience.awards && experience.awards.length > 0 && (
            <div className="mt-5 pt-4 border-t border-white/5">
              {experience.awards.map((award) => (
                <div key={award} className="flex items-center gap-2">
                  <Trophy className="h-3.5 w-3.5 text-yellow-500/70" />
                  <span className="text-xs text-yellow-500/70">{award}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
