## Prisma Models

The `schema.prisma` file defines the following models:

1. **Product**: Represents a product with fields like `id`, `name`, `price`, and `imageUrl`.
2. **Order**: Represents an order with fields like `id`, `buyerName`, `buyerContact`, `deliveryAddress`, `items` (JSON), `status` (enum: Pending, InProgress, Delivered), and `createdAt`.
3. **Account**: Represents a user account with fields like `id`, `name`, `email`, `password`, and `role` (enum: ADMIN, USER).

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

