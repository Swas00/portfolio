# Swastik Sahu — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion (`motion/react`). No backend, no secrets.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit content
All copy lives in `src/data/`:
- `projects.ts` — projects, links, stack, case-study text, `featured` flag
- `profile.ts` — contact links, skills, experience, education, certifications, achievements

Résumé download: replace `public/Swastik_Sahu_Resume.pdf`.

## Deploy (Vercel)
1. Push this folder to a GitHub repo.
2. vercel.com → Add New Project → import the repo (framework auto-detected). Deploy.
3. Optional: set `NEXT_PUBLIC_SITE_URL` to your final URL so social-share metadata is absolute.
4. Custom domain: Project → Settings → Domains → add it and follow the DNS records shown.
