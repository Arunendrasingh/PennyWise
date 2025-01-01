\# PennyWise - Personal Expense Tracker

[![React Native](https://img.shields.io/badge/React_Native-v0.71-blue)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK--v49.0.6-green)](https://expo.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

**PennyWise** is an intuitive, mobile-first app designed to help you manage your personal finances. It provides features like personal expense tracking, budget management, shared expense handling, and real-time analytics through visual graphs and charts. PennyWise focuses on an offline-first approach so users can seamlessly track their expenses anytime, anywhere.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Build and Deployment](#build-and-deployment)
6. [Contributing](#contributing)
7. [License](#license)

## Features

- **Expense Management**:

  - Add, edit, and delete expenses across categories (Food, Travel, Bills, etc.)
  - Set up recurring expenses (like rent, utilities)
  - Offline-first data storage: Track expenses without internet access
  - Sync data to the cloud when online

- **Budgeting**:

  - Set and manage budgets for different categories
  - Receive alerts when nearing or exceeding budget limits

- **Expense Splitting**:

  - Split bills with friends or groups
  - Share expenses for events or trips and track what’s owed

- **Visual Reports**:

  - Graphs and charts to visualize spending patterns
  - Monthly, weekly, or custom date range reports
  - Filter by category, date, or tags

- **Secure Data Management**:

  - User authentication (Optional: Firebase/Auth0 integration)
  - All sensitive data is encrypted

- **Notifications**:
  - Daily reminders to add expenses
  - Alerts for overdue or unpaid shared expenses

## Technologies Used

- **Frontend**: [React Native](https://reactnative.dev/) (Managed Workflow)
- **State Management**: React Context, Redux (optional)
- **Backend**: FastAPI (For future integration)
- **Offline Data Storage**: WatermelonDB (For future integration)
- **Cloud Backend (Optional)**: Firebase(Current)
- **Charts**: Victory Native, React Native Chart Kit
- **Forms**: React Hook Form, Formik
- **Authentication**: Firebase Auth, AppWrite Auth (Optional)

## Installation

### Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
OBOBOBOBOBOBOBOBOBOB- React Native CLI or Expo CLI
OBOB- Git
OBOBOB
OBOB### Clone the repository:
OBOBOB
```bash
OBOBOBOBgit clone https://github.com/yourusername/pennywise.git
OBOBOBOBOBOBcd pennywise
OBOBOBOBOBOBOB```
