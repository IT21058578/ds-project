# Best Practices Implemented In Authorization Module

- No Personally Identifying Information is stored in JWT. Seperate call after verification to get user data.
- All tokens are recorded serverside in order to check for usage of expired and outdated tokens.
- All tokens are recorded serverside which allow to revoke said tokens at any time

This service was created by combining prior existing 'auth' and 'comm' service. Was not feasible to keep them seperate as each individual service was very lean while being necessary for core functionality.
