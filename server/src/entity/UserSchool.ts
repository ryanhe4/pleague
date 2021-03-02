import {
  Column,
  CreateDateColumn,
  Entity, getRepository,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './User'
import { schoolInfo } from '../routes/api/auth/auth.ctrl'

@Entity({
  name: 'user_schools'
})

export class UserSchool {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 255 })
  school_name!: string

  @Column({ length: 255 })
  address!: string

  @Column()
  region!: string

  @Column({ default: 0 })
  point!: number

  @OneToMany(type => User, user => user.school_info)
  @JoinColumn({ name: 'fk_user_id' })
  users!: User[]

  @Index()
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date

  static findBySchoolName(schoolName: string) {
    const repo = getRepository(UserSchool)
    return repo.findOne({
      where: {
        school_name: schoolName
      }
    })
  }

  static async createInstance(school: schoolInfo) {
    const newUserSchoolInfo = new UserSchool()
    newUserSchoolInfo.address = school.adres
    newUserSchoolInfo.region = school.region
    newUserSchoolInfo.school_name = school.schoolName
    if (school?.point != null) {
      newUserSchoolInfo.point = school?.point
    }
    await getRepository(UserSchool).save(newUserSchoolInfo)
    return newUserSchoolInfo
  }
}
