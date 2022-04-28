import 'dotenv/config'
import { DataSource } from 'typeorm'

import { Customer } from './models/Customer'

const { DB_USER, DB_PASSWORD, DB_URL, DB_PORT, DB_NAME } = process.env

const DB = new DataSource({
  type: 'postgres',
  url: `postgress://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`,
  /* For demo only, do not use synchronize in production */
  synchronize: true,
  logging: false,
  entities: [Customer],
})

export { DB }
