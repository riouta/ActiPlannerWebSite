# ActiPlanner

ActiPlanner is a web application for planning activities. It allows users to authenticate, add, edit, and delete activities.

## Installation

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file with your environment variables.
4. Start the development server with `npm run dev`.

## Usage

- Register an account or log in.
- Add new activities to your planner.
- Edit or delete existing activities.
- View a list of all your activities.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request.

# ActiPlanner

ActiPlanner is a web application designed to help users plan and manage their activities efficiently. This README provides an overview of the project's structure and contents.

## Project Structure

The project is organized into the following main directories and files:

### Root Directory

- `package.json`: Contains metadata about the project, including dependencies, scripts, and project information.
- `README.md`: This file, providing an overview of the project.
- `next.config.js`: Configuration file for the Next.js framework.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `.eslintrc.js`: ESLint configuration file (if ESLint was used).

### Directories

#### `.next`

This directory is automatically generated by Next.js and contains build and server files.

- `static/chunks`: Contains various JavaScript chunks used by the application.
- `server`: Contains server-side code and pages generated by Next.js.

#### `components`

This directory contains React components used in the application.

- `ActivityCard.tsx`: A component that displays individual activity cards.

#### `pages`

This directory contains the pages of the application. Each file corresponds to a route in the application.

- `index.tsx`: The main page of the application.
- `LoginPage.tsx`: A page for user login.
- `api/activities.ts`: API endpoint for managing activities.
- `api/auth.ts`: API endpoint for authentication.

#### `public`

This directory contains static assets such as images, fonts, and other files that are served directly by the web server.

#### `styles`

This directory contains the CSS files for styling the application.

- `globals.css`: Global styles for the application.

#### `utils`

This directory contains utility functions and modules.

- `api.ts`: Contains API utility functions for making requests to the backend.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/actiplanner.git
   cd actiplanner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

Step-by-Step Guide to Run SQL Queries via SQLite CLI:
Open terminal on VSCode ->
navigate to pjt directory using cd path/ ->
Run the following command to open the SQLite database using the SQLite CLI tool: sqlite3 prisma/dev.db ->
Type the SQL query

1. Folder Structure

*pages/api: This should contain your API routes.
*pages/api/auth: Contains authentication related routes.
*pages/api/activities: Contains activity-related routes.
*pages/CRUD: Contains the frontend pages for CRUD operations.

2. Files

*pages/api/[...nextauth].ts: Handles authentication via NextAuth.
*pages/api/auth.ts: Manages signup and login.
*pages/api/activities/read_create.ts: Handles creating and reading activities.
*pages/api/activities/edit_delete.ts: Handles editing and deleting activities.
\*pages/CRUD/add.tsx: Frontend page to add a new activity.
