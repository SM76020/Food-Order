# Food Order Platform
A responsive food ordering platform built using React, where users can browse food items, add them to the cart, and place orders. Restaurants can view incoming orders via their frontend interface.

## Table of Contents
1. [Features](#features)
2. [Frontend Technologies](#frontend-technologies)
3. [Backend Technologies](#backend-technologies)
4. [Project Folder Structure](#project-folder-structure)
5. [Getting Started](#getting-started)
6. [How to Use](#how-to-use)

## Features
- **Browse Food Items:** Users can explore a list of available meals dynamically fetched from the backend.
- **Cart Management:** Users can add items to the cart, adjust item quantities, and view the cart contents in a responsive modal.
- **Checkout:** Users complete their order by filling out a checkout form with personal details (name, address, email, contact number, and pincode).
- **Order Placement:** Upon submission, orders are sent to the backend, and a success or failure message is displayed.
- **Order Management for Restaurants:** Restaurants can view new orders, accept or reject them, and provide feedback on the order status.

## Frontend Technologies
- **React (with Hooks):** Used for state management (`useState`, `useEffect`), component-based architecture, and handling user interactions.
- **Vite:** Provides a fast development environment with instant hot module reloading.
- **Axios:** Used for making HTTP requests to the backend API.
- **Context API:** Manages global cart state to avoid prop drilling across components.
- **CSS Styling:** All styling is managed through a global `index.css` file.

## Backend Technologies
- **Node.js:** Backend runtime for handling HTTP requests and processing orders.
- **Express.js:** Simplifies routing and server-side logic.
- **JSON Files:** Used as a database to store food items (`available-meals.json`) and orders (`orders.json`).

## Project Folder Structure

```
├── backend
│   ├── data
│   │   ├── available-meals.json
│   │   ├── orders.json
│   ├── public
│   │   └── images (all images for meals)
│   ├── app.js (main server file)
│   ├── package.json (backend dependencies)
│   └── package-lock.json
│
├── user-frontend (for customers)
│   ├── public
│   ├── src
│   │   ├── assets (static assets)
│   │   ├── components
│   │   │   ├── Cart.jsx
│   │   │   ├── CartContext.jsx
│   │   │   ├── CartModal.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   ├── FoodItems.jsx
│   │   │   ├── FoodList.jsx
│   │   │   ├── Header.jsx
│   │   │   └── useCart.jsx
│   │   ├── App.jsx
│   │   ├── index.css (global styling)
│   │   ├── main.jsx
│   ├── index.html
│   ├── package.json (frontend dependencies)
│   └── vite.config.js
│
└── rest-frontend (for restaurants)
    ├── public
    ├── src
    │   ├── assets (static assets)
    │   ├── components
    │   │   ├── OrderDetails.jsx
    │   │   └── CartModal.jsx
    │   ├── App.jsx
    │   ├── index.css (global styling)
    │   ├── main.jsx
    ├── index.html
    ├── package.json (frontend dependencies)
    └── vite.config.js
```

## Getting Started

To run this project locally, follow the steps below:

### Backend Setup
1. Navigate to the `backend` folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run start
   ```
4. The backend will be available at `http://localhost:3000`.

### User Frontend Setup (for customers)
1. Navigate to the `user-frontend` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173` to view the customer-facing app.

### Restaurant Frontend Setup
1. Navigate to the `rest-frontend` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5174` to view the restaurant-facing app.

## How to Use
1. **Browse Meals:** Explore a variety of meals on the customer frontend.
2. **Add to Cart:** Select meals and adjust quantities from the list of available items.
3. **Place an Order:** Fill out your personal details and place the order.
4. **View Orders (for Restaurants):** The restaurant interface displays new orders.


