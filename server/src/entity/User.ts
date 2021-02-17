import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index, BaseEntity
} from 'typeorm'

@Entity({
  name: 'users',
  schema: "pleague"
},)

export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  email!: string

  @Column({ length: 16 })
  username!: string

  @Column({ length: 48 })
  summoner_name!: string

  @Index()
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date

  @Index()
  @Column()
  is_certified!: boolean
}
