import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import userRouter from './app/modules/user/user.router'
import createUser from '../src/app/modules/user/user.service'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRouter)

app.get('/', async (req: Request, res: Response) => {
  await createUser.createUser({
    id: '999',
    password: '1234',
    role: 'student',
  })

  res.send('Hello World!')
})

export default app
