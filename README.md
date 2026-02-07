# Simple User Cart

A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a robust backend API and a responsive frontend interface for managing users, products, carts, and orders.

## 🚀 Features

- **User Authentication**: Secure registration and login using JWT and bcrypt.
- **Product Management**: Browse and view available products.
- **Shopping Cart**: Add items to cart, view cart summary, and manage quantities.
- **Order Processing**: Place orders and view order history.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
- **State Management**: efficient state handling with Redux Toolkit and React Query.
- **Single Concurrent Login**: Restricts users to one active session at a time for enhanced security.

## 🛠️ Tech Stack

### Client (Frontend)

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **State Management**: Redux Toolkit, React Query
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Toastify

### Server (Backend)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **Utilities**: cors, dotenv, nodemon

## 📂 Project Structure

```
simple-user-cart/
├── client/         # React frontend application
│   ├── src/        # Source code (components, redux, hooks)
│   └── ...
├── server/         # Express backend application
│   ├── controllers/# Route controllers
│   ├── models/     # Mongoose models
│   ├── routes/     # API routes
│   └── ...
└── ...
```

## 🔌 API Endpoints

### Users (`/api/users`)

| Method | Endpoint  | Description         | Auth Required |
| :----- | :-------- | :------------------ | :------------ |
| `POST` | `/`       | Register a new user | No            |
| `POST` | `/login`  | Login user          | No            |
| `POST` | `/logout` | Logout user         | Yes           |

### Items (`/api/items`)

| Method | Endpoint | Description       | Auth Required |
| :----- | :------- | :---------------- | :------------ |
| `GET`  | `/`      | Get all items     | No            |
| `POST` | `/`      | Create a new item | No            |

### Carts (`/api/carts`)

| Method | Endpoint | Description          | Auth Required |
| :----- | :------- | :------------------- | :------------ |
| `GET`  | `/`      | Get user's cart      | Yes           |
| `POST` | `/`      | Add item/Create cart | Yes           |

### Orders (`/api/orders`)

| Method | Endpoint | Description        | Auth Required |
| :----- | :------- | :----------------- | :------------ |
| `GET`  | `/`      | Get user's orders  | Yes           |
| `POST` | `/`      | Create a new order | Yes           |

## 🏁 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (Local or AtlasURI)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd simple-user-cart
    ```

2.  **Install Server Dependencies:**

    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

1.  **Start the Backend Server:**

    ```bash
    cd server
    npm run dev
    ```

2.  **Start the Frontend Client:**
    ```bash
    cd client
    npm run dev
    ```

The client will typically run on `http://localhost:5173` and the server on `http://localhost:5000`.

## 📄 License

This project is licensed under the ISC License.
