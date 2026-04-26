# Family Finance Tracker - Project Plan & Implementation Guide

## 📌 Project Overview
A comprehensive family finance tracking application designed for couples to manage shared and personal finances, track individual investments, manage monthly bills, and monitor debts. This document serves as a blueprint for UI/UX designers, junior developers, or AI coding agents like **Google Stitch**.

## 🎨 Design System & UI/UX Guidelines
- **Reference Application**: **Bibit App**
- **Color Palette**: Bibit-inspired. Use vibrant greens as primary accents, clean white backgrounds, and soft grays for secondary text to create a modern, trustworthy financial aesthetic.
- **Style**: Premium, clean, modern, and dynamic. Utilize cards, soft shadows, rounded corners, and clean modern typography (e.g., Inter, Roboto, or Outfit).
- **Component Style**: Heavy use of **Modals** for detailed views to avoid unnecessary page navigations and maintain context.

## 🛠️ Tech Stack & AI Agent (Google Stitch) Guidelines
**Attention Google Stitch / AI Agent:** Please follow these technical guidelines when generating the codebase:
- **Framework & Styling**: Use **Next.js** (App Router) and **Tailwind CSS**.
- **UI Components**: Build reusable components (cards, buttons, inputs) that strictly adhere to the defined design system.
- **Icons**: Use `lucide-react` for consistent, modern iconography.
- **Charts**: Use `recharts` for the real-time investment and report charts.
- **State Management**: Use React Context or standard React Hooks to mock the interactions between components.
- **Data Mocking**: Create a central `mockData.ts` file to populate the application with realistic dummy data so the UI can be validated and interacted with immediately.
- **Modals**: Implement a robust, reusable Modal/Dialog component system, as heavy use of modals is required across all modules.

---

## 🚀 Core Modules & Features

### 1. Dashboard
- Overview of Total Net Worth.
- Summary widgets for active Wallets, pending Bills, Investment performance, and active Debts.
- Quick access to recent activities or immediate action items.

### 2. Wallet Management
- **Global Access**: Detailed wallets must be accessible from a dedicated "Wallets" menu in the navigation, not just the dashboard.
- **Accessibility/Ownership**: 
  - **Shared Wallets**: Managed and visible by both husband and wife (e.g., Financial Early Retirement).
  - **Personal Wallets**: Stored and visible only by the creator (e.g., Personal Hobby).
- **Wallet Categories**: Emergency Fund, Child Fund, Pension, Sink Fund, General (at least 2 general samples, including 1 for sink fund).
- **Wallet Creation**: Keep the creation form simple (Name, Category, Type). *Do not put monthly contribution inputs in the creation form.*
- **Detail View (Modal)**: Clicking any wallet opens a comprehensive **Detail Modal** containing:
  - Form to manually add **Monthly Contributions** (Top-up).
  - **Withdrawal Feature** for taking money out.
- **Shared Wallet Specifics**:
  - **Contribution Percentage**: Display/set the target contribution split between members (e.g., Husband 60%, Wife 40%).
  - **Proof of Fund**: File/image upload to attach transfer receipts when topping up.
  - **Bank Details**: Fields to save the designated Account Number and Bank Provider for that specific shared wallet.

### 3. Investment Wallets
- **Structure**: Each specific investment asset has its *own separate wallet*. They are not grouped into a single "Investments" bucket. (e.g., "BBRI Stock" gets its own wallet, "ORI01" gets its own wallet).
- **Creation Form**: Specific dropdowns for Investment Type (Reksadana, Obligation, Stock, etc.) and a text input for the specific asset name/ticker (e.g., "BBRI").
- **Detail View (Modal)**:
  - Real-time stock/asset charts to track performance.
  - Ability to increase funds (buy more of the asset).
  - **Profit & Dividend Tracking**: 
    - Record dividends received from Stocks.
    - For Obligations, track profits based on payout schedules (Monthly vs. 6-Month).

### 4. Manage Bills (Monthly Expenses)
- **Setup Default Bills**: A setup menu to configure recurring monthly bills (e.g., electricity, internet, subscriptions). These should automatically generate and remind the user every month.
- **Manual Bills**: Ability to add one-off or non-recurring bills manually alongside the default ones.
- **Status Tracking**: Clear visual indicators showing if a bill is `Paid` or `Unpaid`.

### 5. Debt Tracker
- A dedicated module to track incoming and outgoing debts.
- Log who owes you money or who you owe money to, tracking repayment progress.

### 6. Reports Generation
- Generate visual financial reports (monthly/yearly savings progress, investment growth, expense breakdowns).

### 7. Profile Page
- Accessible by clicking the Profile Picture in the global header navigation.
- Manage user settings, display personal info, and manage linked family members.

---

## 📋 Task Checklist for Implementation (Google Stitch Prompts)

**Google Stitch Instructions**: You can process these phases sequentially. When executing a phase, generate the necessary files, components, and wire them up with mock data.

### Phase 1: Project Setup & Design System
- [ ] Initialize the Next.js + Tailwind project.
- [ ] Setup the Bibit-inspired color tokens in `tailwind.config.ts`.
- [ ] Create the Main Layout (`layout.tsx`) including a Sidebar navigation and a Top Navigation bar with a clickable Profile Picture.
- [ ] Create a reusable `Modal` component that will be used across the app.

### Phase 2: Dashboard & Profile
- [ ] Build the Dashboard page (`page.tsx`) with summary widgets (Net Worth, Active Wallets, Pending Bills, Investments).
- [ ] Build the Profile Page interface to manage user settings and linked family members.

### Phase 3: Wallet Module
- [ ] Create a dedicated `/wallets` page showing a list/grid of all wallets.
- [ ] Implement the Wallet Creation Form (Fields: Name, Category, Shared/Personal).
- [ ] Build the **Detail Wallet Modal**. Include form tabs for:
  - Top-up (Monthly Contribution)
  - Withdrawal
- [ ] Add conditional UI for Shared Wallets inside the modal: contribution percentage slider, file upload area for "Proof of Fund", and bank detail inputs.

### Phase 4: Investment Module
- [ ] Create a dedicated `/investments` view or integrate it clearly within the wallet views.
- [ ] Build the specific Investment Creation form (Type dropdown, Asset Ticker input).
- [ ] Build the **Detail Investment Modal**: integrate a mock chart (via `recharts`) for the asset, a form to add funds, and a specific section to log Dividends or Profits (Monthly vs 6-Month).

### Phase 5: Bills, Debts, and Reports
- [ ] Create the Manage Bills page. Include a "Setup Defaults" tab and a list of current month's bills with Paid/Unpaid toggles.
- [ ] Create the Debt Tracker page to log incoming/outgoing debts and remaining balances.
- [ ] Create the Reports page rendering charts (`recharts`) to visualize savings progress, expense breakdown, and investment growth.
