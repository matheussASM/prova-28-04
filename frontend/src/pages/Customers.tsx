import { FC, useState } from 'react'
import { Stack, Table, TextInput, Button } from '@mantine/core'
import { useQuery, useMutation, useQueryClient } from 'react-query'

interface ICustomer {
  id: string
  name: string
}

const Customers: FC = () => {
  const [name, setName] = useState('')

  const queryClient = useQueryClient()

  const customersQuery = useQuery('customers', async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/api/customers`,
    )

    return (await response.json()) as ICustomer[]
  })

  const customerMutation = useMutation(
    async (customer: Omit<ICustomer, 'id'>) => {
      const body = JSON.stringify(customer)

      await fetch(`${import.meta.env.VITE_API_SERVER}/api/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body as any,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('customers')
      },
    },
  )

  if (customersQuery.isLoading || !customersQuery.data) {
    return <h1>Carregando...</h1>
  }

  return (
    <Stack>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
        <TextInput
          required
          label="Nome"
          styles={{ root: { width: '100%' } }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          style={{ marginTop: 10 }}
          type="submit"
          onClick={() => customerMutation.mutate({ name: name })}
        >
          Salvar
        </Button>
      </div>

      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>

        <tbody>
          {customersQuery.data.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  )
}

export default Customers
