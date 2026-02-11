# Food Delivery Web Application

A full-stack Food Delivery application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features
- **User Authentication:** Secure JWT-based login and registration with role-based access control
- **Food Browsing:** Browse and filter food items by category with a modern, responsive interface
- **Cart Management:** Add, remove, and manage items in your shopping cart
- **Order Placement:** Seamless order placement with Stripe payment integration
- **Order Tracking:** Track order status from pending to delivered
- **Admin Panel:** Comprehensive admin dashboard for managing food items and orders
- **Fully Responsive:** Works perfectly on mobile, tablet, and desktop devices

## Tech Stack
- **Frontend:** React.js (Vite), React Router DOM, Axios
- **Backend:** Node.js, Express.js, JWT, Bcrypt
- **Database:** MongoDB Atlas with Mongoose ODM
- **Payments:** Stripe
- **File Uploads:** Multer
- **Styling:** CSS3 with modern design patterns

## Project Structure
```
├── backend/              # Express.js backend API
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth, admin, and multer middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/            # React.js user interface
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── context/     # React Context for state management
│       ├── pages/       # Page components
│       └── App.jsx      # Main app component
├── admin/               # React.js admin panel
│   └── src/
│       ├── components/  # Admin UI components
│       ├── pages/       # Admin pages
│       └── App.jsx      # Admin app component
└── package.json         # Root package.json with scripts
```

## Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Stripe account (for payment processing)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/pkanotara/Food-Delivery-.git
cd Food-Delivery-
```

### 2. Install dependencies for all projects
```bash
npm run install-all
```

Or install individually:
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install

# Admin Panel
cd ../admin && npm install
```

### 3. Set up environment variables

#### Backend (.env)
Create a `.env` file in the `backend/` directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food-delivery
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PORT=4000
CLIENT_URL=http://localhost:5173
```

#### Frontend (.env)
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:4000
```

#### Admin Panel (.env)
Create a `.env` file in the `admin/` directory:
```env
VITE_API_URL=http://localhost:4000
```

## Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:4000`

#### Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

#### Start Admin Panel
```bash
cd admin
npm run dev
```
Admin Panel will run on `http://localhost:5174`

### Production Mode

#### Backend
```bash
cd backend
npm start
```

#### Frontend & Admin
```bash
cd frontend
npm run build

cd ../admin
npm run build
```

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Food Routes
- `POST /api/foods/add` - Add food item (Admin only)
- `GET /api/foods/list` - Get all food items
- `PUT /api/foods/update/:id` - Update food item (Admin only)
- `DELETE /api/foods/delete/:id` - Delete food item (Admin only)

### Cart Routes (Protected)
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `GET /api/cart/get` - Get user cart
- `POST /api/cart/clear` - Clear cart

### Order Routes
- `POST /api/orders/place` - Place an order (Protected)
- `POST /api/orders/verify` - Verify payment
- `GET /api/orders/user` - Get user orders (Protected)
- `GET /api/orders/all` - Get all orders (Admin only)
- `PUT /api/orders/status/:id` - Update order status (Admin only)

## Creating an Admin User

To create an admin user, you need to register a regular user first, then manually update their role in the database:

1. Register a new user through the frontend
2. Connect to your MongoDB database
3. Find the user document and update the `role` field from `"user"` to `"admin"`
4. Use the admin credentials to log into the admin panel

## Security Features
- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Protected API routes
- Input validation
- Secure file upload handling
- Environment variable configuration

## Features in Detail

### User Features
1. **Registration & Login:** Secure user authentication with email validation
2. **Browse Foods:** View all available food items with images and descriptions
3. **Category Filter:** Filter foods by category (Salad, Rolls, Desserts, etc.)
4. **Shopping Cart:** Add/remove items, update quantities
5. **Checkout:** Enter delivery address and proceed to payment
6. **Payment:** Secure Stripe payment integration
7. **Order History:** View all past orders with status tracking

### Admin Features
1. **Add Food Items:** Upload food images and add new menu items
2. **Manage Foods:** View, edit, and delete existing food items
3. **Order Management:** View all orders and update their status
4. **Status Updates:** Change order status (Pending → Preparing → Out for Delivery → Delivered)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)