# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



# API文档

## 1. 登录

- **Endpoint**: `/api/login`
- **Method**: `POST`

### Request Body:
\```json
{
    "username": "string",
    "password": "string"
}
\```

### Responses:

- **200 OK**:
  \```json
  {
      "success": true,
      "token": "user_token_string"
  }
  \```

- **400 Bad Request**:
  \```json
  {
      "success": false,
      "message": "Error message explaining the reason"
  }
  \```

## 2. 注册

- **Endpoint**: `/api/register`
- **Method**: `POST`

### Request Body:
\```json
{
    "username": "string",
    "password": "string",
    "userType": "Customer | Merchants | Data Analysts"
}
\```

### Responses:

- **201 Created**:
  \```json
  {
      "success": true,
      "message": "User registered successfully"
  }
  \```

- **400 Bad Request**:
  \```json
  {
      "success": false,
      "message": "Error message explaining the reason"
  }
  \```

## 3. 数据检索 (Data Retrieval)

测试，不是最终版本

- **Endpoint**: `/api/data`
- **Method**: `GET`

### Query Parameters:

- `type`: The type of data to retrieve, e.g., "sales", "users", etc.
- `dateFrom`: Optional start date for data retrieval.
- `dateTo`: Optional end date for data retrieval.

### Responses:

- **200 OK**:
  \```json
  {
      "success": true,
      "data": "Array or object of data"
  }
  \```

- **400 Bad Request**:
  \```json
  {
      "success": false,
      "message": "Error message explaining the reason"
  }
  \```
