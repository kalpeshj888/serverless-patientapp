import { Patient } from '../models/Patient'
import { PatientAccess } from '../dataLayer/patientAccess'
import { UpdatePatientRequest } from '../requests/UpdatePatientRequest'
import { CreatePatientRequest } from '../requests/CreatePatientRequest'


const patientAccess = new PatientAccess()

export async function getAllPatients(): Promise<Patient[]> {
  return patientAccess.getAllPatients()
}

export async function createPatient(
  createPatientRequest: CreatePatientRequest
): Promise<Patient> {

  return await patientAccess.createPatient({
   patientId:createPatientRequest.patientId,
   firstName: createPatientRequest.firstName,
   lastName: createPatientRequest.lastName,
   cellPhone: createPatientRequest.cellPhone
  })
}

export async function updatePatient(patientId: string,  updatePatientRequest : UpdatePatientRequest ): Promise<String> {
    return await patientAccess.updatePatient(patientId,updatePatientRequest)
  }



export async function deletePatient(patientId: string): Promise<String> {
    return await patientAccess.deletePatient(patientId)
  }
