import express from 'express'
import cors from 'cors'

import { customerController } from './controllers/customerController'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Routes */
app.use('/api/customers', customerController)

export { app }
