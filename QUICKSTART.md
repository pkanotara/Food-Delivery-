# Quick Start Guide - Food Delivery Application

## 🚀 Get Started in 5 Minutes

### Prerequisites
Make sure you have installed:
- **Node.js** (v16+) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up free](https://www.mongodb.com/cloud/atlas)
- **Stripe Account** - [Sign up](https://stripe.com/)

### Step 1: Clone & Install
```bash
# Clone the repository
git clone https://github.com/pkanotara/Food-Delivery-.git
cd Food-Delivery-

# Install all dependencies (backend, frontend, admin)
npm run install-all
```

### Step 2: Set Up MongoDB
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier is fine)
3. Create a database user
4. Get your connection string
5. Whitelist your IP address (or use 0.0.0.0/0 for development)

### Step 3: Configure Environment Variables

#### Backend (.env)
Create `backend/.env`:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/food-delivery
JWT_SECRET=your_super_secret_key_here_make_it_long_and_random
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key
PORT=4000
CLIENT_URL=http://localhost:5173
```

#### Frontend (.env)
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:4000
```

#### Admin (.env)
Create `admin/.env`:
```env
VITE_API_URL=http://localhost:4000
```

### Step 4: Get Stripe Test Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers** → **API Keys**
3. Copy your **Secret key** (starts with `sk_test_`)
4. Paste it in `backend/.env`

### Step 5: Start the Application

Open **3 separate terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on: `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App runs on: `http://localhost:5173`

**Terminal 3 - Admin Panel:**
```bash
cd admin
npm run dev
```
Admin runs on: `http://localhost:5174`

### Step 6: Create an Admin User

1. Visit `http://localhost:5173`
2. Click "Sign In" and register a new account
3. Go to your MongoDB database
4. Find the Users collection
5. Locate your user document
6. Change the `role` field from `"user"` to `"admin"`
7. Now you can access admin features at `http://localhost:5174`

### Step 7: Test the Application

#### As a User:
1. Browse food items on the home page
2. Filter by category
3. Add items to cart
4. View cart and proceed to checkout
5. Fill delivery details
6. Use Stripe test card: `4242 4242 4242 4242`
7. View your orders

#### As an Admin:
1. Login with admin credentials at `http://localhost:5174`
2. Add new food items with images
3. View all food items
4. Manage orders
5. Update order statuses

## 🎯 Stripe Test Cards

For testing payments:
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Any future expiry date (e.g., 12/34)**
- **Any 3-digit CVC**

## 🛠️ Troubleshooting

### Backend won't start?
- Check MongoDB connection string
- Ensure MongoDB IP is whitelisted
- Verify all environment variables are set

### Frontend shows API errors?
- Make sure backend is running on port 4000
- Check VITE_API_URL in frontend/.env
- Clear browser cache

### Can't upload images?
- Check if `backend/uploads/` directory exists
- Verify multer middleware is working
- Check file size (max 5MB)

### Rate limiting errors?
- Wait 15 minutes for rate limit to reset
- Or restart backend server in development

## 📚 Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [FEATURES.md](FEATURES.md) for complete feature list
- Review [SECURITY.md](SECURITY.md) for security best practices
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment

## 💡 Quick Tips

1. **Admin Panel Access:** Change user role to "admin" in MongoDB
2. **Test Payments:** Use Stripe test cards, not real cards
3. **File Uploads:** Images are stored in `backend/uploads/`
4. **Database:** Check MongoDB Atlas for stored data
5. **API Testing:** Use Postman with the endpoints in README.md

## 🎉 You're Ready!

Your Food Delivery Application is now running!

- **User App:** http://localhost:5173
- **Admin Panel:** http://localhost:5174
- **API:** http://localhost:4000

Happy coding! 🚀
