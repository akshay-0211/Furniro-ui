# Figma-matching eCommerce Shop

This project is a Figma-matching eCommerce shop built with React.js (frontend) and Node.js/Express (backend), using MongoDB Atlas for persistent storage.

## Features

- **Responsive UI**: Matches the Figma design closely, including header, filter/sort bar, product grid, hover effects, feature bar, and footer.
- **Product CRUD Operations**: Add, update, and delete products with modals connected to the backend.
- **Filtering, Sorting, and Pagination**: Controls for filtering, sorting, and pagination that send requests to the backend with the correct query parameters.
- **Add to Cart**: A static "Add to Cart" button on each product tile, with backend persistence for cart data.
- **Cart Display**: The cart count is displayed in the UI, and the cart is fetched from the backend after adding an item.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account for database storage.

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd task-q1
   ```

2. **Install dependencies**:

   - For the client (frontend):
     ```bash
     cd client
     npm install
     ```
   - For the server (backend):
     ```bash
     cd server
     npm install
     ```

3. **Environment Variables**:

   - Create a `.env` file in the `server` directory with the following variables:
     ```
     MONGODB_URI=<your-mongodb-atlas-uri>
     PORT=5000
     ```

4. **Run the application**:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd client
     npm start
     ```

## Uploading to GitHub

1. **Initialize a Git repository** (if not already done):

   ```bash
   git init
   ```

2. **Add your files to the repository**:

   ```bash
   git add .
   ```

3. **Commit your changes**:

   ```bash
   git commit -m "Initial commit"
   ```

4. **Create a new repository on GitHub**:

   - Go to [GitHub](https://github.com/) and log in.
   - Click on the "+" icon in the top right corner and select "New repository".
   - Name your repository and click "Create repository".

5. **Link your local repository to the GitHub repository**:

   ```bash
   git remote add origin <github-repository-url>
   ```

6. **Push your changes to GitHub**:
   ```bash
   git push -u origin main
   ```

## Testing

- Use Postman or any API testing tool to test the backend endpoints.
- Use the browser's DevTools to verify that frontend actions trigger backend requests and update the UI.

## License

This project is licensed under the MIT License.
