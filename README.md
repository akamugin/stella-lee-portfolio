# Stella Lee Portfolio

My portfolio website built with modern React tooling and playful interactive styling.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion

## Local development

```bash
npm install
npm run dev
```

## PostHog setup

Create `.env.local` with:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## Stability tips

- Use Node LTS (recommended: `22`, see `.nvmrc`).
- Do not run `npm run dev` and `npm run build` in parallel in the same terminal workflow.

## Notes
- Replace the png files in public/project-previews with your own project icons/photos`
