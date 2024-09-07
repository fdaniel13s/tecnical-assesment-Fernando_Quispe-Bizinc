# Blog Project - Backend

This is a blog project developed with Node.js, Sequelize, and PostgreSQL.

## Requirements

- Node.js (v20.14.0 or higher)
- PostgreSQL
- npm (v6.14.4 or higher)

## Environment Configuration

1. Clone the repository:
    ```sh
    git clone <REPOSITORY_URL>
    cd <REPOSITORY_NAME>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project with the following content, make sure added your own database configuration and secret key:
    ```plaintext
    DB_NAME=blog
    DB_USER=postgres
    DB_PASSWORD=12345678
    DB_HOST=localhost
    DB_DIALECT=postgres
    JWT_SECRET_KEY=your_secret_key
    ```

## Running the Project

1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running at `http://localhost:5000`.

## Project Structure

- `src/config/database.js`: Database connection configuration.
- `src/models/`: Sequelize models.
- `src/models/db.js`: Initialization of models and database connection.
- `src/models/comment.js`: Definition of the `Comment` model.
