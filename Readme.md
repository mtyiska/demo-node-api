
### **Changes and Additions**
1. **Dependencies**:
   - Added `express`, `swagger-jsdoc`, and `swagger-ui-express` for API routing and Swagger UI generation.
   - Added `prom-client` for Prometheus metrics collection.
   - Added `dotenv` for environment variable management.
   - Added `cors` and `body-parser` for middleware.
   - Added `reflect-metadata` for future extensibility.

2. **Dev Dependencies**:
   - Included TypeScript types for Express, Node.js, `body-parser`, and `cors`.
   - Added `eslint` and `@typescript-eslint` plugins for linting TypeScript files.
   - Added `jest` and `ts-jest` for unit testing.

3. **Scripts**:
   - **`start`**: Runs the app in development mode with `ts-node-dev`.
   - **`build`**: Compiles the app to JavaScript and cleans up the `dist` directory.
   - **`start:prod`**: Starts the compiled production app.
   - **`test`**: Runs Jest in watch mode.
   - **`lint`**: Runs ESLint for code quality checks.
   - **`prettier`** and **`prettier:fix`**: Runs Prettier to ensure consistent formatting.
   - **`swagger:generate`**: Generates Swagger JSON documentation from JSDoc comments in the code.

---

### **How to Use**
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start in Development Mode**:
   ```bash
   npm run start
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Run in Production Mode**:
   ```bash
   npm run start:prod
   ```

5. **Generate Swagger Documentation**:
   ```bash
   npm run swagger:generate
   ```

6. **Lint and Format Code**:
   ```bash
   npm run lint
   npm run prettier
   ```

7. **Run Tests**:
   ```bash
   npm run test
   ```

8. **Visit Swagger**:
    ```bash
        http://localhost:4400/swagger
    ```# demo-node-api
