/**
 * Reusable geological section background with:
 * - Full-bleed fixed background image (parallax on desktop)
 * - Dark overlay for text readability
 * - 150px cross-fade transition zones at top and bottom
 */

interface SectionBackgroundProps {
  imagePath: string;
  overlayOpacity?: [number, number]; // [top, bottom] overlay opacity
  children?: React.ReactNode;
}

export default function SectionBackground({
  imagePath,
  overlayOpacity = [0.65, 0.75],
}: SectionBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Background image — fixed for parallax feel */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark readable overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,${overlayOpacity[0]}) 0%, rgba(0,0,0,${overlayOpacity[1]}) 100%)`,
        }}
      />

      {/* Top cross-fade: transparent→dark at top edge to blend with section above */}
      <div
        className="absolute top-0 left-0 right-0 z-[2]"
        style={{
          height: "150px",
          background: "linear-gradient(to bottom, rgba(5,8,12,1) 0%, rgba(5,8,12,0.6) 40%, transparent 100%)",
        }}
      />

      {/* Bottom cross-fade: transparent→dark at bottom edge to blend with section below */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2]"
        style={{
          height: "150px",
          background: "linear-gradient(to top, rgba(5,8,12,1) 0%, rgba(5,8,12,0.6) 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
