import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    unique: true,
    length: 255,
  })
  email!: string;

  @Column({ length: 255 })
  username!: string;

  @Column({ type: "text" })
  password!: string;

  @Column("timestampz")
  @CreateDateColumn()
  createdAt!: Date;

  @Column("timestampz")
  @UpdateDateColumn()
  updatedAt!: Date;
}
