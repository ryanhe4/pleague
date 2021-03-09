import express from 'express'
import careerClient from '../../../lib/api/careerclient'
import { searchByName, searchBySummoner } from '../../../lib/api/riot/riotAPIs'
import { getRepository } from 'typeorm'
import { User } from '../../../entity/User'
import { EmailValidate } from '../../../entity/EmailValidate'
import { createAuthEmail } from '../../../lib/etc/emailTemplates'
import sendMail from '../../../lib/etc/sendMail'
import { UserSchool } from '../../../entity/UserSchool'
import { SummonProfile } from '../../../entity/SummonProfile'
import Joi from 'joi'

export const searchSchools = async (req: express.Request, res: express.Response) => {
  type schoolContent = {
    campusName: string
    collegeinfourl: string
    schoolType: string
    link: string
    schoolGubun: string
    adres: string
    schoolName: string
    region: string
    totalCount: string
    estType: string
    seq: string
  }

  enum schoolCode {
    midd = '중학교',
    high = '고등학교',
    univ = '대학교',
  }

  const { school } = req.params

  if (!school) {
    return res.status(401).send('오류발생')
  }

  try {
    let schoolType
    if (school.includes(schoolCode['midd'])) {
      schoolType = 'midd'
    } else if (school.includes(schoolCode['high'])) {
      schoolType = 'high'
    } else if (school.includes(schoolCode['univ'])) {
      schoolType = 'univ'
    } else {
      return res.status(409).send('알맞지 않은 데이터 입니다.')
    }

    const response = await careerClient.get('/getOpenApi', {
      params: {
        apiKey: process.env.CAREER_API_KEY,
        svcType: 'api',
        svcCode: 'SCHOOL',
        contentType: 'json',
        gubun: `${schoolType}_list`,
        searchSchulNm: school
      }
    })

    const { content } = response.data.dataSearch

    const ret = content.map((data: schoolContent, index: number) => {
      return {
        schoolName: data.schoolName,
        adres: data.adres,
        region: data.region,
        id: index
      }
    })

    return res.send(ret)
  } catch (e) {
    console.error(e)
    return res.send('에러?')
  }
}

export const searchSummoner = async (req: express.Request, res: express.Response) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).max(24).required()
  })

  const result: any = schema.validate(req.params)
  if (result.error) {
    return res.status(400).send({
      name: 'WRONG_SCHMA',
      payload: result.error
    })
  }

  try {
    const { username } = req.params

    // search in DB
    const exists = await SummonProfile.findbySummonerName(username)
    if (exists) {
      return res.status(409).send('이미 존재하는 소환사 입니다.')
    }

    const encode = encodeURI(username)

    const byName = await searchByName(encode)
    const bySummoner = await searchBySummoner(byName.id)

    if (!bySummoner) return res.send(byName)

    const result = {
      ...byName, ...bySummoner
    }
    return res.send(result)
  } catch (e) {
    console.error(e)
    return res.send({})
  }
}

export const sendValidatemail = async (req: express.Request, res: express.Response) => {
  type RequestBody = {
    email: string
  }
  //TODO 이메일 형식 검증

  const { email }: RequestBody = req.body
  try {
    const user = await getRepository(User).findOne({
      email: email.toLowerCase()
    })
    if (user) {
      return res.status(400).send(!!user)
    }

    let emailValidate = await getRepository(EmailValidate).findOne({
      email: email.toLowerCase()
    })
    if (!emailValidate) {
      emailValidate = new EmailValidate()
      emailValidate.email = email.toLowerCase()
    }
    emailValidate.code = Math.random().toString().substr(2, 6)
    await getRepository(EmailValidate).save(emailValidate)
    const emailTemplate = createAuthEmail(!!user, emailValidate.code)
    try {
      await sendMail({ to: email, from: 'ryanhe4@gmail.com', ...emailTemplate })
    } catch (e) {
      console.log(e)
      throw e
    }
    return res.send(!!user)
  } catch (e) {
    console.error(e)
    res.status(401).send('에러')
  }
}

export const checkValidationCode = async (req: express.Request, res: express.Response) => {
  type RequestBody = {
    email: string
    code: string
  }
  const { email, code }: RequestBody = req.body
  try {
    let emailValidate = await getRepository(EmailValidate).findOne({
      email: email.toLowerCase()
    })

    if (!emailValidate) {
      return res.status(403).send('존재하지 않는 인증메일')
    }

    if (emailValidate?.code === code) {
      res.status(200).send(!!emailValidate)
      await getRepository(EmailValidate).delete({ id: emailValidate.id })
      return
    } else {
      return res.status(401).send(false)
    }

  } catch (e) {
    console.error(e)
    res.status(403).send('에러')
  }
}

export type summonerInfo = {
  id: string
  name: string
  profileIconId: number
  summonerLevel: number
  tier?: string
  rank?: string
  leaguePoints?: number
}
export type schoolInfo = {
  schoolName: string
  adres: string
  region: string
  point?: number
}

export type userType = {
  username: string,
  email: string,
}
export const register = async (req: express.Request, res: express.Response) => {

  type RegisterBody = {
    name: string
    email: string
    password: string
    school: schoolInfo
    summoner: summonerInfo
  }
  // JOI 라이브러리로 비밀번호, 이름, 검증
  const schema = Joi.object().keys({
    name: Joi.string().min(1).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    school: Joi.object()
      .keys({
        schoolName: Joi.string().required(),
        adres: Joi.string().required(),
        region: Joi.string().required()
      }).required(),
    summoner: Joi.object()
      .keys({
        id: Joi.string().required(),
        name: Joi.string().allow('').required(),
        profileIconId: Joi.number().required(),
        summonerLevel: Joi.number().required(),
        tier: Joi.string(),
        rank: Joi.string(),
        leaguePoints: Joi.number()
      }).required()
  })

  const result: any = schema.validate(req.body)
  if (result.error) {
    return res.status(400).send({
      name: 'WRONG_SCHMA',
      payload: result.error
    })
  }

  const { name, email, password, school, summoner }: RegisterBody = req.body
  try {
    // 1. 이메일로 가입한 아이디가 존재하는지 확인
    const exists = await User.findbyEmail(email)
    if (exists) {
      return res.status(409).send(false)
    }

    // 2. 소환사 명으로 가입한 아이디가 존재하는지 확인
    const existSummoner = await SummonProfile.findbySummonerName(summoner.name)
    if (existSummoner) {
      return res.status(409).send('이미 존재하는 소환사')
    }

    // 3. 이미 해당 학교가 존재하는지 확인
    school.schoolName = school.schoolName.trim()
    const existSchool = await UserSchool.findBySchoolName(school.schoolName)
    let newSchool: UserSchool | undefined

    if (!existSchool) {
      //학교가 존재안할경우 exsitSchool을 사용
      newSchool = await UserSchool.createInstance({ ...school, point: 0 })
    }

    enum tierPoint {
      CHALLENGER = 500,
      GRANDMASTER = 350,
      MASTER = 250,
      DIAMOND = 150,
      PLATINUM = 100,
      GOLD = 70,
      SILVER = 50,
      BRONZE = 30,
      IRON = -100,
      BASE = 0
    }

    let tp
    if (summoner.tier) {
      //티어에 따라 점수 적용해서 school에 반영
      const getTierScore = (tier: string): number => {
        switch (tier) {
          case 'CHALLENGER':
            return tierPoint.CHALLENGER
          case 'GRANDMASTER':
            return tierPoint.GRANDMASTER
          case 'MASTER':
            return tierPoint.MASTER
          case 'DIAMOND':
            return tierPoint.DIAMOND
          case 'PLATINUM':
            return tierPoint.PLATINUM
          case 'GOLD':
            return tierPoint.GOLD
          case 'SILVER':
            return tierPoint.SILVER
          case 'BRONZE':
            return tierPoint.BRONZE
          case 'IRON':
            return tierPoint.IRON
          default:
            return tierPoint.BASE
        }
      }

      tp = getTierScore(summoner.tier)
      if (existSchool) {
        existSchool.point = existSchool.point + tp
        await getRepository(UserSchool).save(existSchool)
      } else {
        newSchool!.point = tp
      }
    }

    const user = User.createInstance({ email: email.toLowerCase(), username: name })
    const summon_profile = SummonProfile.createInstance(summoner)
    await getRepository(SummonProfile).save(summon_profile)

    user.school_info = existSchool ? existSchool : newSchool
    user.summon_profile = summon_profile
    await user.setPassword(password)

    await getRepository(User).save(user)
    summon_profile.user = user
    await getRepository(SummonProfile).save(summon_profile)

    const token = user.generateToken()
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    })

    return res.status(201).send(!!user)
  } catch (e) {
    console.error(e)
    res.status(400).send('!!user')
  }
}
export const login = async (req: express.Request, res: express.Response) => {
  type reqBody = {
    email: string,
    password: string
  }

  const { email, password }: reqBody = req.body
  if (!email || !password) {
    return res.status(401).send(false)
  }
  try {
    const user = await User.findbyEmail(email)
    if (!user) {
      return res.status(401).send('존재하지 않는 계정 입니다.')
    }
    const valid = await user.checkPassword(password)
    if (!valid) {
      return res.status(401).send('잘못된 비밀번호')
    }

    const token = user.generateToken()
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    })
    return res.status(200).send(user.serialize())
  } catch (e) {
    console.error(e)
    return res.send(e)
  }
}

export const checkLogin = async (req: express.Request, res: express.Response) => {
  if (!req.user) return res.status(200).send(false)
  return res.status(201).send(req.user)
}

export const logout = async (req: express.Request, res: express.Response) => {
  res.clearCookie('access_token', {
    httpOnly: true
  })
  return res.status(201).send(!!req.user)
}


export const dbTest = async (req: express.Request, res: express.Response) => {
  try {
    //search use Builder?
    res.send({ data: '로그인 상태입니다.' })
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
}
