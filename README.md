# MentorLagbe 🎓

> Smart tuition and mentorship platform that connects students with verified tutors.

**Live site:** https://mentorlagbe-client-ruddy.vercel.app/
**Server API:** https://mentorlagbe-server-phi.vercel.app/
**Server repo:** https://github.com/Miss-tea/mentorlagbe-server

## Purpose

Students and parents struggle to find verified tutors by subject, class level, mode and budget, and tutors lack a structured place to showcase batches. MentorLagbe solves both in one platform with three roles: Student, Tutor and Admin.

## Demo credentials

| Role | Email | Password |
|  --- |  ---  |   ---    |
| Admin | admin@mentorlagbe.com | Admin@12345 |
| Tutor | tutor@gmail.com | Tutor@12345 |
| Student | student@mentorlagbe.com | Student@12345 |

Stripe is in **test mode**. Use card `4242 4242 4242 4242`, any future date, any CVC.

## Key features

- Role-based authentication (Better Auth + JWT) for Student, Tutor and Admin
- Server-side search, filters (subject, class level, mode), sorting and pagination
- Tutors post tuitions (with image upload), edit, close or reopen, delete, and manage applicants
- Admin moderation: approve or reject tuitions, manage user roles, view transactions and revenue
- Students apply (duplicates prevented), track status and cancel pending applications
- Stripe Checkout for the Pro plan (Tutor $15, Student $10) with webhook and verification
- Free plan limits: 2 tuition posts for tutors, 5 bookmarks for students. Pro removes them
- Image uploads through the ImgBB API (key kept on the server)
- Bookmarks / Saved Tuitions for students
- Dark and light theme toggle
- Responsive design, loading skeletons, custom 404 and error pages, toast notifications

## Challenges and optional features completed

Server-side search and filter, JWT verification with `verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin` middlewares, ImgBB image uploads, server-side pagination, seeded connected data, bookmarks and dark mode.

## Architecture note

Better Auth runs inside the Next.js app so its session cookies stay on the same domain as the site (reliable reloads on private routes). It uses the same MongoDB database as the Express API. The Express server verifies the JWT against Better Auth's JWKS endpoint and checks the user's role in the database on every protected request.

## Tech stack

Next.js (App Router), Tailwind CSS, Better Auth, Express.js, MongoDB, Stripe, ImgBB.

## npm packages

**Client:** next, react, better-auth, @better-auth/mongo-adapter, mongodb, sonner, framer-motion, lucide-react, react-icons, next-themes, tailwindcss

**Server:** express, cors, dotenv, mongodb, jose, stripe, multer

## Run locally

```bash
git clone https://github.com/Miss-tea/mentorlagbe-client
cd mentorlagbe-client
npm install
cp .env.example .env.local   # tshen fill in the values
npm run dev
```

Environment variables (`.env.local`): `MONGODB_URI`, `DB_NAME`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_API_URL`.

The server is in a separate repository. See its README.