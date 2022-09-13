import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'

dotenv.config()
const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use('/auth', authRoutes)

const URL = process.env.URI
const PORT = process.env.PORT || 4500

mongoose.connect(URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server is live at http://localhost:${PORT}`)))