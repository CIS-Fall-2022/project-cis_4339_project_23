# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup
```
npm install
```

### Before startup 
Setup a .env file with the following variables, e.g.:

```
MONGO_URL = mongodb+srv://<username>:<password>@cluster0.abcdc.mongodb.net/dbname
ORG = use orgID associated with the specific organization (ex: 63725cea7880fe54ac105f7d)
PORT = the specific port for the org selected (ex: 3001)
```

### Compiles and hot-reloads for development
```
npm start
```
