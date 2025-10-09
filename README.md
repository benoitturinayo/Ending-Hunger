# Ending Hidden Hunger - Rwanda Nutrition Analytics

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind_css-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Live Demo:** [View the Deployed Application](https://ending-hunger.vercel.app/)

## 📖 About

**Ending Hidden Hunger** is a comprehensive nutrition analytics platform for Rwanda. It is designed to address micronutrient deficiencies through geospatial mapping, predictive models, and data-driven policy recommendations.

This project aims to:
- Identify and visualize malnutrition hotspots across Rwanda.
- Provide evidence-based insights for policymakers.
- Support public health initiatives to combat hidden hunger effectively.

## ✨ Features

- **Geospatial Mapping**: Interactive maps highlighting malnutrition hotspots.
- **Predictive Models**: Forecasting nutritional trends to enable proactive interventions.
- **Data-Driven Policy Recommendations**: Generating actionable insights for public health strategies.
- **Comprehensive Analytics Dashboard**: A central hub for viewing key nutrition metrics and data visualizations.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Mapping**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet](https://leafletjs.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/)) installed.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/ending-hunger.git
    cd ending-hunger
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:5173](http://localhost:5173) (or the port specified in your console) to view it in the browser.

## 📂 Project Structure

Here's an overview of the key directories in this project:

```
src
├── components
│   ├── nutrition/  # Core components for the nutrition dashboard
│   └── ui/         # Reusable UI components from shadcn/ui
├── lib/            # Utility functions (e.g., cn for Tailwind)
├── pages/          # Top-level page components
├── App.tsx         # Main application component with routing
├── main.tsx        # Application entry point
└── index.css       # Global styles and Tailwind CSS configuration
```
