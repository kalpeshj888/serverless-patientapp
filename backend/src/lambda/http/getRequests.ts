import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import { createLogger } from '../../utils/logger'
const logger = createLogger('GetRequests')

const docClient = new AWS.DynamoDB.DocumentClient()

const patientsTable = process.env.PATIENTS_TABLE
const requestsTable = process.env.REQUESTS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('Caller Event',event)
  const patientId = event.pathParameters.patientId
  const validPatientId = await patientExists(patientId)

  if (!validPatientId) {

    logger.error('Patient Does not  Exists',patientId)

    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Patient does not exist'
      })
    }
  }

  const requests = await getRequestsPerPatient(patientId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: requests
    })
  }
}

async function patientExists(patientId: string) {
  const result = await docClient
    .get({
      TableName: patientsTable,
      Key: {
        patientId: patientId
      }
    })
    .promise()

  logger.info('Get patient',result)
  return !!result.Item
}

async function getRequestsPerPatient(patientId: string) {
  const result = await docClient.query({
    TableName: requestsTable,
    KeyConditionExpression: 'patientId = :patientId',
    ExpressionAttributeValues: {
      ':patientId': patientId
    },
    ScanIndexForward: false
  }).promise()

  return result.Items
}
