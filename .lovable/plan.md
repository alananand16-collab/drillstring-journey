

# Implementation Plan: Alan Anand Drilling Journey Portfolio

## Summary
Build the complete cinematic drilling journey portfolio in one pass: 14 new files + updates to 4 existing files. Uses Framer Motion for scroll animations, existing Radix Dialog for experience modals, Tailwind for all styling. Dark mode default.

## New Dependency
- `framer-motion` — scroll-driven section animations, modal transitions

## Files to Create

### 1. `src/data/portfolioData.ts`
All portfolio content: 5 experiences (with exact bullet points, tools, awards provided), 2 projects, 5 awards, 2 education entries, skills by category, contact info.

### 2. `src/hooks/useScrollDepth.ts`
Custom hook using passive scroll listener. Maps `scrollY / (scrollHeight - innerHeight)` to 0–4000m depth. Returns `{ depth, formationName, scrollProgress }`. Formation names: Surface (0-100m), Shallow (100-500m), Sandstone (500-1200m), Shale (1200-2200m), Reservoir (2200-2800m), Pay Zone (2800-3200m), Completion (3200-3800m), Bottom Hole (3800-4000m).

### 3. `src/components/portfolio/DepthIndicator.tsx`
Fixed left sidebar (w-16, desktop only). Vertical line with depth markers at 0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000m. Moving dot based on scroll progress. Formation zone labels. Brand blue accent. On mobile: fixed top bar showing depth number only.

### 4. `src/components/portfolio/DrillString.tsx`
Fixed positioned vertical line from top, height = scrollProgress * viewport height. SVG drill bit at bottom with CSS spin animation. Hidden on mobile.

### 5. `src/components/portfolio/ParticleField.tsx`
CSS-only animated particles. Takes `type` prop: "dust" (brown dots), "rocks" (grey squares), "oil" (dark droplets), "bubbles" (rising circles). ~15 particles per instance with randomized positions and animation delays.

### 6. `src/components/portfolio/HeroSection.tsx`
Surface zone. Large "AA" circular avatar (w-32 h-32, brand blue border). Name, title, tagline. SVG drill rig silhouette. "Begin Descent" button that scrolls to About section. Green/brown gradient background.

### 7. `src/components/portfolio/AboutSection.tsx`
~200m. Professional summary text. Smaller "AA" avatar beside text. Sandstone transition background.

### 8. `src/components/portfolio/SkillsSection.tsx`
~800m. 4 category groups rendered as grids. Each skill = card with placeholder icon box + tool name. Framer Motion `whileInView` stagger animation. Sandy background.

### 9. `src/components/portfolio/ExperienceSection.tsx`
~1500m. 5 experience cards staggered left/right using `even:ml-auto`. Each card shows company name, role, dates, one-liner. Click handler opens modal with experience index. Dark shale background with subtle card glow.

### 10. `src/components/portfolio/ExperienceModal.tsx`
Uses existing `Dialog` from `@/components/ui/dialog`. Receives experience data object. Shows: role, company, location, dates, bullet points, tools as badges, award badges (gold). Clean close button via DialogClose.

### 11. `src/components/portfolio/ProjectsSection.tsx`
~2500m. 2 project cards with full details visible. Oil droplet particles in background. Amber/gold gradient.

### 12. `src/components/portfolio/AwardsSection.tsx`
~3000m. CSS animation: dark gradient columns rising upward behind content. 5 awards as golden/metallic styled cards with trophy icon (lucide Trophy). Pulse animation on entry.

### 13. `src/components/portfolio/EducationSection.tsx`
~3500m. SVG casing pipe visual (vertical steel pipe illustration). 2 education cards with logo placeholders, degree, dates, coursework. Dark rock background.

### 14. `src/components/portfolio/ContactSection.tsx`
~4000m. Contact links (email, phone, LinkedIn, location) with lucide icons. "Return to Surface" button: `window.scrollTo({ top: 0, behavior: 'smooth' })`. Journey complete message.

## Files to Modify

### `index.html`
- Add `class="dark"` to `<html>` tag
- Update title to "Alan Anand | Petroleum Engineering Portfolio"

### `src/index.css`
- Add custom CSS keyframes: `drill-spin`, `float-particle`, `rise-bubble`, `oil-gush`, `pulse-glow`
- Add particle, drill-bit, geological background utility classes
- Set scrollbar styling for dark theme

### `tailwind.config.ts`
- Add custom keyframes and animation entries for the above animations
- Add brand-blue color: `brand: "rgb(0, 70, 180)"`

### `src/pages/Index.tsx`
- Complete rewrite: imports all section components, uses `useScrollDepth`, renders DepthIndicator + DrillString + all sections in order with geological background wrappers
- Each section has `min-h-screen` and appropriate background gradient classes
- Manages experience modal state (selectedExperience index)

## Design Tokens
- Brand blue: `rgb(0, 70, 180)` → `--brand` CSS variable + Tailwind `brand` color
- Backgrounds per zone via inline gradient styles
- Dark mode default via `class="dark"` on html

## Mobile Strategy
- DepthIndicator: sidebar hidden below `lg:`, replaced with fixed top bar
- DrillString: hidden below `lg:`
- Experience cards: single column, no stagger
- Simplified particle count
- All sections stack vertically with full-width

