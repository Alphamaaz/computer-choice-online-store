# Laptop Selling Website Backend

A comprehensive Node.js/Express backend API for an online laptop selling website with full e-commerce functionality.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Password encryption with bcrypt
  - Email verification (optional)

- **Product Management**
  - CRUD operations for laptop products
  - Advanced filtering and search
  - Product specifications and images
  - Stock management
  - Featured products

- **Order Management**
  - Complete order lifecycle
  - Order status tracking
  - Shipping address management
  - Order cancellation

- **Payment Integration**
  - Stripe payment processing
  - Payment intent creation
  - Webhook handling
  - Payment status tracking

- **Security Features**
  - Input validation
  - Rate limiting
  - CORS configuration
  - Helmet security headers
  - Error handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Payment**: Stripe
- **Email**: Nodemailer
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Stripe account (for payments)
- Gmail account (for emails)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laptop-selling-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/laptop-selling-db

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d

   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/brands/list` - Get product brands
- `GET /api/products/categories/list` - Get product categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders` - Get all orders (Admin)

### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/confirm-payment` - Confirm payment
- `GET /api/payments/status/:orderId` - Get payment status
- `POST /api/payments/webhook` - Stripe webhook

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get single user (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

## Database Models

### User
- Authentication fields (email, password)
- Personal information (firstName, lastName, phone)
- Address information
- Role-based access (user/admin)
- Account status

### Product
- Basic info (name, brand, category, description)
- Pricing (price, discount, originalPrice)
- Specifications (processor, memory, display, etc.)
- Stock management
- Images and ratings

### Order
- Order items with quantities
- Shipping address
- Payment information
- Order status tracking
- Total calculations

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRE` | JWT expiration time | No (default: 30d) |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `EMAIL_HOST` | SMTP host | Yes |
| `EMAIL_PORT` | SMTP port | Yes |
| `EMAIL_USER` | Email username | Yes |
| `EMAIL_PASS` | Email password | Yes |

## Security Features

- **Input Validation**: All inputs are validated using express-validator
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Configured for frontend integration
- **Helmet**: Security headers
- **JWT**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security

## Error Handling

The API includes comprehensive error handling:
- Validation errors
- Database errors
- Authentication errors
- Payment errors
- Custom error responses

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

### File Structure
```
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── uploads/         # File uploads
├── server.js        # Main server file
├── package.json     # Dependencies
└── README.md        # Documentation
```

## Deployment

1. Set up environment variables for production
2. Configure MongoDB Atlas or local MongoDB
3. Set up Stripe webhooks
4. Configure email service
5. Deploy to your preferred hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
