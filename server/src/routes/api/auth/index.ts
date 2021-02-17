import express from 'express'
import careerClient from '../../../lib/api/client'

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

    const ret = content.map((data: schoolContent) => {
      return {
        schoolName: data.schoolName,
        adres: data.adres,
        region: data.region
      }
    })

    return res.send(ret)
  } catch (e) {
    console.error(e)
    return res.send('에러?')
  }

})

export default authRoute
