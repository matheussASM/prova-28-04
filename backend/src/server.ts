import 'reflect-metadata'
import 'dotenv/config'

import { app } from './app'
import { DB } from './database'

const port = process.env.SERVER_PORT

DB.initialize()
  .then(async () => {
    try {
      app.listen(port, () => console.log(`Server running on port: ${port}`))
    } catch (error) {
      console.error(`Error: ${error.message}`)
    }
  })
  .catch((error) => console.error(`Error: ${error.message}`))
