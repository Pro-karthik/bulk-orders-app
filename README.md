# Agrofix Fresh

Agrofix Fresh is a full-stack web application designed to streamline bulk vegetable and fruit orders. Buyers can explore a wide range of products, place bulk orders, and track their order status. Admins are empowered with tools to efficiently manage inventory and orders, ensuring a seamless experience for all users. The application emphasizes a user-friendly interface, robust backend functionality, and efficient database management.

## Tools and Technologies:
- **Frontend**:
  - React.js
  - Tailwind CSS
  - Material-UI
  - React Hook Form
  - Recharts
  - Axios
  - js-cookie
  - React Spinners
  - React Icons
  - React Router DOM
  - ReactJS Popup
  - Yup Validator
- **Backend**:
  - Node.js
  - Express.js
  - Prisma ORM
  - JWT (JSON Web Tokens)
  - Bcrypt for password hashing
- **Database**:
  - PostgreSQL (hosted on Neon.tech)
- **State Management**:
  - Context API
- **Other Tools**:
  - Vite for frontend development
  - Nodemon for backend development

## Environment Setup

### Frontend
1. Create a `.env` file in the `client` directory with the following content:
   ```
   VITE_API_BASE_URL="http://localhost:5000"
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Backend
1. Create a `.env` file in the `server` directory with the following content:
   ```
   DATABASE_URL="your_postgresql_connection_string"
   PORT="5000"
   JWT_SECRET="your_jwt_secret"
   FRONTEND_URL="http://localhost:5173"
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run Prisma migrations:
   ```
   npx prisma migrate dev --name init
   ```
4. Start the backend server:
   ```
   npm run dev
   ```

This setup ensures that both the frontend and backend are properly configured and ready for development.
