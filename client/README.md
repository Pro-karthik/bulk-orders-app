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

## User Layout

The `UserLayout` is designed to provide users with a seamless experience for browsing products, managing their cart, and tracking orders. It includes nested routes for various user functionalities, such as viewing the product catalogue, managing the cart, and checking order history.

### Product Catalogue Page

The `Product Catalogue` page is the primary interface for users to browse all available products. Below are the details:

#### Features

1. **Product Listing**:
   - Displays a list of all available products.
   - Each product is shown as a card with the following details:
     - Product Name
     - Product Price
     - Add to Cart button

2. **Add to Cart**:
   - Users can add products to their cart by clicking the "Add to Cart" button on each product card.
   - The product is added to the cart with a default quantity of 1.

3. **API Integration**:
   - Axios is used to fetch the list of products from the backend.
   - Endpoint: `GET /api/products`
   - The `jwt_token` from cookies is included in the request headers for authentication.

4. **Error Handling**:
   - Displays an error message if the API call fails.
   - Provides a retry button to fetch the products again.

5. **Loading State**:
   - While the data is being fetched, a loading spinner (`react-spinners`) is displayed.

6. **Responsive Design**:
   - The layout is fully responsive, ensuring usability on both desktop and mobile devices.

#### Axios Request Example

```javascript
const fetchProducts = async () => {
  const token = Cookies.get('jwt_token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get('/api/products', { headers });
    if (response.status === 200) {
      setProducts(response.data);
    }
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};
```

This page provides users with an intuitive interface to explore and select products for their needs.

## My Cart Page

The `My Cart` page is part of the `UserLayout` and provides users with an interface to manage their cart and place orders. Below are the details:

### Features

1. **Cart Management**:
   - Displays all products added to the cart.
   - Each product card includes:
     - Product Name
     - Product Price (calculated based on quantity)
     - Quantity controls (Increase/Decrease)
     - Remove button to delete the product from the cart.

2. **Quantity Adjustment**:
   - Users can increase or decrease the quantity of a product using the `+` and `-` buttons.
   - The total price is updated dynamically based on the quantity.

3. **Remove All**:
   - A "Remove All" button allows users to clear the entire cart.

4. **Place Order**:
   - A "Place Order" button triggers a popup form where users can fill in their details to complete the order.

5. **Order Form**:
   - The popup form includes fields for:
     - Buyer Name
     - Buyer Contact
     - Delivery Address
   - **Validation**:
     - Uses `React Hook Form` and `Yup Validator` for form validation.
   - **API Integration**:
     - Axios is used to send the order details and cart items to the backend.
     - Endpoint: `POST /api/orders`
     - The `jwt_token` from cookies is included in the request headers for authentication.

6. **Error Handling**:
   - Displays appropriate error messages if the cart is empty or the API call fails.

7. **Loading State**:
   - While the order is being placed, a loading state is displayed on the "Place Order" button.

8. **Responsive Design**:
   - The layout is fully responsive, ensuring usability on both desktop and mobile devices.

### Workflow
- Users can add products to the cart from the `Product Catalogue` page.
- On the `My Cart` page, users can adjust quantities or remove items.
- Once satisfied, users can click "Place Order," fill in their details in the popup form, and submit the order.

This page provides a seamless and efficient interface for managing the cart and placing bulk orders.

## My Orders Page

The `My Orders` page is part of the `UserLayout` and provides users with a detailed view of all their orders. Below are the details:

### Features

1. **Order Tracking**:
   - Displays all orders placed by the user.
   - Each order is shown as a card with the following details:
     - **Order ID**: Unique identifier for the order.
     - **Buyer Name**: Name of the buyer.
     - **Buyer Contact**: Contact information of the buyer.
     - **Delivery Address**: Address where the order will be delivered.
     - **Items**: List of products in the order, including:
       - Product Name
       - Quantity
       - Price
     - **Status**: Current status of the order (Pending, In Progress, Delivered).
     - **Order Date**: Date and time when the order was placed.

2. **Status Highlighting**:
   - The status of each order is displayed as a colored chip:
     - **Pending**: Yellow
     - **In Progress**: Blue
     - **Delivered**: Green

3. **API Integration**:
   - Axios is used to fetch the user's orders from the backend.
   - Endpoint: `GET /api/orders`
   - The `jwt_token` from cookies is included in the request headers for authentication.

4. **Error Handling**:
   - Displays an error message if the API call fails.
   - Provides a retry button to fetch the orders again.

5. **Loading State**:
   - While the data is being fetched, a loading spinner (`react-spinners`) is displayed.

6. **Responsive Design**:
   - The layout is fully responsive, ensuring usability on both desktop and mobile devices.

### Workflow
- Users can navigate to the `My Orders` page to view all their past and current orders.
- Each order card provides a comprehensive summary of the order details and status.

This page offers users a clear and organized way to track their orders and stay updated on their status.

