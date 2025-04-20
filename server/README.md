## Prisma Models

The `schema.prisma` file defines the following models:

1. **Product**: Represents a product with fields:
   - `id`: Auto-incremented integer ID.
   - `name`: Name of the product.
   - `price`: Price of the product.
   - `imageUrl`: URL of the product image.

2. **Order**: Represents an order with fields:
   - `id`: Auto-incremented integer ID.
   - `buyerName`: Name of the buyer.
   - `buyerContact`: Contact information of the buyer.
   - `deliveryAddress`: Address where the order will be delivered.
   - `items`: JSON field containing the list of items in the order.
   - `status`: Enum field representing the order status (`Pending`, `InProgress`, `Delivered`).
   - `createdAt`: Timestamp of when the order was created.
   - `accountId`: Foreign key linking the order to the `Account` model.

3. **Account**: Represents a user account with fields:
   - `id`: UUID as the primary key.
   - `name`: Full name of the user.
   - `email`: Unique email address of the user.
   - `password`: Hashed password of the user.
   - `role`: Enum field representing the user's role (`ADMIN`, `USER`).
   - `orders`: Relation field linking the account to its orders.

### Enums

1. **OrderStatus**:
   - `Pending`: The order is pending.
   - `InProgress`: The order is being processed.
   - `Delivered`: The order has been delivered.

2. **Role**:
   - `ADMIN`: Represents an admin user.
   - `USER`: Represents a regular user.

## Setup Instructions

1. **Database Connection**:  
   Use [Neon.tech](https://neon.tech/) to create a PostgreSQL database. Copy the connection string and set it in the `.env` file as `DATABASE_URL`.

   Example `.env` file:
   ```
   DATABASE_URL=your_neon_database_connection_string
   ```

2. **Prisma Commands**:
   - `npx prisma migrate dev --name init`: Creates the initial migration and applies it to the database.
   - `npx prisma generate`: Generates the Prisma Client for interacting with the database.

3. **Run the Application**:
   Ensure the database is connected and migrations are applied before running the application.

## Authentication Routes

This application implements **role-based authentication** for managing user accounts. The roles supported are `USER` and `ADMIN`.

### Routes

1. **Register** (`POST /register`):
   - Allows users to register with the following fields:
     - `name`: Full name of the user.
     - `email`: Unique email address.
     - `password`: Password (minimum 6 characters).
     - `role`: Role of the user (`USER` or `ADMIN`).
   - Validates input fields and checks for duplicate email addresses.
   - Hashes the password before storing it in the database.
   - Returns a JSON response with the user's `id`, `email`, `role`, and a JWT token.

2. **Login** (`POST /login`):
   - Allows users to log in with the following fields:
     - `email`: Registered email address.
     - `password`: Password.
     - `role`: Role of the user (`USER` or `ADMIN`).
   - Validates input fields and checks if the email and role exist in the database.
   - Verifies the password using bcrypt.
   - Returns a JSON response with the user's `id`, `email`, `role`, and a JWT token.

### Example Requests

#### Register
```json
POST /register
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword",
  "role": "USER"
}
```

#### Login
```json
POST /login
{
  "email": "john.doe@example.com",
  "password": "securepassword",
  "role": "USER"
}
```

### Notes
- The `role` field ensures that users can only log in with the correct role they registered with.
- JWT tokens are generated for authentication and can be used for securing other routes.

## Product Routes

The application provides the following routes for managing products. All routes are protected and require authorization.

### 1. **Add Product** (`POST /products`)
- **Description**: Adds a new product to the database.
- **Request Body**:
  ```json
  {
    "name": "Product Name",
    "price": 100,
    "imageUrl": "https://example.com/image.jpg"
  }
  ```
- **Response**:
  - **201**: Product added successfully.
  - **400**: Validation error (e.g., missing or invalid fields).
  - **500**: Internal server error.

### 2. **Get Products** (`GET /products`)
- **Description**: Retrieves all products from the database.
- **Response**:
  - **200**: Returns an array of products.
  - **500**: Internal server error.

### 3. **Update Product** (`PUT /products/:id`)
- **Description**: Updates an existing product by its ID.
- **Request Parameters**:
  - `id`: The ID of the product to update.
- **Request Body**:
  ```json
  {
    "name": "Updated Product Name",
    "price": 150,
    "imageUrl": "https://example.com/updated-image.jpg"
  }
  ```
- **Response**:
  - **200**: Product updated successfully.
  - **400**: Validation error (e.g., invalid ID or fields).
  - **404**: Product not found.
  - **500**: Internal server error.

### 4. **Delete Product** (`DELETE /products/:id`)
- **Description**: Deletes a product by its ID.
- **Request Parameters**:
  - `id`: The ID of the product to delete.
- **Response**:
  - **200**: Product deleted successfully.
  - **400**: Invalid product ID.
  - **404**: Product not found.
  - **500**: Internal server error.

### Notes
- All routes validate input data to ensure correctness.
- Authorization middleware ensures only authorized users can access these routes.
- Errors are handled gracefully with appropriate status codes and messages.

## Order Routes

The application provides the following routes for managing orders. These routes are protected and require authorization.

### 1. **Create Order** (`POST /orders`)
- **Description**: Allows users to create a new order.
- **Request Body**:
  ```json
  {
    "buyerName": "John Doe",
    "buyerContact": "1234567890",
    "deliveryAddress": "123 Main Street",
    "items": [
      { "productId": 1, "quantity": 2, "price": 50 }
    ]
  }
  ```
- **Response**:
  - **201**: Order created successfully.
  - **400**: Validation error (e.g., missing or invalid fields).
  - **500**: Internal server error.

### 2. **Get Order Statistics** (`GET /stats`)
- **Description**: Provides admin-level statistics about orders, including:
  - Total orders.
  - Order status distribution (Pending, In Progress, Delivered).
  - Total revenue.
  - Monthly order and revenue statistics.
- **Response**:
  - **200**: Returns the statistics.
  - **500**: Internal server error.

### 3. **Get All Orders** (`GET /orders`)
- **Description**: Retrieves orders based on the user's role:
  - **For Users**: Returns only the orders placed by the logged-in user.
  - **For Admins**: Returns all orders in the system.
- **Response**:
  - **200**: Returns an array of orders.
  - **401**: Unauthorized access.
  - **500**: Internal server error.

### 4. **Get Order by ID** (`GET /orders/:orderId`)
- **Description**: Retrieves the details of a specific order by its ID.
- **Request Parameters**:
  - `orderId`: The ID of the order to retrieve.
- **Response**:
  - **200**: Returns the order details.
  - **404**: Order not found.
  - **500**: Internal server error.

### 5. **Update Order Status** (`PUT /orders/:orderId`)
- **Description**: Updates the status of an order (e.g., Pending, In Progress, Delivered).
- **Request Parameters**:
  - `orderId`: The ID of the order to update.
- **Request Body**:
  ```json
  {
    "status": "InProgress"
  }
  ```
- **Response**:
  - **200**: Order status updated successfully.
  - **404**: Order not found.
  - **500**: Internal server error.

### Notes
- **Role-Based Handling**: The `GET /orders` route efficiently handles role-based access:
  - Users can only view their own orders.
  - Admins can view all orders in the system.
- **Validation**: All routes validate input data to ensure correctness.
- **Authorization**: Middleware ensures only authorized users can access these routes.
- **Error Handling**: Errors are handled gracefully with appropriate status codes and messages.

