import {
  Column,
  CreateDateColumn,
  Entity,
  getRepository,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './User'
import { summonerInfo } from '../routes/api/auth/auth.ctrl'

@Entity({
  name: 'summoner_profiles'
})

export class SummonProfile {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({unique: true})
  uuid!: string

  @Column({unique: true})
  name!: string

  @Column()
  profileIconId!: number

  @Column({ nullable: true })
  tier!: string

  @Column({ nullable: true })
  rank!: string

  @Column({ nullable: true })
  leaguePoints!: number

  @Column()
  summoner_level!: number

  @OneToOne(() => User, user => user.summon_profile)
  user!: User

  @Index()
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date

  static findbySummonerName(name: string) {
    const repo = getRepository(SummonProfile)
    return repo.findOne({
      where: {
        name
      }
    })
  }

  static async createInstance(summoner: summonerInfo) {
    const newSummoner = new SummonProfile()
    if (summoner.rank != null) {
      newSummoner.rank = summoner.rank
    }
    if (summoner.tier != null) {
      newSummoner.tier = summoner.tier
    }
    if (summoner.leaguePoints != null) {
      newSummoner.leaguePoints = summoner.leaguePoints
    }
    newSummoner.uuid = summoner.id
    newSummoner.profileIconId = summoner.profileIconId
    newSummoner.name = summoner.name
    newSummoner.summoner_level = summoner.summonerLevel
    await getRepository(SummonProfile).save(newSummoner)

    return newSummoner
  }
}
