## Workflow Guide

### When Starting a Coding Session

1. Start Docker containers:
   ```bash
   npm run docker-up
   ```
2. Start the development server with nodemon:
   ```bash
   npm run dev
   ```
3. (Optional) Open Prisma Studio to inspect the database:
   ```bash
   npm run prisma-studio
   ```

### When Changes Are Made to the Prisma Schema

1. Save changes to `schema.prisma`.
2. Run a new migration to apply the changes to the database:
   ```bash
   npm run prisma-migrate
   ```
3. Generate the updated Prisma Client:
   ```bash
   npm run prisma-generate
   ```
4. Restart the development server (if necessary):
   ```bash
   npm run restart
   ```

### When Changes Are Made to the Server Code

- Do Nothing: `nodemon` will automatically restart the server when you save changes.

### When Changes Are Made to Docker Configuration

1. Stop the Docker containers:
   ```bash
   npm run docker-down
   ```
2. Start the Docker containers again:
   ```bash
   npm run docker-up
   ```

### When Adding a New Feature (e.g., Room Routes/Controllers)

1. Update `schema.prisma` (if necessary) and follow the steps for Prisma schema changes.
2. Implement the new route, controller, and service logic.
3. Test the new feature using tools like Postman or `curl`.

---

## Summary of Commands

| Action                           | Command                   |
| -------------------------------- | ------------------------- |
| Start Docker containers          | `npm run docker-up`       |
| Stop Docker containers           | `npm run docker-down`     |
| Start development server         | `npm run dev`             |
| Run Prisma migrations            | `npm run prisma-migrate`  |
| Generate Prisma Client           | `npm run prisma-generate` |
| Open Prisma Studio               | `npm run prisma-studio`   |
| Pirsma push Use in dev!!         | `npm run prisma-db-push`  |
| Restart the server               | `npm run restart`         |
| Build the project for production | `npm run build`           |

---

## API Endpoints and Example Request Bodies

### **1. User Endpoints**

#### **1.1 Register a User**

- **Endpoint**: `POST /api/users/register`
- **Request Body**:
  ```json
    "username": "testuser",
    "password": "password123"
  }
  ```

#### **1.2 Get All Users**

- **Endpoint**: `GET /api/users`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```

#### **1.3 Get a User by ID**

- **Endpoint**: `GET /api/users/:id`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```

#### **1.4 Update a User**

- **Endpoint**: `PUT /api/users/:id`
- **Request Body**:
  ```json
  {
    "username": "updateduser",
    "password": "newpassword123",
    "role": "Admin"
  }
  ```

#### **1.5 Delete a User**

- **Endpoint**: `DELETE /api/users/:id`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```

---

### **2. Room Endpoints**

#### **2.1 Create a Room**

- **Endpoint**: `POST /api/rooms`
- **Request Body**:
  ```json
  {
    "name": "Conference Room",
    "capacity": 10,
    "type": "Meeting"
  }
  ```

#### **2.2 Get All Rooms**

- **Endpoint**: `GET /api/rooms`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```

#### **2.3 Get a Room by ID**

- **Endpoint**: `GET /api/rooms/:id`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```

#### **2.4 Update a Room**

- **Endpoint**: `PUT /api/rooms/:id`
- **Request Body**:
  ```json
  {
    "name": "Updated Room",
    "capacity": 15,
    "type": "Conference"
  }
  ```

#### **2.5 Delete a Room**

- **Endpoint**: `DELETE /api/rooms/:id`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <admin_token>"
  }
  ```

---

### **3. Authentication Endpoint**

#### **3.1 Login**

- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```

---

53049736-1161-4c03-ae69-6c35a59d212b

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzMDQ5NzM2LTExNjEtNGMwMy1hZTY5LTZjMzVhNTlkMjEyYiIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzQyODM3NjQ4LCJleHAiOjE3NDI4NDEyNDh9.nRMAZ6zuKcl6HxUzG6GQp--Z4QNTgAgrjExi3BgZ56w
