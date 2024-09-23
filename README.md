# Project Title

This is a Django project with WebSocket support using Daphne, and a React frontend with Vite and Tailwind CSS.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)

## Prerequisites

- Python 3.8 or higher
- PostgreSQL installed and running
- Node.js and npm installed

## Setup

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. **Set up a virtual environment:**
   In the main project folder, create a virtual environment:
   ```
   python -m venv venv
   ```

   Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

3. **Install the requirements:**
   ```
   pip install -r backend/requirements.txt
   ```

## Backend Setup

1. **Create a `.env` file:**
   In the `backend` folder, create a file named `.env` with the following structure:
   ```
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

2. **Run database migrations:**
   Navigate to the `backend` folder and run the following command:
   ```
   python manage.py migrate
   ```

3. **Create a superuser (optional):**
   You can create a superuser for the Django admin:
   ```
   python manage.py createsuperuser
   ```

4. **Run the Django development server:**
   ```
   python manage.py runserver
   ```

## Frontend Setup

1. **Navigate to the frontend folder:**
   ```
   cd frontend
   ```

2. **Install frontend dependencies:**
   ```
   npm install
   ```

3. **Run the React application:**
   ```
   npm run dev
   ```

## Running the Application

- Once both the backend and frontend are running, you can access the application in your browser at `http://localhost:5173` (React app) and `http://127.0.0.1:8000` (Django app).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
### Notes:
- Adjust the database connection values in the `.env` file according to your local setup.
- Make sure to replace `yourusername` and `yourproject` in the clone URL with your actual GitHub username and project name.
