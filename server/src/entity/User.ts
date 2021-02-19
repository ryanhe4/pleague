import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index
} from 'typeorm'

@Entity({
  name: 'users',
  schema: "pleague"
},)

export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({  length: 255 })
  email!: string

  @Column({ length: 16 })
  username!: string

  @Column({ unique: true, length: 48 })
  summoner_name!: string

  @Index()
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date

  @Index()
  @Column({default: false})
  is_certified!: boolean
}
