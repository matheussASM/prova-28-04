import { Router } from 'express'
import { Customer } from '../models/Customer'

import { customerRepository } from '../repositories/customersRepository'

const customerController = Router()

customerController.get('/', async (req, res) => {
  const data = await customerRepository.find()

  res.json(data)
})

customerController.post('/', async (req, res) => {
  const body = req.body as Omit<Customer, 'id'>
  const { identifiers } = await customerRepository.insert(body)
  const data = await customerRepository.findOneBy({ id: identifiers[0].id })

  res.status(201).json(data)
})

export { customerController }
