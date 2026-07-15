# Project_ecommerce

## Overview
This project delivers a full-stack marketplace experience where users can browse products, apply multiple filters, and sort results instantly. The frontend presents the experience while the backend owns all business logic, validation, and filtering pipeline.

## Features
- Responsive marketplace layout with a sticky filter sidebar on desktop and a mobile drawer on smaller screens
- Category, price range, minimum rating, and sorting controls
- Backend-driven filtering and sorting with centralized validation
- Loading, empty, and error states
- Unit tests for backend filtering logic and a frontend component interaction test

## Technology Stack
- Frontend: React, Vite, CSS
- Backend: Node.js, Express.js
- Testing: Vitest, Testing Library

## Architecture
- Backend routes and controllers are in server/src
- Reusable filtering and sorting services live in server/src/services
- The frontend uses a custom hook to manage state, API requests, and debounced price updates

## Installation
### 1. Install backend dependencies
```bash
cd server
npm install
```

### 2. Install frontend dependencies
```bash
cd ../client
npm install
```

## Environment Variables
Copy the example environment files and update values if needed:
```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

## Run Commands
### Start the backend
```bash
cd server
npm start
```

### Start the frontend
```bash
cd client
npm run dev
```

## API Documentation
### GET /api/products
Returns filtered and sorted products.

Query parameters:
- categories: comma-separated categories
- minPrice: minimum price
- maxPrice: maximum price
- minRating: minimum star rating
- sort: default, price_asc, price_desc, rating_desc, name_asc

Example:
```bash
curl "http://localhost:5000/api/products?categories=Electronics,Footwear&minPrice=100&maxPrice=500&minRating=4&sort=price_asc"
```

### GET /api/products/filters
Returns available categories, price bounds, and sorting options.

## Filtering and Sorting Logic
The backend pipeline is:
1. Start from the original dataset
2. Apply category filtering
3. Apply price filtering
4. Apply rating filtering
5. Apply sorting
6. Return the result set

The original data array is never mutated.

## Testing
### Backend tests
```bash
cd server
npm test
```

### Frontend tests
```bash
cd client
npm test
```

## Screenshots
Add screenshots to a docs/images folder or replace this section with generated images after running the app locally.

## Assumptions
- Sample products are stored in memory for the assessment scope.
- External image URLs are used for product visuals.

## Future Improvements
- Add authentication and checkout flow
- Support server-side pagination and search
- Connect to a real database and image CDN

## Viva Preparation Notes
- Filtering is implemented on the backend so the business logic is centralized and testable.
- Category filtering uses OR logic within the category group and AND logic with price and rating settings.
- Sorting happens after filtering to preserve the correct pipeline.
- The frontend uses debounced price updates to keep API requests efficient.

## Suggested Git Commit Plan
- chore: initialize client and server projects
- feat: add product dataset and REST API
- feat: implement backend filtering service
- feat: add backend sorting pipeline
- feat: build responsive filter sidebar
- feat: connect frontend filters to product API
- feat: add product grid and sorting dropdown
- feat: add empty loading and error states
- test: add filtering and sorting unit tests
- docs: add setup and architecture documentation
