import express from 'express'
import { getRepository } from 'typeorm'
import { UserSchool } from '../../../entity/UserSchool'
import { SummonProfile } from '../../../entity/SummonProfile'
import { User } from '../../../entity/User'

export const schoolList = async (req: express.Request, res: express.Response) => {
  try {
    //학교정보..
    const school = await getRepository(UserSchool).find({
      select: ['id', 'school_name', 'region', 'point']
    })
    return res.send(school)
  } catch (e) {
    console.error(e)
    return res.status(500).send('오류발생')
  }
}

export const summonerNoParam = async (req: express.Request, res: express.Response) => {
  try {
    // 가장 포인트 높은 소환사 선택
    const school = await getRepository(UserSchool).findOne({
      order: {
        point: 'DESC'
      }
    })

    //const cursor = 24

    let c_summonerQuery = getRepository(SummonProfile).createQueryBuilder('sp')
      .innerJoin('sp.user', 'u', 'u.id= sp.userId')
      .innerJoin('u.school_info', 'us', 'u.schoolInfoId = us.id')
      .where('us.school_name = :name', { name: school?.school_name })
      .select(['sp.id', 'sp.name', 'sp.tier', 'sp.rank', 'sp.leaguePoints', 'sp.created_at', 'sp.tier AS tier', 'sp.leaguePoints AS lp'])
      .orderBy(`FIELD(tier, "IRON", "BRONZE","SILVER","GOLD","PLATINUM","DIAMOND","MASTER","GRANDMASTER","CHALLENGER") DESC, lp`, 'DESC')

    console.log(req.query.cursor)

    if (req.query.cursor) {
      c_summonerQuery.andWhere('sp.id = :id', { id: parseInt(<string>req.query.cursor, 10) })
    }

    const c_summoner = await c_summonerQuery.getOne()

    const summonerQuery = getRepository(SummonProfile)
      .createQueryBuilder('sp')
      .innerJoin('sp.user', 'u', 'u.id= sp.userId')
      .innerJoin('u.school_info', 'us', 'u.schoolInfoId = us.id')
      .select(['sp.id', 'sp.name', 'sp.tier', 'sp.rank', 'sp.leaguePoints', 'sp.created_at', 'sp.tier AS tier', 'sp.leaguePoints AS lp', 'sp.created_at AS ca'])
      .where('us.school_name = :name', { name: school?.school_name })
      .andWhere('(FIELD(tier, "IRON", "BRONZE","SILVER","GOLD","PLATINUM","DIAMOND","MASTER","GRANDMASTER","CHALLENGER") < FIELD(:tier, "IRON", "BRONZE","SILVER","GOLD","PLATINUM","DIAMOND","MASTER","GRANDMASTER","CHALLENGER") or (sp.tier = :tier and ' +
        '((sp.rank = :rank and (sp.leaguePoints < :lp or (sp.leaguePoints = :lp and sp.created_at > :created_at ))) or sp.rank > :rank)))',
        {
          tier: c_summoner?.tier,
          rank: c_summoner?.rank,
          created_at: c_summoner?.created_at,
          lp: c_summoner?.leaguePoints
        })
      .andWhere('NOT sp.id = :id', { id: c_summoner?.id })
      .orderBy(`FIELD(tier, "IRON", "BRONZE","SILVER","GOLD","PLATINUM","DIAMOND","MASTER","GRANDMASTER","CHALLENGER") DESC, lp DESC, ca`, 'ASC')
      .take(10)

    if(!req.query.cursor) {
      summonerQuery.orWhere('sp.id = :id', { id: c_summoner?.id })
    }

    const summoner = await summonerQuery
      .getMany()

    return res.status(200).send({ summoner, school: school?.school_name })
  } catch (e) {
    console.error(e)
    return res.status(500).send(e)
  }
}

export const summonerList = async (req: express.Request, res: express.Response) => {
  const { schoolName } = req.params

  if (!schoolName) res.status(403).send('오류발생')
  try {
    const school = await getRepository(UserSchool).findOne({
      where: { school_name: schoolName }
    })

    if (!school) return res.status(403).send('오류')

    const summoner = await getRepository(SummonProfile).createQueryBuilder('sp')
      .innerJoin(User, 'u', 'u.id= sp.userId')
      .innerJoin(UserSchool, 'us', 'u.schoolInfoId = us.id')
      .where('us.school_name = :name', { name: school.school_name })
      .select(['sp.id', 'sp.name', 'sp.tier', 'sp.rank', 'sp.leaguePoints'])
      .getMany()

    return res.status(200).send({ summoner })
  } catch (e) {
    console.error(e)
    return res.status(500).send('오류발생')
  }
}
