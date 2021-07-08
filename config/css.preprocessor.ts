import path from 'path'
import fs from 'fs'

export default {
  scss: {
    additionalData: fs.readFileSync(path.resolve(__dirname, '../src/styles/variable.scss'))
  }
}
