import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { CreatePatientRequest } from '../../requests/CreatePatientRequest'
import { createPatient } from '../../businessLogic/patients'
import { createLogger } from '../../utils/logger'
const logger = createLogger('createPatient')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  logger.info('Processing event: ', event)
  const newPatient: CreatePatientRequest = JSON.parse(event.body)

  const newItem = await createPatient(newPatient)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newItem
    })
  }
}
