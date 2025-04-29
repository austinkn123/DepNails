# DepNails Application

DepNails is a full-stack application designed to manage scheduling, services, technicians, and clients for a nail salon. It consists of a React-based frontend powered by Vite and a .NET 9 backend API. The application is structured to ensure scalability, maintainability, and ease of development.

---

## Application Structure

### 1. **Frontend**
- **Framework**: React
- **Build Tool**: Vite
- **Language**: JavaScript
- **Key Features**:
  - Redux for state management
  - Material UI for components and styling
  - Axios for HTTP requests with interceptors for request/response handling.
  - ESLint for code quality and consistency.
- **Folder Structure**:
  - `src/`: Contains all React components, utilities, and assets.
  - `utils/`: Includes shared utilities like Axios interceptors.
  - `public/`: Static assets served directly.

### 2. **Backend**
- **Framework**: ASP.NET Core Web API
- **Target Framework**: .NET 9
- **Language**: C# (Version 13.0)
- **Key Features**:
  - Dependency Injection for service and repository management.
  - PostgreSQL database integration using `Npgsql`.
  - OpenAPI (Swagger) for API documentation.
  - Static file serving and fallback routing for SPA integration.
- **Folder Structure**:
  - `ServiceSetup/`: Contains service registration logic.
  - `Controllers/`: API controllers for handling HTTP requests.
  - `Repositories/`: Data access layer for interacting with the database.

---

## Libraries and Tools

### **Frontend**
- **React**: Component-based UI library.
- **Vite**: Fast build tool for modern web projects.
- **Axios**: HTTP client for API communication.
- **ESLint**: Linter for maintaining code quality.
- **@vitejs/plugin-react**: Babel-based plugin for React development.

### **Backend**
- **ASP.NET Core**: Framework for building web APIs.
- **Npgsql**: PostgreSQL database driver for .NET.
- **Microsoft.Extensions.DependencyInjection**: Built-in dependency injection framework.
- **OpenAPI/Swagger**: API documentation and testing.

---

## Development Setup

### Prerequisites
- **Frontend**: Node.js (v16+), npm or yarn.
- **Backend**: .NET 9 SDK, PostgreSQL database.

### Steps
1. **Frontend**:
   - Navigate to `depnails.client/`.
   - Install dependencies: `npm install`.
   - Start the development server: `npm run dev`.

2. **Backend**:
   - Navigate to `DepNails.Server/`.
   - Update the connection string in `appsettings.json`.
   - Run the application: `dotnet run`.

---

## Features

- **Frontend**:
  - Responsive UI for managing clients, technicians, and schedules.
  - Axios interceptors for handling authentication and error responses.

- **Backend**:
  - RESTful API endpoints for CRUD operations.
  - PostgreSQL database integration for persistent data storage.
  - OpenAPI documentation for easy API testing.

---

## Future Enhancements

- Add authentication and authorization using JWT.
- Add unit and integration tests for both frontend and backend.

---

## Contributors

- **Developer**: [Your Name]

Feel free to contribute or report issues to improve the application!
