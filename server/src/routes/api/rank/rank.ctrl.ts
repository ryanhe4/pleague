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
    const school = await getRepository(UserSchool).findOne({
      order: {
        point: 'DESC'
      }
    })

    const summoner = await getRepository(SummonProfile).createQueryBuilder('sp')
      .innerJoin(User, 'u', 'u.id= sp.userId')
      .innerJoin(UserSchool, 'us', 'u.schoolInfoId = us.id')
      .where('us.school_name = :name', { name: school?.school_name })
      .select(['sp.id', 'sp.name', 'sp.tier', 'sp.rank', 'sp.leaguePoints'])
      .getMany()

    return res.status(200).send({ summoner, school: school?.school_name })
  } catch (e) {
    console.error(e)
    return res.status(500).send('오류발생')
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
