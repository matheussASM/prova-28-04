import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ type: 'text' })
  public name: string

  constructor(name: string) {
    this.name = name
  }
}
