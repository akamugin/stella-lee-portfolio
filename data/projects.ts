import type { ProjectItem } from "@/components/projects-showcase";

export const portfolioProjects: ProjectItem[] = [
  {
    slug: "yippu",
    name: "Yippu",
    summary: "Outfit discovery website that curates Pinterest looks with clean filtering and fast modal-based browsing.",
    details:
      "Yippu is a lightweight discovery site for curated outfit inspiration. I built a no-login browsing flow with gender filters, card-based exploration, and a modal that embeds Pinterest content directly so users can preview and jump out without losing context.",
    highlights: [
      "Implemented filterable look feed (male/female/unisex/all) with smooth client-side state updates.",
      "Built modal UX with Pinterest embed + outbound link for low-friction inspiration browsing.",
      "Added Next.js API routes backed by local JSON data for simple maintainable content updates."
    ],
    stack: ["Website", "Next.js", "React", "Bun", "JavaScript", "Pinterest Embed API"],
    github: "https://github.com/akamugin/yippu",
    live: "https://yippu.vercel.app/",
    image: "/project-previews/yippu.png"
  },
  {
    slug: "dailyos",
    name: "DailyOS",
    summary: "Pastel-themed iOS daily planner with schedule blocks, reminders, calendar navigation, and CloudKit-backed persistence.",
    details:
      "DailyOS is a SwiftUI scheduling app focused on making planning feel playful but practical. Users can create daily blocks with reminders, mark tasks done, reorder plans, and edit notes. I integrated SwiftData persistence with CloudKit sync and a local fallback path for reliability.",
    highlights: [
      "Modeled schedule blocks with day-level organization, reminders, notes, completion state, and drag/reorder support.",
      "Integrated UserNotifications to sync reminders for non-completed blocks and keep alerts current on edits/deletes.",
      "Built SwiftData + CloudKit storage with fallback initialization logic so the app still launches if CloudKit is unavailable."
    ],
    stack: ["Mobile App", "SwiftUI", "SwiftData", "CloudKit", "UserNotifications", "iOS"],
    github: "https://github.com/akamugin/DailyOS",
    live: "#",
    image: "/project-previews/dailyos.png"
  },
  {
    slug: "steady",
    name: "Steady",
    summary: "Nutrition and hydration tracker with photo-based meal logging, smart nutrition autofill, and iCloud-synced state.",
    details:
      "Steady helps users track calories, protein, and water with a playful interface. I implemented meal logging via camera capture, Vision-based food detection, and nutrition lookup via OpenFoodFacts, plus daily progress views, edit history flows, and cross-device persistence.",
    highlights: [
      "Built meal logging flow with camera capture, on-device Vision detection, and asynchronous nutrition lookup/autofill.",
      "Added customizable goal system (calories/protein/water) with profile-driven recommended defaults and per-drink targets.",
      "Implemented app-wide persistence with local JSON snapshots + NSUbiquitousKeyValueStore sync for iCloud continuity."
    ],
    stack: ["Mobile App", "SwiftUI", "Swift", "Vision", "OpenFoodFacts API", "iCloud"],
    github: "https://github.com/akamugin/Steady",
    live: "#",
    image: "/project-previews/steady.png"
  },
  {
    slug: "work-in",
    name: "Work-in",
    summary: "Preparing this project now. Core concept and feature direction are in progress.",
    details:
      "This project is upcoming. I am currently shaping the product direction, design system, and technical plan before full implementation.",
    highlights: ["Status: Preparing", "Roadmap: In Progress", "Launch: Upcoming"],
    stack: ["Mobile App", "Upcoming", "Preparing"],
    github: "#",
    live: "#",
    image: "/project-previews/work-in.png"
  },
  {
    slug: "my-bookie",
    name: "my Bookie",
    summary: "Upcoming reading-focused project currently in planning and feature definition.",
    details:
      "This app is in the preparation phase. I am finalizing user flows and functionality before moving into active development.",
    highlights: ["Status: Upcoming", "Planning: Active", "Development: Preparing"],
    stack: ["Mobile App", "Upcoming", "Preparing"],
    github: "#",
    live: "#",
    image: "/project-previews/my-bookie.png"
  },
  {
    slug: "outfitella",
    name: "Outfitella",
    summary: "AI-powered outfit recommendation app using context-aware scoring and a staged search pipeline for diverse suggestions.",
    details:
      "Outfitella recommends outfits from a user’s closet based on occasion, weather, and vibe. I built a recommendation engine with weighted scoring (color harmony, warmth, formality, silhouette, season, novelty), staged beam search assembly, and MMR-based diversification to avoid repetitive results.",
    highlights: [
      "Shipped end-to-end recommendation pipeline with seed selection, pairing, layering, footwear/accessory selection, and final ranking.",
      "Implemented explainability output so each recommendation includes reasons (formality fit, weather fit, color harmony).",
      "Added wardrobe migration + localStorage persistence and an interactive UI for generating, saving, wearing, and hiding outfits."
    ],
    stack: ["Website", "React", "TypeScript", "Vite", "Recommendation Systems", "LocalStorage"],
    github: "https://github.com/akamugin/Outfitella",
    live: "#",
    image: "/project-previews/outfitella.png"
  },
  {
    slug: "girl-math",
    name: "Girl Math",
    summary: "Preparing this concept now with product scope and interaction design still evolving.",
    details:
      "This project is upcoming and currently in early planning. I am preparing the concept, UI direction, and implementation approach.",
    highlights: ["Status: Preparing", "Concept: Upcoming", "Build: Not Started"],
    stack: ["Mobile App", "Upcoming", "Preparing"],
    github: "#",
    live: "#",
    image: "/project-previews/girl-math.png"
  }
];

export const featuredProjectSlug = "dailyos";
