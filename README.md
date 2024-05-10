# Well-structured Node.js API

This repository serves as a robust starting point for building scalable and maintainable RESTful APIs using Node.js. It provides a well-structured architecture, following industry best practices and design patterns.

## Installation

To set up the server, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/jeeva-sd/Fastify-node-api.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.dev.env` file in the root directory and add the following variables:

   ```plaintext
   APP_PORT=8080
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USERNAME=root
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=your_database
   ```

4. Generate migration files:

   Run the following command to generate migration files based on database schema:

   ```bash
   npm run db:generate
   ```

5. Run migrations:

   Once you have the migration files, you can run the migrations to update your database schema:

   ```bash
   npm run db:migrate
   ```

6. Seed the database:

   Before running the server, make sure to seed the database with the following command:

   ```bash
   npm run db:seed
   ```

7. Run the server:

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:8080`.

For production deployment, first create a `.prod.env` file for production environment variables. And, start the server with `npm run prod`.