This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
# Wallet Dashboard

A comprehensive web application for tracking personal finances across multiple accounts. This application helps users manage their income and expenses, set budgets, and visualize their financial data.

![Wallet Dashboard](https://i.imgur.com/example.png)
![NEW SCREENSHOT](https://github.com/user-attachments/assets/37e6031d-0340-41c1-9dd7-e8b305c1d197)
![REORT SCREEN SHOT](https://github.com/user-attachments/assets/b0fbcea1-2b5c-496e-95fe-beca1bd182ff)



## Live Demo

[View Live Demo](https://walletapplication.vercel.app/)

## Features

### 1. Transaction Management
- Track all income and expenses across multiple accounts
- Categorize transactions with custom categories and subcategories
- Support for multiple account types:
  - Bank accounts
  - Mobile money
  - Cash

### 2. Financial Overview
- Real-time account balances
- Visual representation of financial data through charts
- Monthly income vs expenses comparison
- Net worth calculation

### 3. Budgeting
- Set budgets for different categories
- Real-time budget tracking
- Automatic notifications when exceeding budget limits
- Weekly, monthly, and yearly budget options

### 4. Reporting
- Generate detailed transaction reports
- Filter transactions by:
  - Date range
  - Transaction type (income/expense)
  - Categories
  - Accounts
- Export reports to CSV format

### 5. Categories Management
- Predefined categories for common expenses
- Custom subcategories for detailed tracking
- Link transactions to specific categories
- Category-wise spending analysis

## Technology Stack

- **Frontend Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Prerequisites

Before running this project, make sure you have:

1. Node.js (v18 or higher)
2. npm (v8 or higher)
3. Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wallet-dashboard.git](https://github.com/kagisaac/walletapplication.git
   ```

2. Navigate to the project directory:
   ```bash
   cd wallet-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Project Structure

```
wallet-dashboard/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Context providers
├── components/            # React components
│   ├── AddTransactionDialog.tsx
│   ├── GenerateReportDialog.tsx
│   ├── Overview.tsx
│   └── ...
├── lib/                   # Utilities and contexts
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # Helper functions
│   └── wallet-context.tsx # Wallet state management
└── public/               # Static assets
```

## Usage Guide

### Adding Transactions
1. Click the "Add Transaction" button
2. Select transaction type (income/expense)
3. Enter amount and select category
4. Choose account and add optional note
5. Submit the transaction

### Setting Budgets
1. Click "Set Budget" button
2. Enter budget amount
3. Select period (weekly/monthly/yearly)
4. Optionally select specific category
5. Confirm budget settings

### Generating Reports
1. Click "Generate Report" button
2. Select date range
3. Choose transaction type filter
4. View filtered transactions
5. Export to CSV if needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/wallet-dashboard](https://github.com/yourusername/wallet-dashboard)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
![REORT SCREEN SHOT](https://github.com/user-attachments/assets/edf60382-288f-4169-a07b-1ca870a8bffb)
![NEW SCREENSHOT](https://github.com/user-attachments/assets/a6374941-2b5c-427b-9e4e-7fcb9b15006c)
