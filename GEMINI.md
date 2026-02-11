# Global Project Rules

1. **Primary Language**: JAPANESE
   - You MUST Write all "Implementation Plans", "Walkthroughs", and "Comments" in Japanese.
   - Even if the system template is English, translate it to Japanese immediately.

2. **Tech Stack**
   - Next.js 15 (App Router), Supabase, TypeScript, Tailwind CSS.

# Current Project Status (Updated: 2026-02-09)

## Architecture Overview
- **Main Page**: `src/app/page.tsx` now handles the "Research News" functionality directly.
- **Data Source**: `src/data/news-feed.json` is the source of truth for research articles.
- **Routing**:
    - Root (`/`) displays the research feed.
    - `/research-news` is permanently redirected to `/` via `next.config.ts`.

## Key Implementation Details
- **Navigation Compatibility**: The "Return to Buddy Home" link in `src/app/page.tsx` uses `fixed` positioning (`z-[9999]`) and `e.stopPropagation()` with `pointer-events-none` on children. This is a critical workaround for event bubbling issues in the specific environment. DO NOT REFATOR without verifying this specific constraint on the local dev server.
