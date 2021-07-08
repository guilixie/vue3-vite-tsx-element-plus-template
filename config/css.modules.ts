import crypto from 'crypto'

const createClassHash = (content: string, hashDigestLength: number = 8, hashFunction: string = 'md5') => {
  const hash = crypto.createHash(hashFunction).update(content).digest('base64').replace(/=$/, '').replace(/\+/g, '-').replace(/\//, '_')
  return hash.substr(0, hashDigestLength)
}

export default {
  scopeBehaviour: 'local',
  localsConvention: 'camelCaseOnly',
  generateScopedName: function (name, filename, css) {
    const hash = createClassHash(css) // 生成指定长度的hash值
    const isAppClass = name.startsWith('app-') // 为了不作用于element-plus的相关类，只有"app-"开头的加hash表示这个css需要模块化，限制作用域在这个模块
    return isAppClass ? `${name}__${hash}` : name
  }
}