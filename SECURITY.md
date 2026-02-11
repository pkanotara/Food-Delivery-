# Security Best Practices

## Environment Variables
- Never commit `.env` files to version control
- Use strong, unique values for `JWT_SECRET`
- Keep Stripe keys secure and use test keys for development
- Rotate secrets regularly in production

## Authentication
- Passwords are hashed using bcrypt with a salt factor of 10
- JWT tokens expire after 7 days
- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Email validation is performed on registration

## Input Validation
- All user inputs are validated on both frontend and backend
- Email format validation using validator package
- File upload restrictions (size: 5MB, types: images only)
- SQL injection prevention through Mongoose parameterized queries

## Admin Access
- Admin routes are protected with both auth and admin middleware
- Regular users cannot access admin endpoints
- Create admin users manually in the database

## File Uploads
- Uploaded files are validated for type and size
- Files are stored with unique names to prevent collisions
- File paths are sanitized to prevent directory traversal

## API Security
- CORS is enabled with proper configuration
- All admin endpoints require admin role verification
- Sensitive operations require authentication tokens
- Error messages don't expose sensitive information

## Production Recommendations
1. Use HTTPS in production
2. Implement rate limiting for API endpoints
3. Use httpOnly cookies for token storage
4. Add CSRF protection
5. Implement request validation middleware
6. Set up proper CORS restrictions
7. Use environment-specific configurations
8. Enable MongoDB encryption at rest
9. Regular security audits and updates
10. Implement logging and monitoring
