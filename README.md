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
├── app
│   ├── (auth)
│   ├── (customer)
│   ├── (owner)
│   └── (admin)
├── assets
│   ├── icons
│   ├── images
│   ├── fonts
│   └── animations
├── components
│   ├── common
│   ├── turf
│   ├── booking
│   └── charts
├── constants
├── hooks
├── scripts
├── src
│   ├── services
│   ├── store
│   ├── utils
│   └── types
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
