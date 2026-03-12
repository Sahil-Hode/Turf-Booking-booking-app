# BookMyTurf Mobile App

A scalable **React Native (Expo) application** for discovering and booking sports turfs.
The platform supports **Customers**, **Turf Owners**, and **Admins** with a modular architecture designed for **production-level scalability**.

---

# Features

## Customer

* OTP Login
* Google Sign In
* Search turfs
* Filter by location, rating, price
* Turf details page
* Live slot booking
* Booking history
* Profile management
* Reviews

## Turf Owner

* Owner dashboard
* Manage turfs
* Accept / Reject bookings
* Earnings analytics
* Export earnings reports
* Manage slots

## Admin

* Manage users
* Turf approval system
* Platform analytics

---

# Tech Stack

### Mobile

* Expo
* React Native
* TypeScript
* React Navigation
* Zustand (State Management)
* React Query (Server State)
* Axios

### Backend

* Node.js
* Express.js
* PostgreSQL / MySQL
* Redis
* Cashfree (Payments)
* MSG91 (OTP)

---

# Project Folder Structure

Below is the **production-ready folder structure** of the application.

```
BOOKYOURTURF
│
├── .vscode
│
├── app
│
│   ├── (auth)
│   │   ├── login
│   │   ├── otp-verification
│   │   ├── google-signin
│   │   ├── profile-creation
│   │   └── role-selection
│   │
│   ├── (customer)
│   │
│   │   ├── home
│   │   │   ├── search-bar
│   │   │   ├── recommended-turfs
│   │   │   ├── most-rated-turfs
│   │   │   ├── budget-friendly
│   │   │   ├── demanded-turfs
│   │   │   └── newly-opened
│   │   │
│   │   ├── search
│   │   │   ├── search-by-name
│   │   │   ├── filter-location
│   │   │   ├── filter-rating
│   │   │   ├── filter-price
│   │   │   └── filter-sport-type
│   │   │
│   │   ├── turf-details
│   │   │   ├── gallery
│   │   │   ├── turf-info
│   │   │   ├── amenities
│   │   │   ├── rules-regulations
│   │   │   ├── reviews
│   │   │   ├── owner-contact
│   │   │   └── map-location
│   │   │
│   │   ├── booking
│   │   │   ├── live-slots
│   │   │   ├── slot-selection
│   │   │   ├── booking-summary
│   │   │   ├── payment
│   │   │   └── booking-confirmation
│   │   │
│   │   ├── my-bookings
│   │   │   ├── upcoming-bookings
│   │   │   ├── past-bookings
│   │   │   ├── cancelled-bookings
│   │   │   └── booking-history
│   │   │
│   │   └── profile
│   │       ├── user-profile
│   │       ├── edit-profile
│   │       ├── settings
│   │       ├── terms-conditions
│   │       └── logout
│   │
│   ├── (owner)
│   │
│   │   ├── dashboard
│   │   │   ├── todays-bookings
│   │   │   ├── todays-search
│   │   │   ├── upcoming-slots
│   │   │   ├── weekly-summary
│   │   │   └── recent-notifications
│   │   │
│   │   ├── turf-management
│   │   │   ├── add-turf
│   │   │   ├── edit-turf
│   │   │   ├── turf-details
│   │   │   │   ├── turf-info
│   │   │   │   ├── sports-type
│   │   │   │   ├── pricing
│   │   │   │   ├── location
│   │   │   │   └── open-close-time
│   │   │   │
│   │   │   ├── amenities
│   │   │   │   ├── flood-lights
│   │   │   │   ├── parking
│   │   │   │   ├── washroom
│   │   │   │   ├── changing-room
│   │   │   │   ├── drinking-water
│   │   │   │   ├── seating-area
│   │   │   │   └── cafeteria
│   │   │   │
│   │   │   └── turf-gallery
│   │   │
│   │   ├── bookings
│   │   │   ├── todays-bookings
│   │   │   ├── tomorrow-bookings
│   │   │   ├── weekly-bookings
│   │   │   ├── calendar-view
│   │   │   ├── booking-requests
│   │   │   ├── accepted-bookings
│   │   │   └── rejected-bookings
│   │   │
│   │   ├── earnings
│   │   │   ├── todays-income
│   │   │   ├── weekly-income
│   │   │   ├── monthly-income
│   │   │   ├── yearly-income
│   │   │   ├── earnings-analytics
│   │   │   ├── commission-deduction
│   │   │   └── export-reports
│   │   │
│   │   └── profile
│   │       ├── owner-profile
│   │       ├── edit-profile
│   │       ├── bank-details
│   │       ├── support
│   │       ├── settings
│   │       └── logout
│   │
│   ├── (admin)
│   │
│   │   ├── dashboard
│   │   │   ├── system-overview
│   │   │   ├── active-users
│   │   │   ├── active-turfs
│   │   │   └── revenue-summary
│   │   │
│   │   ├── user-management
│   │   │   ├── customers
│   │   │   └── owners
│   │   │
│   │   ├── turf-management
│   │   │   ├── pending-approvals
│   │   │   ├── approved-turfs
│   │   │   └── blocked-turfs
│   │   │
│   │   ├── booking-management
│   │   │   ├── all-bookings
│   │   │   └── dispute-management
│   │   │
│   │   └── analytics
│   │       ├── revenue-analytics
│   │       ├── user-growth
│   │       └── booking-trends
│
├── assets
│   ├── icons
│   ├── images
│   ├── fonts
│   ├── animations
│   └── illustrations
│
├── components
│
│   ├── common
│   │   ├── buttons
│   │   ├── inputs
│   │   ├── modals
│   │   ├── loaders
│   │   └── cards
│   │
│   ├── turf
│   │   ├── turf-card
│   │   ├── turf-gallery
│   │   ├── turf-amenities
│   │   ├── turf-reviews
│   │   └── turf-map
│   │
│   ├── booking
│   │   ├── slot-picker
│   │   ├── booking-card
│   │   ├── booking-calendar
│   │   └── booking-summary
│   │
│   ├── owner
│   │   ├── booking-table
│   │   ├── earnings-chart
│   │   └── slot-manager
│   │
│   └── admin
│       ├── user-table
│       ├── analytics-charts
│       └── moderation-tools
│
├── constants
│   ├── api
│   ├── theme
│   ├── colors
│   ├── routes
│   └── config
│
├── hooks
│   ├── auth
│   ├── booking
│   ├── turf
│   ├── payments
│   └── notifications
│
├── scripts
│   ├── project-reset
│   └── build-helpers
│
├── src
│
│   ├── services
│   │   ├── auth
│   │   ├── turf
│   │   ├── booking
│   │   ├── payment
│   │   └── notifications
│   │
│   ├── store
│   │   ├── auth
│   │   ├── turf
│   │   ├── booking
│   │   ├── owner
│   │   └── admin
│   │
│   ├── utils
│   │   ├── validators
│   │   ├── formatters
│   │   ├── date-utils
│   │   └── helpers
│   │
│   └── types
│       ├── user
│       ├── turf
│       ├── booking
│       └── payments
```

---

# Folder Explanation

### assets

Stores static resources like images, fonts, icons.

### app

Expo Router entry point with route groups for auth, customer, owner, and admin flows.

### components

Reusable UI components organized by common, turf, booking, and charts.

### constants

App-wide constants for colors, theme, config, and API settings.

### hooks

Custom React hooks for auth, location, debounce, and booking.

### src/store

Feature and app state stores.

### src/services

Service layer for auth, turfs, bookings, payments, and notifications.

### src/utils

Shared helpers, validators, currency formatting, and date utilities.

### src/types

Global TypeScript types.

---

# Installation

Clone repository

```
git clone https://github.com/yourusername/bookmyturf-app.git
```

Install dependencies

```
npm install
```

Run the project

```
npx expo start
```

---

# Future Improvements

* Real-time slot locking using Redis
* Push notifications
* AI turf recommendations
* Dynamic pricing
* Advanced analytics

---

# License

MIT License
