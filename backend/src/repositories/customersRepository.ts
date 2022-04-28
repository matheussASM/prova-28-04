import { DB } from '../database'

import { Customer } from '../models/Customer'

export const customerRepository = DB.getRepository(Customer)
