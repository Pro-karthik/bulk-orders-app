## Role-Based Handling and Route Protection

This application implements role-based access control using `localStorage` for storing user roles and cookies for storing the `jwt_token`. The following approach is used:

1. **Role Storage**:  
   - The user's role (e.g., `ADMIN`, `USER`) is stored in `localStorage` upon successful login.

2. **Token Storage**:  
   - The `jwt_token` is securely stored in cookies to authenticate API requests and protect sensitive routes.

3. **Protected Routes**:  
   - Routes are protected using a `ProtectedRoute` component that checks for the presence of a valid token in cookies and verifies the user's role from `localStorage`.
   - Unauthorized users are redirected to the login page.

4. **Role-Based Layouts**:  
   - `AdminLayout` is rendered for users with the `ADMIN` role.
   - `BuyerLayout` is rendered for users with the `USER` or `ADMIN` role.

5. **Nested Routes**:  
   - Nested routes are used to efficiently manage role-based layouts and their respective child components (e.g., `Dashboard` and other routes for admin, `ProductCatalogue` and other routes for users).

This approach ensures secure and efficient role-based access control while maintaining a clean and modular structure.

## Axios Management for Login and Register

The application uses `axios` for handling API requests during login and registration. Below is the detailed explanation:

1. **Login**:
   - The login form collects `email`, `password`, and `role` (either `ADMIN` or `USER`).
   - On form submission, an API request is sent to the `/auth/login` endpoint with the user credentials.
   - If the response is successful:
     - The `jwt_token` is stored in cookies.
     - The user's role is stored in `localStorage`.
     - The user is redirected to the appropriate layout (`AdminLayout` or `BuyerLayout`) based on their role.
   - If the login fails, an error message is displayed.

2. **Register**:
   - The registration form collects `name`, `email`, `password`, and `role`.
   - On form submission, an API request is sent to the `/auth/register` endpoint with the user details.
   - If the response is successful:
     - The `jwt_token` is stored in cookies.
     - The user's role is stored in `localStorage`.
     - The user is redirected to the appropriate layout (`AdminLayout` or `BuyerLayout`) based on their role.
   - If the registration fails, an error message is displayed.

3. **Error Handling**:
   - Both login and register forms handle errors gracefully by resetting the form fields and displaying appropriate error messages.

This approach ensures seamless communication with the backend while maintaining a secure and user-friendly experience.
