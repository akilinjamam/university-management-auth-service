import mongoose from 'mongoose'
import config from './config/index'
import app from './app'

const connector = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database is connected successfully')

    app.listen(config.port, () => {
      console.log(`Application app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`failed to load data ${error}`)
  }
}

connector()
