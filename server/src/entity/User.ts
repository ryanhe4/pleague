import {
  Column,
  CreateDateColumn,
  Entity,
  getRepository,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { SummonProfile } from './SummonProfile'
import { UserSchool } from './UserSchool'
import { userType } from '../routes/api/auth/auth.ctrl'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

@Entity({
  name: 'users',
  schema: 'pleague'
})

export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 255 })
  email!: string

  @Column({ length: 16 })
  username!: string

  @Column({ length: 255 })
  password_hash?: string

  @Index()
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date

  @OneToOne(type => SummonProfile, { onDelete: 'CASCADE' })
  @JoinColumn()
  summon_profile!: SummonProfile

  @ManyToOne(type => UserSchool, school => school.users)
  @JoinColumn()
  school_info!: UserSchool | undefined

  static async findbyEmail(email: string) {
    const repo = getRepository(User)
    return await repo.findOne({
      relations: ['summon_profile', 'school_info'],
      where: {
        email
      }
    })
  }

  static createInstance(form: userType) {

    const user = new User()
    user.email = form.email
    user.username = form.username
    return user
  }

  setPassword = async (password: string) => {
    this.password_hash = await bcrypt.hash(password, 11)
  }

  checkPassword = async (password: string) => {
    const hash = this.password_hash
    return await bcrypt.compare(password, <string>hash)
  }

  serialize = () => {
    delete this.password_hash
    return this
  }
  generateToken = () => {
    const key: jwt.Secret = process.env.JWT_SECRET!
    const token = jwt.sign({
      id: this.id,
      email: this.email,
      summoner: this.summon_profile,
      school: this.school_info
    }, key, {
      expiresIn: '7d'
    })
    return token
  }
}
