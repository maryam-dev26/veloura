# Veloura

Veloura is a responsive fashion e-commerce website built with
Vanilla JavaScript.

## About

Veloura is a frontend e-commerce project where I practiced
JavaScript by building real-world features such as product
filtering, search, sorting, cart, wishlist, API integration,
LocalStorage persistence, hash-based routing, and responsive
navigation.

## Features

- Product search
- Category filtering
- Product sorting
- Product detail view
- Shopping cart
- Wishlist
- LocalStorage persistence
- API integration with DummyJSON
- Loading and error states
- Responsive layout
- Mobile navigation
- Keyboard accessibility

## Tech Stack

- HTML
- CSS
- JavaScript
- DummyJSON API
- LocalStorage
- ES Modules

## How to Run

1. Clone the repository:

https://github.com/maryam-dev26/veloura.git

2. Open the project in VS Code.
3. Run the project using a local development server such as Live Server.
4. Open the provided local URL in your browser.

## Project Structure

```text
veloura/
├── assets/
│   └── images/
├── css/
│   └── style.css
├── js/
│   ├── api.js
│   ├── cart.js
│   ├── main.js
│   ├── products.js
│   ├── router.js
│   ├── state.js
│   ├── storage.js
│   └── wishlist.js
├── index.html
└── README.md

## Module Responsibilities

1. main.js — Initializes the application and handles event listeners.
2. state.js — Manages shared application state.
3. api.js — Handles product data fetching from the API.
4. storage.js — Manages LocalStorage for cart and wishlist persistence.
5. products.js — Handles product rendering, filtering, searching, and sorting.
6. cart.js — Manages cart functionality and rendering.
7. wishlist.js — Manages wishlist functionality and rendering.
8. router.js — Handles hash-based routing and product detail views.

## What I Learned

Building Veloura helped me practice and understand:

- DOM manipulation and event handling
- Event delegation for dynamic elements
- JavaScript array methods such as `map()`, `filter()`, and `sort()`
- LocalStorage for persisting cart and wishlist data
- Async JavaScript with `fetch()` and `async/await`
- Handling API loading and error states
- Working with external API data and mapping API responses
- Hash-based routing for product detail views
- ES Modules and separation of concerns
- Centralized state management
- Responsive, mobile-first design
- Accessibility basics such as keyboard navigation, focus states, and ARIA attributes
- Debugging and refactoring a growing JavaScript project