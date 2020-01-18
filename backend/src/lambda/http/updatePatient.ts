import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { UpdatePatientRequest } from '../../requests/UpdatePatientRequest'
import { updatePatient } from '../../businessLogic/patients'
import { createLogger } from '../../utils/logger'
const logger = createLogger('createPatient')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  logger.info('Processing event: ', event)
  const patientId = event.pathParameters.patientId
  const patientUpdates: UpdatePatientRequest = JSON.parse(event.body)

  const updateItem = await updatePatient(patientId,patientUpdates)
  logger.info('update patient: ', updateItem)

  return {
    
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
        updateItem
    })
  }
}
