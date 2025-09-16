# Expense Tracker 🚀

A full-stack MERN application that allows users to track their income and expenses. It provides a user-friendly interface to manage finances, with data visualization to give a clear overview of financial habits.

## Features ✅

-   **User Authentication:** Secure registration and login system.
-   **Dashboard:** A centralized view of total income, total expenses, and account balance.
-   **Income and Expense Tracking:** Easily add, view, and delete income and expense records.
-   **Data Visualization:** Interactive charts to visualize income vs. expenses.
-   **Responsive Design:** A clean and intuitive interface that works on all screen sizes.

## Tech Stack 🔧

### Frontend

-   React
-   React Router
-   Axios
-   Chart.js
-   Moment.js
-   Styled-Components

### Backend

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   JSON Web Tokens (JWT)
-   bcryptjs

## Getting Started 🏁

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js
-   npm
-   MongoDB

### Backend Setup

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add the following variables:
    ```
    MONGO_URL=<YOUR_MONGODB_CONNECTION_STRING>
    JWT_SECRET=<YOUR_JWT_SECRET>
    ```
4.  Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Start the frontend development server:
    ```sh
    npm start
    ```

## API Endpoints 📡

The following are the main API endpoints used in the application:

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Log in an existing user.
-   `POST /api/transactions/add-income`: Add a new income record.
-   `GET /api/transactions/get-incomes`: Get all income records for the logged-in user.
-   `DELETE /api/transactions/delete-income/:id`: Delete an income record by its ID.
-   `POST /api/transactions/add-expense`: Add a new expense record.
-   `GET /api/transactions/get-expenses`: Get all expense records for the logged-in user.
-   `DELETE /api/transactions/delete-expense/:id`: Delete an expense record by its ID.

## Screenshots 📸

To add screenshots to this README, you can place your image files in the `screenshots` directory you created. Then, you can embed them in the README using Markdown like this:

```markdown
Login Page (https://drive.google.com/drive/u/0/folders/1mhiyRWbnYn2PvgiL4hmahVJ_vaiSwLjW)
Dashboard (https://drive.google.com/drive/u/0/folders/1mhiyRWbnYn2PvgiL4hmahVJ_vaiSwLjW)
Income https://drive.google.com/drive/u/0/folders/1mhiyRWbnYn2PvgiL4hmahVJ_vaiSwLjW
Expense https://drive.google.com/drive/u/0/folders/1mhiyRWbnYn2PvgiL4hmahVJ_vaiSwLjW
Transaction https://drive.google.com/drive/u/0/folders/1mhiyRWbnYn2PvgiL4hmahVJ_vaiSwLjW
```


## Contributing 🤝

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License 📄

Distributed under the MIT License. See `LICENSE` for more information.
