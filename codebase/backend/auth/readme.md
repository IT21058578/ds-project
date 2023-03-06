# Best Practices Implemented In Authorization Module

- No Personally Identifying Information is stored in JWT. Seperate call after verification to get user data.
- All tokens are recorded serverside in order to check for usage of expired and outdated tokens.
- All tokens are recorded serverside which allow to revoke said tokens at any time
