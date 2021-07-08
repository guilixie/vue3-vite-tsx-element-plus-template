import minimist from 'minimist'

const envConfig = {
  development: {
    apiOrigin: 'http://10.12.102.132:8080',
    apiPrefix: '/api/v1'
  },
  production: {
    apiOrigin: 'http://10.12.102.132:8080',
    apiPrefix: '/api/v1'
  }
}

interface EnvConfig {
  apiOrigin: string,
  apiPrefix: string
}

export function getEnvConfig(argv): EnvConfig {
  const mode = minimist(argv).mode || 'production'
  return envConfig[mode]
}

const config = getEnvConfig(process.argv.slice(2))
console.log(config)

export default config