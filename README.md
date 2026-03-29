# Vehicle Registration Management Platform

A modern web application for managing vehicle registration records with a public browsing experience and an authenticated admin workflow.

## Overview

This platform allows users to view registered vehicles publicly and enables administrators to manage records through a secure login area. It integrates with a live Railway backend API and uses client-side authentication simulation for protected workflows.

## Key Features

- Public vehicle registry homepage with search
- Vehicle details view for authenticated users
- Admin authentication for protected operations
- Dashboard for management actions
- Multi-step vehicle registration form
- Edit existing vehicle records
- Delete vehicle records
- Field validation and user-friendly error handling
- Loading states and status indicators
- Live backend data via Railway API

## Demo Login Credentials

Use the following credentials for admin access:

- Email: `test@gmail.com`
- Password: Password!234

## Technology Stack

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Sonner notifications
- Lucide icons

## Getting Started

### 1. Install dependencies

Run:

`npm install`

### 2. Start development server

Run:

`npm run dev`

### 3. Build for production

Run:

`npm run build`

### 4. Preview production build

Run:

`npm run preview`

## Available Scripts

- `npm run dev`: starts local development server
- `npm run build`: compiles TypeScript and builds production assets
- `npm run lint`: runs ESLint checks
- `npm run preview`: serves production build locally

## User Flows

- Public user:
  - Open homepage
  - Search vehicles by plate, model, or owner
  - Login to access detailed vehicle view

- Admin user:
  - Login with demo credentials
  - Access dashboard
  - Register new vehicle
  - Edit existing vehicle
  - Delete vehicle

## Data and Persistence

- Vehicle records are fetched from a Railway backend API
- Frontend uses TanStack Query for caching and refetching
- Authentication state is simulated on the client and stored in localStorage

## Validation and Error Handling

- Form validation is enforced for vehicle, owner, registration, and insurance sections
- Inline validation messages guide users to fix input issues
- Runtime and request errors are displayed in user-friendly messages

## Project Goal

This project demonstrates a practical, production-style UI for vehicle registry operations while keeping setup simple for learning, demos, and rapid development.

## Future Improvements

- Role-based access control
- Audit logs for admin actions
- Advanced filtering and export options
- Unit and integration test coverage

## Author Name

Mukagasirabo Beatrice
