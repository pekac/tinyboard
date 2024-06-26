# Tinyboard

A small dashboard for exploring Tinybird API data.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Usage](#usage)
- [Key Decisions](#key-decisions)
- [Project Structure](#project-structure)
- [Testing](#testing)

## Project Overview

This project implements a small dashboard application to visualize and explore data from a Tinybird API endpoint. It features a widget for data display and filters for customizing the view.

## Features

- Data visualization widget using a line chart
- Filters for customizing data view:
  - Base filters (data field and SQL function)
  - Vendor selection
  - Custom filter with comparison operators
- Deep linking for sharing specific views
- Responsive design using Mantine UI components

## Tech Stack

- Next.js (React framework)
- TypeScript
- Mantine UI (component library)
- Recharts (for data visualization)
- Tailwind CSS (for additional styling)
- Jest (for testing)

## Setup

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Set up your environment variables:

- Copy `.env.example` to `.env.local`
- Replace `TOKEN_123` with a valid token for `NEXT_PUBLIC_TOKEN`

4. Run the development server:

```sh
npm run dev
```

## Usage

Once the app is running, you can:

- View the line chart showing data for different vendors
- Use the filters to customize the data view
- Select different data fields and SQL functions
- Choose specific vendors
- Add custom filters with comparison operators
- Share the current view using the URL (deep linking)

## Key Decisions

1. **Data Analysis**:

- Observed only 2 distinct vendors in the dataset
- Data covers a single month of rides

2. **Chart Selection**:

- Chose a line chart to visualize trends over time for different vendors

3. **Filtering Mechanism**:

- Implemented flexible filtering options to allow users to explore data from various angles

4. **State Management**:

- Used URL parameters for state management, enabling deep linking

5. **UI Framework**:

- Selected Mantine for its comprehensive component library and ease of use

6. **Testing**:

- Implemented unit tests for the query builder to ensure correct SQL generation

## Project Structure

- `app/`: Next.js app router components and pages
- `components/`: Reusable React components
- `core/`: Core business logic, models, and query building
- `styles/`: Global styles and Mantine theme configuration
- `utils/`: Utility functions and HTTP client

## Testing

Run the test suite with:

```sh
npm run test
```
