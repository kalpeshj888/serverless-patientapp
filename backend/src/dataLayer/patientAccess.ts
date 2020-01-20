import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Patient } from '../models/Patient'
import { createLogger } from '../utils/logger'
import { UpdatePatientRequest } from '../requests/UpdatePatientRequest'

const logger = createLogger('patient')


export class PatientAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly patientsTable = process.env.PATIENTS_TABLE){
      
    }

  async getAllPatients(): Promise<Patient[]> {

    logger.info('Getting all patients')

    const result = await this.docClient.scan({
      TableName: this.patientsTable
    }).promise()

    const items = result.Items
    return items as Patient[]
  }

async updatePatient(patientId: string,updatePatientRequest:UpdatePatientRequest ): Promise<String>{
    logger.info('Updating Patient',patientId)

   const  result = await this.docClient.update({
        TableName: this.patientsTable,
        Key: {
            patientId : patientId
            },
        UpdateExpression: 'set firstName= :firstName,  lastName= :lastName ,cellPhone= :cellPhone',
        ExpressionAttributeValues:{
        
            ':firstName' :updatePatientRequest.firstName,
            ':lastName' :updatePatientRequest.lastName,
            ':cellPhone' :updatePatientRequest.cellPhone,
          
        },
        ReturnValues:"ALL_OLD"
      }).promise()

    const updateInfo =result.Attributes
    return JSON.stringify({
        updateInfo
      })
}


async deletePatient(patientId: string): Promise<String>{
    logger.info('Deleting Patient',patientId)

   const  result = await this.docClient.delete({
        TableName: this.patientsTable,
        Key: {
            patientId : patientId,
            },
            ReturnValues:"ALL_OLD"
      }).promise()

    const deleteInfo =result.Attributes
    return JSON.stringify({
        deleteInfo
      })
}

  async createPatient(patient: Patient): Promise<Patient> {
    logger.info('Creating Patient',patient)

    await this.docClient.put({
      TableName: this.patientsTable,
      Item: patient
    }).promise()

    return patient
  }
}

function createDynamoDBClient() {

  return new AWS.DynamoDB.DocumentClient()
}
