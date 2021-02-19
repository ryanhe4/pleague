import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn
} from 'typeorm'

@Entity({
  name: 'email_validates'
})
export class EmailValidate {
  @PrimaryGeneratedColumn()
  id!: number

  @Index()
  @Column({ length: 255 })
  code!: string

  @Column({ unique: true, length: 255 })
  email!: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date
}
