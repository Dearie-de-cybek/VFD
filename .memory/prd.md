# PRD — Values for Daily Living (VDL) Website

## Goal
Awwwards-caliber marketing site for VDL, a Nigeria-based NGO promoting moral values, character education, and purposeful leadership. Human-centric, photo-led, emotionally warm, credible.

## Stack
- Next.js 16 (App Router, TS, src dir), Tailwind v4
- GSAP 3 + @gsap/react (ScrollTrigger), Lenis smooth scroll
- next/font: Fraunces (display serif) + Epilogue (body sans)
- Photos: Unsplash remote (human-centric, African education/community)

## Design direction
"Editorial heritage-organic": warm ivory paper (#F6F2E8), deep forest green (#0C2B1D/#14432E), gold accent (#C9A227). Grain overlay. Asymmetric editorial layouts, arch-shaped imagery, oversized serif type. Anchor: self-drawing golden tree SVG in hero.

## Sections (single page)
1. Nav — fixed, mobile overlay menu, Donate CTA
2. Hero — word-reveal headline, arch photo, tree draw animation
3. Values marquee — infinite loop (Integrity, Responsibility, Empathy, Honesty, Discipline)
4. About — mission/vision, parallax photo
5. What We Do — 5 pillars editorial rows (Values Education, Youth Mentorship, Parent Empowerment, Policy Consulting, Community Outreach)
6. Programs — pinned horizontal scroll (desktop) / vertical stack (mobile): school tours, conference, essay competition, books, ambassadors, digital skills
7. Impact — dark section, animated counters (placeholder figures — replace with real data)
8. Quote — large serif pull-quote
9. Get Involved — Donate / Volunteer / Partner
10. Footer — contact: 127 Chime Avenue, New Haven, Enugu; links

## Acceptance criteria
- Mobile friendly (375px) + desktop (1280px+), verified in preview
- prefers-reduced-motion respected (gsap.matchMedia)
- No console errors, no broken images
- Lighthouse-sane: next/image, font subsetting, no layout thrash
