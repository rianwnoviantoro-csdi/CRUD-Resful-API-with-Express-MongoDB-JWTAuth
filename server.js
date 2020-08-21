const express = require('express')
const mongoose = require('mongoose');
const app = express()
require('dotenv/config')
const articleRoutes = require('./routes/articleRoutes')
const authRoutes = require('./routes/authRoutes')

app.use(express.json())

app.use('/api/article', articleRoutes)
app.use('/api/auth', authRoutes)

// MongoDB connect
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
    .then(() => {
        console.log('database conected')
        app.listen(process.env.PORT_LISTEN, (req, res) => {
            console.log(`API running at: http://localhost:${process.env.PORT_LISTEN}`)
        })
    }).catch((err) => {
        console.log(err)
    })
