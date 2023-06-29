const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/api/routes/*.js',"./src/api/routes/*.ts","./src/api/controllers/*.ts"]

swaggerAutogen(outputFile, endpointsFiles)