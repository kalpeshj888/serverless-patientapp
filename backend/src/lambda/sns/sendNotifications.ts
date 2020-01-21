import 'source-map-support/register'
import { SNSHandler, SNSEvent, S3Event } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
//import * as nodemailer  from 'nodemailer'
const docClient = new AWS.DynamoDB.DocumentClient()

const requestsTable = process.env.REQUESTS_TABLE
const requestIdIndex = process.env.REQUEST_ID_INDEX


//var ses = new AWS.SES();

export const handler: SNSHandler = async (event: SNSEvent) => {
    console.log('Processing SNS event ', JSON.stringify(event))
    for (const snsRecord of event.Records) {
      const s3EventStr = snsRecord.Sns.Message
      console.log(' Processing S3 event', s3EventStr)
      const s3Event = JSON.parse(s3EventStr)
      await processS3Event(s3Event)
    }
  }

  async function processS3Event(s3Event: S3Event) {
    for (const record of s3Event.Records) {
      const key = record.s3.object.key
      console.log('Processing S3 item with RequestId: ', key)
    

    //Query Table to get request ID 
    console.log('Querying Request table ')
    const result = await docClient.query({
        TableName : requestsTable,
        IndexName : requestIdIndex,
        KeyConditionExpression: 'requestId = :requestId',
        ExpressionAttributeValues: {
            ':requestId': key
        },
        ProjectionExpression: 'careProviderEmail'
    }).promise()

    console.log('careProviderEmail record from DynamoDB  ', result.Items[0])
    const  careProviderEmail = result.Items[0].careProviderEmail
    console.log('careProviderEmail email ',careProviderEmail)

    //Sending Email using SES

    var mailOptions = {
        from: "serverless-patient-app@kj.com",
        subject: "This is an email sent from a Lambda functionwhen new request document was added!",
        html: `<p>his is an email sent from a Lambda functionwhen new request document was added</p>`,
        to: careProviderEmail,
    };

    console.log(" Mail  Options", mailOptions );
    //SES is not supported in US-EAST-2. The code for sending email is commented. Goal of S3 events coming to SNS and SNS triggering lambda is accomplised
    /*
    // create Nodemailer SES transporter
    var transporter = nodemailer.createTransport({
        SES: ses
    });

    
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            console.log('Error sending email');
            
        } 
        
        if (info) {
            console.log('Email sent successfully');
        }
    });*/

    }
  }
  