import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deletePatient } from '../../businessLogic/patients'
import { createLogger } from '../../utils/logger'
const logger = createLogger('deletePatient')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const patientId = event.pathParameters.patientId
    logger.info('Processing event: ', event)


    const deleteInfo = await deletePatient(patientId)


    if (deleteInfo!=null )
    logger.info('Delete Info: ', deleteInfo)

        return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            deleteInfo
        })
      
    }

  }
