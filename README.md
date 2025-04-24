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

## Backend: (.NET)  
**Technical Details:**

- Provides API endpoints for user registration, product management, and CRUD operations. 
- Supports product search through Entity Framework Core and raw SQL queries. 
- Authentication and Authorization:JWT Json Web Token
Supports role-based authentication, differentiating access levels for user roles such as "user" and "admin."

## Layout  
- **Home Screen**   
![image](https://github.com/user-attachments/assets/978b3177-e8e6-4123-a4b1-128eb1c26dde)  

- **Search product**:  
![image](https://github.com/user-attachments/assets/2191dbcd-4e00-4ebd-b689-0e5333e1f183)  

- **Login**:  
![image](https://github.com/user-attachments/assets/6a72837a-f425-4e48-af7a-ad4942fdbe85)  

- **After login:**  
![image](https://github.com/user-attachments/assets/fed7a950-d7d2-4f89-baf9-235ad044358e)  

- **Product list(admin): support register/modify/delete product.**  
![image](https://github.com/user-attachments/assets/e93badbc-e41b-4687-a8a3-f92d9d76e9c9)  

![image](https://github.com/user-attachments/assets/741e1e02-6685-4f24-bd22-7efe7e9c81a4)  

- **Dialog confirm delete**: 
![image](https://github.com/user-attachments/assets/729339aa-6109-4cb6-a65d-7632ec4d3a74)  

- **Backend APIs(.Net)**  
![image](https://github.com/user-attachments/assets/a19a8dcc-4354-4193-bfa6-2bf1d7df4603)


## Flow ERD  
## How to run  
- 1. install Node.js  
- 2. .Net Framework  
- 3. Using tool Visual studio to run solution  
- 4. Create Database  
- 5. Run solution from visual studio  
- 6. Run solution from cmd.  
