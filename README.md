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

2. Configure environment variables:

- Copy the example file: `cp .env.example .env`
- Open `.env` and add your Firebase credentials.
- **Note:** All browser-accessible variables must be prefixed with `NG_APP_` (e.g., `NG_APP_FIREBASE_API_KEY`).

3. Start the app:

```bash
pnpm start
```

The dev server runs at `http://localhost:4200`.

## Scripts

- `pnpm start` - run the local dev server
- `pnpm build` - create a production build
- `pnpm lint` - run ESLint checks
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

### Contributors

<a href="https://github.com/Hacklabs-app/hacklabs.app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Hacklabs-app/hacklabs.app" />
</a>


## Notes

- Do not commit real environment secrets (the `.env` file is git-ignored)
- Use `.env.example` only for safe example values
- If Firebase configuration changes, keep `firestore.rules` in sync with the app behavior

Built for Hacklabs.
