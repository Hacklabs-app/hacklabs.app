# Hacklabs Web

Public website for Hacklabs.

This repo contains the Angular app for the Hacklabs landing experience, interest form, launch messaging, and supporting content around the program.

## What This Repo Is

- A public-facing Angular application
- The website for Hacklabs
- The place where landing-page UI, copy, forms, and launch information are maintained

## Stack

- Angular 21
- Standalone components
- Signals
- Tailwind CSS v4
- GSAP
- Firebase / Firestore
- pnpm

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Add Firebase environment values:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

3. Start the app:

```bash
pnpm start
```

The dev server runs at `http://localhost:4200`.

## Scripts

- `pnpm start` - run the local dev server
- `pnpm build` - create a production build
- `pnpm watch` - build continuously in development mode
- `pnpm test` - run tests

## Project Structure

- `src/app/features/landing` - landing-page sections and page composition
- `src/app/shared` - shared UI such as the navbar
- `src/app/core` - app-level services
- `src/environments` - environment configuration
- `firestore.rules` - Firestore security rules

## Contributing

This repository is set up for contribution from members inside the organization.

- Forking is disabled
- `main` is protected
- Changes should be made through branches and pull requests

Start here:

- Read [CONTRIBUTING.md](./CONTRIBUTING.md)

## Notes

- Do not commit real environment secrets
- Use `.env.example` only for safe example values
- If Firebase configuration changes, keep `firestore.rules` in sync with the app behavior

Built for Hacklabs.
