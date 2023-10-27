# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
to start the front end
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.



## API Documentation

### 1. User Registration

- **Endpoint:** `/api/register`
- **Method:** `POST`
- **Body Parameters:**
  - `username`: The desired username.
  - `password`: The desired password.
  - `userType`: Type of the user.
- **Responses:**
  - **Success:** `{"success": True, "message": "Registered successfully!"}`
  - **Username Exists:** `{"success": False, "message": "Username already taken!"}`
  - **Error:** `{"success": False, "message": "Error during registration!"}`

---

### 2. User Login

- **Endpoint:** `/api/login`
- **Method:** `POST`
- **Body Parameters:**
  - `username`: Username for login.
  - `password`: Password for login.
- **Responses:**
  - **Success:** `{"success": True, "message": "Logged in successfully!", "token": "<TOKEN>", "userType": <USER_TYPE>}`
  - **User Not Found:** `{"success": False, "message": "User not found!"}`
  - **Invalid Credentials:** `{"success": False, "message": "Invalid username or password!"}`
  - **Error:** `{"success": False, "message": "Internal server error!"}`

---

### 3. Chat Interface

- **Endpoint:** `/api/chat`
- **Method:** `POST`
- **Body Parameters:**
  - `message`: User's message.
  - `prompt`: Type of prompt.
  - `filename`: Name of the file (default is 'datafile.csv').
- **Response:** Returns the response message obtained from the API.

---

### 4. File Upload

- **Endpoint:** `/api/upload`
- **Method:** `POST`
- **Form-data:**
  - `file`: The file to be uploaded.
- **Responses:**
  - **Success:** `{"message": "File successfully uploaded!"}`
  - **No File Part:** `{"message": "No file part"}`
  - **No File Selected:** `{"message": "No selected file"}`
  - **Invalid File Type:** `{"message": "Invalid file type"}`

---

### 5. Data Retrieval

- **Endpoint:** `/api/data-retrieval`
- **Method:** `POST`
- **Body Parameters:**
  - `message`: User's message.
- **Response:** Returns data retrieved from the database.

---

### 6. Generate Chart

- **Endpoint:** `/api/generate`
- **Method:** `GET`
- **Response:** Returns the generated chart data.

