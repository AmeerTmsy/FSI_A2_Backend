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
 
app.use(cors({origin: true, credentials: true})) 
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