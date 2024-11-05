const express = require('express')
const app = express()
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})

connectDB()

// Using ejs for views
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/', mainRoutes)
app.use('/todos', todoRoutes)


app.listen(process.env.PORT, ()=> {
    console.log('Server is listening')
})