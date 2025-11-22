# Ending Hidden Hunger - Rwanda Nutrition Analytics

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind_css-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
https://www.python.org/downloads/release/python-3137/

**Live Demo:** [View the Deployed Application](https://ending-hunger.vercel.app/)
**Video Demo:** [Watch a short video of the project](https://drive.google.com/file/d/1BMvZFG9NV3-smKlBwHGxVErUQOkyUYIF/view?usp=sharing)

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

## 📊 Data Sources and API

This platform integrates data from several authoritative sources to provide a comprehensive view of nutrition and public health in Rwanda. The data is accessed via public APIs or downloaded from data portals.

*   **[World Bank API](https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information)**
    *   **Description**: Provides key development indicators, including health and nutrition statistics like stunting, wasting, and anemia rates.
    *   **Endpoint Example**: Accessing data for a specific indicator in Rwanda.
        ```
        https://api.worldbank.org/v2/country/RWA/indicator/SH.STA.STNT.ZS
        ```

*   **[Humanitarian Data Exchange (HDX) - Rwanda](https://data.humdata.org/country/rwa)**
    *   **Description**: Offers datasets related to humanitarian response, including food security assessments, population density, and locations of health facilities. Data is typically available in formats like CSV, SHP, and GeoJSON.
    *   **API Access**: Datasets can be accessed programmatically via the [HDX API (CKAN)](https://docs.data.humdata.org/).

*   **[Rwanda Ministry of Health (MoH)](https://www.moh.gov.rw/)**
    *   **Description**: The official source for national health policies, reports, and survey data (like the Demographic and Health Survey - DHS). This data provides the foundational context for public health interventions.

*   **[WorldPop](https://www.worldpop.org/)**
    *   **Description**: Delivers high-resolution, open-source geospatial demographic data, including population distribution, which is crucial for accurately mapping malnutrition hotspots and allocating resources.

## � Getting Started

### 📄 Project Documentation

*   **Academic Document**: [To Whom It May Concern](https://drive.google.com/file/d/11fkM19nzAChJiTr42L6KwUQvaumpcgN4/view?usp=sharing)

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/)) installed.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/Zero-Hunger.git
    cd Zero-Hunger
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
