# Features:

The application is a shopping website (Front-end: Angular, Back-end: .NET Framework ) that currently supports essential features such as: 
- Product Search: Allows users to search for products by name. 
- Product Management: Includes functionalities to create, update, and delete products. 
- User Registration & Login: Users can sign up and log in using their credentials. 
- Authentication: Secured access to APIs using JWT (JSON Web Token) for user verification. 

Additional features such as shopping cart and order placement are planned and will be implemented soon. 

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

**Flow technical for Frondend and Backend of this project:**  

![image](https://github.com/user-attachments/assets/d200fc2b-804b-4a62-bcca-e6c1b41b726d)


## Layout  
- **Home Screen**   
![image](https://github.com/user-attachments/assets/978b3177-e8e6-4123-a4b1-128eb1c26dde)  

- **Search product**:  
![image](https://github.com/user-attachments/assets/2191dbcd-4e00-4ebd-b689-0e5333e1f183)  

- **Login**:  
![image](https://github.com/user-attachments/assets/7f389665-67b4-427b-a6cf-eaf4674cf6de)


- **After login:**   
![image](https://github.com/user-attachments/assets/591bc33b-5cd8-4ae9-b385-e274b04d86c9)  

-**Register**  
![image](https://github.com/user-attachments/assets/88e49ae9-1f15-4c91-b956-46ca2cbcc5f3)  

**After register:**  
![image](https://github.com/user-attachments/assets/b51015ca-e257-4477-a39d-580f5c335ad2)  

- **Product list(admin): support register/modify/delete product.**  
![image](https://github.com/user-attachments/assets/e93badbc-e41b-4687-a8a3-f92d9d76e9c9)  

- **Register Product** 
![image](https://github.com/user-attachments/assets/741e1e02-6685-4f24-bd22-7efe7e9c81a4)  

- **Validate Error**:
![image](https://github.com/user-attachments/assets/43867fe5-2029-42af-80fd-99f909392850)

- **Dialog confirm delete(Angular Material)**: 
![image](https://github.com/user-attachments/assets/729339aa-6109-4cb6-a65d-7632ec4d3a74)  

- **Backend APIs(.Net)**  
![image](https://github.com/user-attachments/assets/a19a8dcc-4354-4193-bfa6-2bf1d7df4603)


## Flow ERD  

![image](https://github.com/user-attachments/assets/833976b3-43d0-45c1-9b6d-d6ab4a4ff5ca)

## How to run  

1. Clone this repository  
- 1. install Node.js  
https://nodejs.org/en  
Downloads Node.js v22.15.0  

- 2. .Net Framework  
https://visualstudio.microsoft.com/vs/preview/#download-preview  
Install Visual Studio 2022  
- 3. Using tool Visual studio to run solution   
Open solution in downloađe repository:  
![image](https://github.com/user-attachments/assets/6eef3fb5-bcc8-4efc-bc05-e9940aaf3052)  

- 4. Create Database , run script Database.sql to create tables to Microsoft SQL server.  
✓ install Microsof SQL server is here: https://www.microsoft.com/en-us/sql-server/sql-server-downloads  
➜ script database.sql in the folder Database\database.sql  
 
- 5. Run solution from visual studio  
![image](https://github.com/user-attachments/assets/ed0d3bb0-48ab-4ba4-8ff9-39be93988d8d)  

**Automatically start Frondend and backend like below:**  

![image](https://github.com/user-attachments/assets/66b1c1c1-2145-4fe7-9b82-e59a7fd93f03)  

Thank you for reviewing the guide! If you have any questions or need clarification, feel free to ask. Your feedback is always welcome to help improve the material.
