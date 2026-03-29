# Vehicle Registration Management Platform

A modern web application for managing vehicle registration records with a public browsing experience and an authenticated admin workflow.

## Overview

This platform allows users to view registered vehicles publicly and enables administrators to manage records through a secure login area. It is designed as a front-end application with local mock persistence for easy demo and development use.

## Key Features

- Public vehicle registry homepage with search
- Vehicle details view available from the public list
- Admin authentication for protected operations
- Dashboard for management actions
- Multi-step vehicle registration form
- Edit existing vehicle records
- Delete vehicle records
- Field validation and user-friendly error handling
- Loading states and status indicators
- Local data persistence using browser storage

## Demo Login Credentials

Use the following credentials for admin access:

- Email: test@gmail.com
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
	- Open vehicle details

- Admin user:
	- Login with demo credentials
	- Access dashboard
	- Register new vehicle
	- Edit existing vehicle
	- Delete vehicle

## Data and Persistence

- Vehicle records are stored in browser localStorage
- The app includes seeded sample vehicle data for demo usage
- Clearing browser storage resets the dataset to seed values

## Validation and Error Handling

- Form validation is enforced for vehicle, owner, registration, and insurance sections
- Inline validation messages guide users to fix input issues
- Runtime and request errors are displayed in user-friendly messages

## Project Goal

This project demonstrates a practical, production-style UI for vehicle registry operations while keeping setup simple for learning, demos, and rapid development.

## Future Improvements

- Backend API integration
- Role-based access control
- Audit logs for admin actions
- Advanced filtering and export options
- Unit and integration test coverage
##  Author  Name
 Mukagasirabo Beatrice 
