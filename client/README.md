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


## Admin Layout

The `AdminLayout` is designed to provide admin users with tools to manage the application efficiently. It includes nested routes for various admin functionalities, such as managing products, orders, and viewing statistics.

### Dashboard Route

The `Dashboard` route is a key feature of the `AdminLayout`. It provides an overview of the application's performance and order statistics. Below are the details:

1. **API Integration**:
   - The `Dashboard` uses the `/api/stats` endpoint to fetch data.
   - Axios is used to make the API call, with the `jwt_token` from cookies included in the request headers for authentication.

2. **Data Display**:
   - The dashboard displays the following statistics:
     - **Total Orders**: The total number of orders in the system.
     - **Pending Orders**: The number of orders with a status of "Pending."
     - **In Progress Orders**: The number of orders being processed.
     - **Delivered Orders**: The number of orders that have been delivered.
     - **Total Revenue**: The total revenue generated from all orders.

3. **Charts and Visualizations**:
   - **Order Status Distribution**:
     - A pie chart (using `recharts`) shows the percentage distribution of orders by status (Pending, In Progress, Delivered).
   - **Monthly Revenue**:
     - A bar chart (using `recharts`) displays the revenue generated each month.

4. **Loading and Error Handling**:
   - While the data is being fetched, a loading spinner (`react-spinners`) is displayed.
   - If the API call fails, an error message is shown to the user.

5. **Responsive Design**:
   - The dashboard is fully responsive and adapts to different screen sizes, ensuring a seamless experience on both desktop and mobile devices.

This route provides admins with a comprehensive overview of the application's performance, enabling them to make informed decisions.

## Product Management Route

The `Product Management` route is part of the `AdminLayout` and provides a comprehensive interface for managing products. Below are the details:

### Features

1. **Product Table**:
   - Utilizes **Material-UI's DataGrid** for displaying products in a tabular format.
   - Includes columns for:
     - Product ID
     - Product Name
     - Product Price
     - Actions (Edit and Delete)
   - Provides pagination and responsive design for better usability.
   - Provides built-in features such as:
     - Pagination
     - Sorting
     - Filtering
     - Responsive design for better usability.

2. **Add Product**:
   - A popup form is used for adding new products.
   - **React Hook Form** is used for managing form state and validation.
   - **Yup Validator** is integrated for schema-based form validation.
   - Fields include:
     - Product Name
     - Product Price
     - Product Image URL
   - On successful submission, the product is added to the database and the table is updated.

3. **Edit Product**:
   - A popup form is used for editing existing products.
   - Pre-fills the form with the selected product's details.
   - Uses the same validation and form management as the Add Product form.
   - Updates the product in the database and refreshes the table.

4. **Delete Product**:
   - Provides a delete button for each product in the table.
   - On confirmation, the product is removed from the database and the table is updated.

5. **API Integration**:
   - Axios is used for making API calls to the backend.
   - Endpoints include:
     - `GET /api/products`: Fetch all products.
     - `POST /api/products`: Add a new product.
     - `PUT /api/products/:id`: Update an existing product.
     - `DELETE /api/products/:id`: Delete a product.

6. **Error Handling**:
   - Displays appropriate error messages if API calls fail.
   - Provides a retry button for fetching products in case of failure.

7. **Responsive Design**:
   - The layout and table are fully responsive, ensuring usability on both desktop and mobile devices.

### Popup Utilization
- **Add Product Popup**:
  - Triggered by a button labeled "➕ Add New Product."
  - Displays a form for adding a new product.
- **Edit Product Popup**:
  - Triggered by an edit icon in the Actions column.
  - Displays a form for editing the selected product.

This route provides an efficient and user-friendly interface for managing products, leveraging modern libraries and tools for enhanced functionality.

## Orders Management Route

The `Orders Management` route is part of the `AdminLayout` and provides a comprehensive interface for managing orders. Below are the details:

### Features

1. **Order Table**:
   - Utilizes **Material-UI's DataGrid** for displaying orders in a tabular format.
   - Includes columns for:
     - Order ID
     - Buyer Name
     - Buyer Contact
     - Delivery Address
     - Items (displayed as a list of products with quantities)
     - Status (Pending, In Progress, Delivered)
     - Actions (Update Status)
   - Provides built-in features such as:
     - Pagination
     - Sorting
     - Filtering
     - Responsive design for better usability.

2. **Update Order Status**:
   - Includes a button in the Actions column to update the status of an order.
   - Status transitions:
     - `Pending` → `In Progress`
     - `In Progress` → `Delivered`
     - `Delivered`: No further updates allowed (button disabled).
   - Updates the status in the database and refreshes the table.

3. **API Integration**:
   - Axios is used for making API calls to the backend.
   - Endpoints include:
     - `GET /api/orders`: Fetch all orders.
     - `PUT /api/orders/:id`: Update the status of an order.

4. **Error Handling**:
   - Displays appropriate error messages if API calls fail.
   - Provides a retry button for fetching orders in case of failure.

5. **Loading State**:
   - While data is being fetched, a loading spinner (`react-spinners`) is displayed.

6. **Responsive Design**:
   - The layout and table are fully responsive, ensuring usability on both desktop and mobile devices.

### Stats Update
- The route dynamically updates the order status and reflects the changes in the table.
- Admins can efficiently manage the order lifecycle using the provided tools.

This route provides an efficient and user-friendly interface for managing orders, leveraging modern libraries and tools for enhanced functionality.

