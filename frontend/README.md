# Data Platform Frontend

This project uses [VueJS 3](https://vuejs.org/) with [Vite](https://vitejs.dev/) and [TailwindCSS](https://tailwindcss.com/).
For form validation [Vuelidate](https://vuelidate-next.netlify.app/) is used.
## Project setup
```
npm install
```

### Before startup 
Setup a .env file with following variables, e.g.:

```
VITE_ROOT_API=http://localhost:3001 (makes sure this matches port for established in backend and match with organization selected)
MONGO_URL = mongodb+srv://<username>:<password>@cluster0.abcdc.mongodb.net/dbname
ORG = selected organization id (ex: 63725cea7880fe54ac105f7d)
PORT = match port with backend (ex: 3001)
```
### Compiles and hot-reloads for development
```
npm run dev
```
