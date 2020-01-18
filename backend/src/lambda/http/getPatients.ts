import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getAllPatients } from '../../businessLogic/patients'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getPatientRequest')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    logger.info('Processsing Event', event)
    const patients = await getAllPatients()

    return {
        statusCode : 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body : JSON.stringify({
          items:patients
        })
      }
}
