import express from 'express'
import { getRepository } from 'typeorm'
import { UserSchool } from '../../../entity/UserSchool'

export const schoolList = async (req: express.Request, res: express.Response) => {
  try {
    //학교정보..
    const school = await getRepository(UserSchool).find()
    return res.send(school)
  } catch (e) {
    console.error(e)
    return res.status(500).send('오류발생')
  }
}
