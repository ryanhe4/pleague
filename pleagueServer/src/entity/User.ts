import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from "typeorm";

@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    unique: true,
    length: 255,
  })
  email: string;

  @Column({ length: 255 })
  username: string;

  @Column({ type: "text" })
  password!: string;

  @Index()
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
}
