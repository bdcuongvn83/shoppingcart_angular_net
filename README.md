# Features:

- Home Screen: Allows users to search for products.

- Product Screen: Manages CRUD operations for products.

- Login Screen: Supports user login with username and password
Front-end: Angular, Back-end: .NET Framework

## Frondend: (Angular)
**Technical Details:**

- Authentication: Secures API endpoints using JWT (JSON Web Token) to ensure proper authorization.  
- Product Search: Implements search functionality for products by name using Entity Framework Core.  
- Role-Based Authorization: Differentiates functionality based on login status (e.g., guest vs. logged-in users). 
- CanActivate / Authguard: Ensures some menus or pages require login using route guards. 
- Reactive Forms Validation: Utilizes Angular Reactive Forms for input validation. 
- Angular Material: Uses Angular Material components for buttons and UI elements.  
- CSS: Designs the interface using custom CSS for styling. 
- Interceptor: Implements an interceptor to add the JWT token in API calls for authentication. 
- Observables and Subjects: Implements Observables and BehaviorSubject for managing events related to user login status. 
- All api services are designed with Observable techniques to handle asynchronous events. 

## Backend: ((.NET))  
**Technical Details:**

- Provides API endpoints for user registration, product management, and CRUD operations. 
- Supports product search through Entity Framework Core and raw SQL queries. 
- Authentication and Authorization:JWT Json Web Token
Supports role-based authentication, differentiating access levels for user roles such as "user" and "admin."

## Layout  

## Flow ERD  
## How to run  
- 1. install Node.js  
- 2. .Net Framework  
- 3. Using tool Visual studio to run solution  
- 4. Create Database  
- 5. Run solution from visual studio  
- 6. Run solution from cmd.  
