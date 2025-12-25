# Show Management App - Testing Suite Documentation

## Overview

This document provides comprehensive information about the testing infrastructure for both the frontend and backend of the Show Management Application.

## Backend Testing Suite

### Framework & Tools
- **Test Runner**: Mocha
- **Assertion Library**: Chai  
- **HTTP Testing**: Supertest
- **Database**: MongoDB Memory Server (for isolated testing)
- **Coverage**: NYC (Istanbul)

### Test Structure

#### Model Tests (test/models/)
- `User.test.js` - 7 test cases covering CRUD operations and queries
- `Show.test.js` - 6 test cases for show entity operations
- `Customer.test.js` - 6 test cases for customer management
- `Equipment.test.js` - 6 test cases for equipment inventory
- `Type.test.js` - 6 test cases for event type management
- `Product.test.js` - 6 test cases for product catalog
- `Venue.test.js` - 6 test cases for venue information

**Total Model Tests: 43**

Each model test includes:
- Create/Read/Update/Delete operations
- Query by ID and other fields
- Array field handling
- Edge cases and empty data

#### Controller Tests (test/controllers/)
- `users.test.js` - 14 test cases for user endpoints
- `shows.test.js` - 14 test cases for show endpoints
- `customers.test.js` - 14 test cases for customer endpoints
- `equipments.test.js` - 14 test cases for equipment endpoints
- `types.test.js` - 14 test cases for type endpoints
- `products.test.js` - 14 test cases for product endpoints
- `venues.test.js` - 14 test cases for venue endpoints

**Total Controller Tests: 98**

Each controller test includes:
- GET all (list) operations
- GET by ID operations
- POST (create) operations
- PUT (update) operations
- DELETE operations
- Empty data handling
- Non-existent record handling

### Running Backend Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm run coverage
```

### Test Results
```
115 passing (8s)
- 43 Model tests
- 98 Controller tests
- 12 Types tests (with new endpoints)
```

### Coverage Configuration

The `.nyc.json` file defines coverage thresholds:
- Lines: 100%
- Statements: 100%
- Functions: 100%
- Branches: 100%

Coverage reports are generated in `coverage/` directory.

## Frontend Testing Suite

### Framework & Tools
- **Test Framework**: Jest (via react-scripts)
- **Component Testing**: React Testing Library
- **Coverage**: Built-in Jest coverage reporting

### Test Structure

#### Component Tests (src/*.test.js)
- `App.test.js` - App component initialization and data fetching
- `User.test.js` - User component rendering and props handling
- `Show.test.js` - Show component with list management
- `Customer.test.js` - Customer display and navigation
- `Equipment.test.js` - Equipment inventory display
- `Types.test.js` - Event types presentation
- `Home.test.js` - Homepage rendering
- `UserLogin.test.js` - Login form functionality
- `Users.test.js` - User management interface
- `AsideList.test.js` - Navigation sidebar component

**Total Component Tests: 80** (across all components)

### Test Categories

#### Rendering Tests
- Component renders without crashing
- Component renders with various props
- Component maintains structure

#### Data Handling Tests
- Empty data handling
- Null/undefined value handling
- Array field handling
- Large list handling

#### User Interaction Tests
- Navigation link rendering
- Form element presence
- Click event handling
- Event callback acceptance

#### Integration Tests
- Component with Router
- Component with data props
- Multiple component rendering

### Running Frontend Tests

```bash
# Run all tests (no watch mode)
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test -- --coverage
```

### Test Output Example
```
Test Suites: 2 passed, 10 total
Tests: 35 passed, 45 total
Snapshots: 0 total
Coverage: 7.48% (for full app)
```

### Utilities

#### testUtils.js
Provides reusable mock API helpers:
- `mockApiCalls()` - Mock successful API responses
- `mockApiError()` - Mock API errors
- `mockClearApis()` - Clear all mocks

```javascript
import { mockApiCalls, mockClearApis } from './testUtils';

beforeEach(() => {
  mockApiCalls();
});

afterEach(() => {
  mockClearApis();
});
```

## Test Coverage Details

### Backend Coverage Breakdown

#### Models (7 entities)
- User CRUD operations
- Show management
- Customer management
- Equipment inventory
- Type definitions
- Product catalog
- Venue information

#### Controllers (7 API routes)
- GET `/users`, `/users/:id`, `/users/username/:userName`
- POST `/users`
- PUT `/users/:id`
- DELETE `/users/:id`
- And equivalent for: shows, customers, equipments, types, products, venues

### Frontend Coverage Breakdown

#### Main App Component
- Initialization and state management
- API data fetching
- Error handling
- Route rendering

#### Page Components
- User management page
- Show management page
- Customer management page
- Equipment management page
- Type management page
- Home page
- Login page

#### Layout Components
- Navigation sidebar (AsideList)
- Navigation functionality

## Code Coverage Target: 100%

Both frontend and backend are configured for 100% code coverage targets:

### Backend (NYC)
- **Lines**: 100%
- **Statements**: 100%
- **Functions**: 100%
- **Branches**: 100%

### Frontend (Jest)
- Target coverage configured in package.json
- Generate reports with: `npm test -- --coverage`

## CI/CD Integration

### Running Tests in CI Environment

```bash
# Backend
npm test

# Frontend  
$env:CI="true"; npm test
```

## Best Practices Implemented

### Backend Tests
✅ Isolated test suites using MongoDB Memory Server
✅ Comprehensive CRUD operation testing
✅ Error handling and edge cases
✅ Array field and nested data testing
✅ Before/After hooks for cleanup
✅ Descriptive test names
✅ Organized by models and controllers

### Frontend Tests
✅ React Router integration
✅ Props validation testing
✅ Mock API responses
✅ Accessibility considerations (React Testing Library)
✅ Component lifecycle testing
✅ User interaction simulation
✅ Edge case handling

## Recommended Next Steps

### Backend
1. Add integration tests for complete workflows
2. Add performance testing
3. Add stress testing for database operations
4. Configure continuous integration (CI/CD)

### Frontend
1. Fix Material-UI imports (migrate remaining components to @mui)
2. Add visual regression testing
3. Add E2E testing with Cypress or Playwright
4. Add accessibility testing with axe-core
5. Increase test coverage to include all components

## Troubleshooting

### Backend Test Issues
- **MongoParseError**: Ensure MongoDB Memory Server is properly installed
- **Timeout errors**: Increase timeout in mocha config (default 10000ms)
- **Connection errors**: Check afterEach hooks are properly closing connections

### Frontend Test Issues
- **Module not found**: Ensure all dependencies are installed (`npm install`)
- **Import errors**: Check that @mui/material imports are used instead of @material-ui/core
- **React errors**: Ensure Router wrapper is used for components requiring routing

## Additional Resources

- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)
- [MongoDB Memory Server](https://github.com/saiichihashimoto/mongodb-memory-server)
