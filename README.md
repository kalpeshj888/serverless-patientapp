# serverless-patientapp
<<<<<<< HEAD

serverless-patientapp is a application built using serverless concepts learnt in Udacity Cloud Engineering Nanodegree program.

The application provides a backend CRUD API for Patients.

It also provides ability for Patients to create Requests.
Request can be created when patients want to communicate with Care Providers.
Patient can create a new request when they have a scheduling request, quest about some of the symptoms they are having or want to communicate about documents from other care providers.
Basically, Request allows Patients to communicate with Care Providers.

Patients can also securely load documents when they create a new request.
The application also sends out notifications when new documents are uploaded.

# Attribute Information

Each Patient item include following fields:
* patientId - Unique Id for a patient. Also, patient email used for frontend login.
* cellPhone - patient cell phone
* firstName - first name of the patient
* lastName - last name of the patient

Example - payload fo create patient

{
   "cellPhone": "5209037847 ",
   "patientId": "mansi1.man@gmail.com",
   "firstName": "Mansi",
   "lastName": "Man"
}

Each Request item include following fields:

patientId - Id of patient making the request
timestamp  - timestamp of when request was made
requestId - request Id for the request
requestDescription - description of the request
requestFileURL - file URL of document associated with the request


Example - payload fo create request:

{
    "requestDescription": "Please review my latest X Ray from 1/20",
     "careProviderEmail": "jainkalpesh@gmail.com"
}


Example response when creating request:


{
        "patientId": "mansi1.man@gmail.com",
        "timestamp": "2020-01-21T01:05:31.659Z",
        "requestId": "b4e35469-14aa-4cb7-ba84-18766f1c1de8",
        "requestDescription": "Please review my latest X Ray from 1/20",
        "careProviderEmail": "jainkalpesh@gmail.com",
        "requestFileURL": "https://patientapp-kalpeshj777-requestfile-dev.s3.amazonaws.com/b4e35469-14aa-4cb7-ba84-18766f1c1de8"
    
 }
 
#  Function Information

* createPatient - Crete a new patient record
* getPatients - get all patients record
* updatePatient - update a patient record
* deletePatient - delete a patient record
* createRequest - create a new request. The function also returns a presignedUrl that can be used to upload documents to S3 bucket.
S3 bucket also publishes all upload all events to SNS topic which is configured in serverless.yml file
* getRequests - gets all requests for a patient
* sendNotification - gets events from SNS topic when new documents are uploaded.
It queries request table based on the key received from the event to retrieve caregiver email and logs an email that can be sent to the email address.
* Auth - Custom auth is implemented for all lambda functions.
if authToken variable is 123, request will be authorized, else it will be denied.

Postman Collection file attached.
 

# Best Practices implemented
* Deployment is fully automated using serverless framework
* Business logic and database access is separated for Patient API ( Hexagonal Design)
* Sufficient logs and metrics generated using Cloud Watch
* Dynamo DB tables with  Composite key and GlobalSecondaryIndexes implemented
* S3 bucket is not public as it can have sensitive information
* Custom Auth function implemented for lambda functions
* Minimum privileges provided for lamda functions
* Canary Deployment enabled
* Tracing enabled
* Presigned URL for uploading documents implemented


# Following AWS Services used:
* Lambda
* API Gateway
* DynamoDB
* Cloud Watch
* S3
* SNS
* Code Deploy
* Cloud Formation



||||||| merged common ancestors
=======

serverless-patientapp is a application built using serverless concepts learnt in Udacity Cloud Engineering Nanodegree program.

The application provides a backend CRUD API for Patients.

It also provides ability for Patients to create Requests.
Request can be created when patients want to communicate with Care Providers.
Patient can create a new request when they have a scheduling request, quest about some of the symptoms they are having or want to communicate about documents from other care providers.
Basically, Request allows Patients to communicate with Care Providers.

Patients can also securely load documents when they create a new request.
The application also sends out notifications when new documents are uploaded.

# Attribute Information

Each Patient item include following fields:
* patientId - Unique Id for a patient. Also, patient email used for frontend login.
* cellPhone - patient cell phone
* firstName - first name of the patient
* lastName - last name of the patient

Example - payload fo create patient

{
   "cellPhone": "5209037847 ",
   "patientId": "mansi1.man@gmail.com",
   "firstName": "Mansi",
   "lastName": "Man"
}

Each Request item include following fields:

patientId - Id of patient making the request
timestamp  - timestamp of when request was made
requestId - request Id for the request
requestDescription - description of the request
requestFileURL - file URL of document associated with the request


Example - payload fo create request:

{
    "requestDescription": "Please review my latest X Ray from 1/20",
     "careProviderEmail": "jainkalpesh@gmail.com"
}


Example response when creating request:


{
        "patientId": "mansi1.man@gmail.com",
        "timestamp": "2020-01-21T01:05:31.659Z",
        "requestId": "b4e35469-14aa-4cb7-ba84-18766f1c1de8",
        "requestDescription": "Please review my latest X Ray from 1/20",
        "careProviderEmail": "jainkalpesh@gmail.com",
        "requestFileURL": "https://patientapp-kalpeshj777-requestfile-dev.s3.amazonaws.com/b4e35469-14aa-4cb7-ba84-18766f1c1de8"
    
 }
 
#  Function Information

* createPatient - Crete a new patient record
* getPatients - get all patients record
* updatePatient - update a patient record
* deletePatient - delete a patient record
* createRequest - create a new request. The function also returns a presignedUrl that can be used to upload documents to S3 bucket.
S3 bucket also publishes all upload all events to SNS topic which is configured in serverless.yml file
* getRequests - gets all requests for a patient
* sendNotification - gets events from SNS topic when new documents are uploaded.
It queries request table based on the key received from the event to retrieve caregiver email and logs an email that can be sent to the email address.
* Auth - Custom auth is implemented for all lambda functions.
if authToken variable is 123, request will be authorized, else it will be denied.

Postman Collection file attached.
 

# Best Practices implemented
* Deployment is fully automated using serverless framework
* Business logic and database access is separated for Patient API ( Hexagonal Design)
* Sufficient logs and metrics generated using Cloud Watch
* Dynamo DB tables with  Composite key and GlobalSecondaryIndexes implemented
* S3 bucket is not public as it can have sensitive information
* Custom Auth function implemented for lambda functions
* Minimum privileges provided for lamda functions
* Canary Deployment enabled
* Tracing enabled
* Presigned URL for uploading documents implemented


# Following AWS Services used:
* Lambda
* API Gateway
* DynamoDB
* Cloud Watch
* S3
* SNS
* Code Deploy
* Cloud Formation





>>>>>>> 37fdca9272465e0cc506a7ede94b3084799e3667
