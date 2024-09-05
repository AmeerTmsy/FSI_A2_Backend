require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
const bookRoutes = require('./routes/bookRoutes')
const autherRoutes = require('./routes/autherRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const bookGenreRoutes = require('./routes/bookGenreRoutes')
const app = express()
const port = 3000

let allowedOrigins = [];
if (process.env.ENVIRONMENT === 'development') {
  allowedOrigins = [`http://localhost:5173`, `http://localhost:5174`];
} else if (process.env.ENVIRONMENT === 'production') {
  allowedOrigins = [`https://fsi-a1-fontend.vercel.app`, `https://fsi-a1-admin-page.vercel.app`];
}

app.use(cors({credentials: true,
  origin: allowedOrigins
})) 
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Library home page')
})

app.use('/books', bookRoutes)
app.use('/authers', autherRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/genres', bookGenreRoutes) 
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


main().then(() => console.log('connected')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}