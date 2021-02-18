import express from 'express'
import careerClient from '../../../lib/api/careerclient'
import { searchByName, searchBySummoner } from '../../../lib/api/riot/riotAPIs'

const authRoute = express.Router()

authRoute.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('auth')
  }
)

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

authRoute.get('/search/summoner/:username', async (req: express.Request, res: express.Response) => {
  try {
    const { username } = req.params
    if (!username) {
      return res.status(401).send('오류발생')
    }

    const encode = encodeURI(username)

    //TODO 간단한 입력검증
    const byName = await searchByName(encode)
    const bySummoner = await searchBySummoner(byName.id)

    if(!bySummoner) return res.send(byName)

    const result = {
      ...byName, ...bySummoner
    }
    return res.send(result)
  } catch (e) {
    console.error(e)
    return res.send({})
  }
})

authRoute.get('/search/school/:school', async (req: express.Request, res: express.Response) => {
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

})

export default authRoute
