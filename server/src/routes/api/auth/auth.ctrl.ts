import express from 'express'
import careerClient from '../../../lib/api/careerclient'
import { searchByName, searchBySummoner } from '../../../lib/api/riot/riotAPIs'
import { getRepository } from 'typeorm'
import { User } from '../../../entity/User'
import { EmailValidate } from '../../../entity/EmailValidate'
import { createAuthEmail } from '../../../lib/etc/emailTemplates'
import sendMail from '../../../lib/etc/sendMail'

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

export const searchSchools = async (req: express.Request, res: express.Response) => {
  try {
    const { school } = req.params

    if (!school) {
      return res.status(401).send('오류발생')
    }
    let schoolType
    if (school.includes('중학교')) {
      schoolType = 'midd'
    } else if (school.includes('고등학교')) {
      schoolType = 'high'
    } else if (school.includes('대학교')) {
      schoolType = 'univ'
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
  try {
    const { username } = req.params
    if (!username) {
      return res.status(401).send('오류발생')
    }
    console.log(username)
    const encode = encodeURI(username)

    //TODO 간단한 입력검증
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
    if(user) {
      return res.status(401).send(!!user)
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
