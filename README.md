# Data Platform Project Setup

Requirements:

This project uses NodeJS and MongoDB.

## Backend Node Application
```
cd backend
```
Follow instructions in backend README

## Frontend Vue 3 Application
```
cd frontend
```
Follow instructions in frontend README

Postman API documentation link = https://documenter.getpostman.com/view/19841668/2s83zdwSFx

## Multiple Instances Configuration
```
This application can run multiple instances using one database with each organization having one frontend and one backend. So each organization will have a duplicate of the frontend and backend that will hold a different .env files within them to signify which organization is being ran so the organizations can all run simutaneously. 

The database has a collection that hold all the documents of each organization with an id field and OrgName field. 

The backend .env will hold the MONGO_URL, ORG, and PORT variables. All organizations will use the same MONGO_URL because they all pull data from the same database. However, the ORG variable will hold the organization id of the specific being used from the database. And the PORT variable will increment by 1 for each organzation being ran. 

For example the first organization will run a backend .env file that consist of:

      MONGO_URL = mongodb+srv://ADMIN:database23@cluster0.shiau56.mongodb.net/group##projectcis####
      ORG = organization1id
      PORT = 3001 
      
Second organization:
      MONGO_URL = mongodb+srv://ADMIN:database23@cluster0.shiau56.mongodb.net/group##projectcis#### 
      ORG = organization2id
      PORT = 3002
  
  
Third Organization
      MONGO_URL = mongodb+srv://ADMIN:database23@cluster0.shiau56.mongodb.net/group##projectcis####
      ORG = organization3id
      PORT = 3003
      
      
    
    
While the frontend .env file will hold the matching port number that was declared in the backend for the VITE_ROOT_API and the PORT variables. 
       VITE_ROOT_API=http://localhost:3001
       MONGO_URL = mongodb+srv://ADMIN:database23@cluster0.shiau56.mongodb.net/group##projectcis####
       ORG = organization1id
       PORT = 3001

```
