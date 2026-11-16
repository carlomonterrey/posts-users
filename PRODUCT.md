# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

npm on Node 22; React 19, Vite 8, TypeScript (strict), Vitest and Testing Library. Deployed to Cloudflare Pages. Data from `https://jsonplaceholder.typicode.com`; there is no write endpoint.

## Users

**Reviewer / interviewer (primary).** Opens the deployed page or the repository to judge interface craft, component boundaries, state handling and tests. Needs the product to explain itself in seconds and the code to be legible without a guided tour.

**Workspace user.** Browses a directory of people, reads the posts of the person they pick, and writes a post of their own. Scans quickly; uses a laptop or a phone; may never read the footer.

## Product Purpose

A single-page workspace that demonstrates a polished, Apple-inspired interface over a clean layered React architecture: a searchable people directory, per-person posts loaded over HTTP, and a validated composer whose posts are prepended locally with a visible “New” marker.

It is a working demo, not a publishing tool. Nothing is persisted beyond the session.

## Capabilities

- Case-insensitive, trim-aware search over people’s names, with a no-results recovery path.
- Explicit selection: the feed is empty and inviting until a person is chosen; switching people aborts the previous request.
- A title + body composer validated after trimming; a valid submission is prepended locally with a “New” label.
- Loading, error, empty and no-results states for the directory and the feed, each with an accessible announcement and a retry path.
- New posts survive person switching during the session, not a reload.

## Constraints

- No routing, authentication, Redux, React Query, MSW or CSS framework. The repository interfaces are the test seam.
- Light theme only; no dark mode. No imagery or external avatar service: monogram initials carry identity.
- UI copy in English. Product name **Users & Posts**. No logo, no stack advertising, no README link inside the product.
- Cloudflare Pages deployment; static assets only. SPA fallback through `public/_redirects`.

## Success

- The first screen reads as a designed gallery, not an admin dashboard: one 80px statement, one search control, one directory, one feed.
- All mandated behaviour is covered by tests, including a repository rejection and an aborted request.
- The interface is keyboard-operable, announces async states, meets WCAG 2.2 AA contrast and target sizes, and never uses color alone.
- No drop shadows. Surfaces move between Canvas `#FCFCFD` and Accent Light `#E8DDFF`, with 28px radii and 1px `#E5E5EA` hairlines.
- Deep Plum Primary `#5E2E8C` appears only on the Publish pill, text links, focus, the “New” label and the selected person. Alert `#FF3B30` is reserved for invalid input.

## Accessibility

WCAG 2.2 AA intent. Landmarks and heading order, visible focus, labelled controls, `aria-invalid` plus `aria-describedby`, live regions for loading and results, 44px minimum targets, reduced-motion support, and no state communicated by color alone.
