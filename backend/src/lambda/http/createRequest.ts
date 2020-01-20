import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateRequestRequest } from '../../requests/CreateRequestRequest'
import * as uuid from 'uuid'
import * as AWS  from 'aws-sdk'
import { createLogger } from '../../utils/logger'
const logger = createLogger('CreateRequest')
const docClient = new AWS.DynamoDB.DocumentClient()
const requestTable = process.env.REQUESTS_TABLE
const bucketName = process.env.REQUESTFILE_S3_BUCKET
const urlExpiration = 300
const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('Processing event: ', event)
  const patientId = event.pathParameters.patientId
  const requestId = uuid.v4()
  const timestamp =  new Date().toISOString()  
  const newRequest: CreateRequestRequest = JSON.parse(event.body)

  const url = getUploadUrl(requestId)
  
  const item = {
    patientId: patientId, 
    timestamp: timestamp,
    requestId: requestId,
    requestDescription: newRequest.requestDescription,
    careProviderEmail: newRequest.careProviderEmail,
    requestFileURL: `https://${bucketName}.s3.amazonaws.com/${requestId}`
  }

  await docClient.put({
    TableName: requestTable,
    Item: item
  }).promise()
  
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item,
      uploadURL: url
    })
  }
}

function getUploadUrl (requestId : string){
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: requestId,
        Expires: urlExpiration
    })
}