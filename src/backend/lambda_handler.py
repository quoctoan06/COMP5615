import json
import uuid
import boto3
from datetime import datetime
from botocore.exceptions import ClientError, NoCredentialsError
from boto3.dynamodb.conditions import Attr


s3 = boto3.client('s3',
                aws_access_key_id="S3RVER",
                aws_secret_access_key="S3RVER",
                region_name="ap-southeast-2",
                endpoint_url="http://localhost:4569")

dynamodb = boto3.resource('dynamodb',
                        aws_access_key_id="randomstring",
                        aws_secret_access_key="randomstring",
                        region_name="ap-southeast-2",
                        endpoint_url="http://localhost:8000")

ses = boto3.client('ses',
                aws_access_key_id="randomstring",
                aws_secret_access_key="randomstring",
                region_name="ap-southeast-2",
                endpoint_url="http://localhost:8005")


def getCommonInstitutions(event, context):
    try:
        table = dynamodb.Table('Institution')

        response = table.scan(
            FilterExpression = Attr('Functionality.CommonInstitution').eq(True)
        )
        
        institutions = response['Items']
        
        return {
            'statusCode': 200,
            'body': json.dumps(institutions)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error retrieving institutions'})
        }

def searchInstitutions(event, context):
    try:
        table = dynamodb.Table('Institution')
        search_query = event["queryStringParameters"]['search_query']
        search_query = search_query.lower()

        response = table.scan(
            FilterExpression = "contains(#display.#searchName, :search_query)",
            ExpressionAttributeNames = {
                "#display": "Display",
                "#searchName": "InstitutionSearchName"
            },
            ExpressionAttributeValues = {
                ":search_query": search_query
            }
        )

        institutions = response['Items']

        return {
            'statusCode': 200,
            'body': json.dumps(institutions)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error searching institutions'})
        }

def getFieldsOfAssetClass(event, context):
    try:
        table = dynamodb.Table('AssetClass')
        account_type = event["queryStringParameters"]['account_type']

        response = table.scan(
            FilterExpression = Attr('Type').eq(account_type)
        )

        asset_class = response['Items']

        return {
            'statusCode': 200,
            'body': json.dumps(asset_class)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error retrieving asset class'})
        }

def getAssetClassList(event, context):
    try:
        table = dynamodb.Table('AssetClass')
        response = table.scan()
        asset_class = response['Items']

        return {
            'statusCode': 200,
            'body': json.dumps(asset_class)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error retrieving asset class'})
        }

def createNewInstitution(event, context):
    try:
        table = dynamodb.Table('Institution')

        # Parse the incoming JSON data
        request_body = json.loads(event['body'])
        formData = request_body.get('formData')
        s3ObjectUrl = request_body.get('s3ObjectUrl')

        # Extract data from the request
        institution_name = formData.get('InstitutionName')
        institution_abn = formData.get('Abn')
        contact_email = formData.get('Email')
        institution_website = formData.get('Website')
        institution_logo = s3ObjectUrl
        supported_asset_classes = formData.get('SupportedAssetClasses', [])
        
        # Generate a unique identifier for the new institution
        institution_pk = str(uuid.uuid4())
        
        # Prepare the item to be stored in DynamoDB
        item = {
            "PK": institution_pk,
            "SK": " ",
            "Contact": {
                "Email": contact_email,
                "Website": institution_website
            },
            "Display": {
                "InstitutionSearchName": institution_name.lower(),
                "logo": institution_logo
            },
            "InstitutionName": institution_name,
            "Identity": {
                "Abn": institution_abn
            },
            "Functionality": {
                "SupportedAssetClasses": supported_asset_classes,
                "CommonInstitution": False
            }
        }
        
        # Save the new institution data in DynamoDB
        table.put_item(Item=item)
        
        # Return a success response
        response = {
            'statusCode': 200,
            'body': json.dumps({'message': 'Institution saved successfully'})
        }
        return response
    
    except Exception as e:
        # Handle any errors and return an error response
        print(f"Error: {e}")
        response = {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal Server Error'})
        }
        return response

def generatePresignedUrl(event, context):
    data = json.loads(event['body'])
    object_name = data.get('filename')
    bucket_name = 'local-bucket'
    expiration = 3600   # 1 hour

    try:
        # Generate the presigned URL
        presigned_url = s3.generate_presigned_url('put_object',
                                                Params={'Bucket': bucket_name,
                                                        'Key': object_name},
                                                ExpiresIn=expiration)

        if presigned_url:
            return {
                'statusCode': 200,
                'body': json.dumps({'presignedUrl': presigned_url})
            }
        else:
            return {
                'statusCode': 500,
                'body': json.dumps('Error generating presigned URL')
            }
    except NoCredentialsError:
        return None

def saveAssetInputData(event, context):
    try:
        table = dynamodb.Table('Asset')
        data = json.loads(event['body'])
        data_pairs = data.get('dataPairs', [])
        s3ObjectUrl = data.get('s3ObjectUrl')
        
        # Save dataPairs to DynamoDB
        for data_pair in data_pairs:
            asset_pk = str(uuid.uuid4())  # Generate a unique ID for PK
            current_date_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            CustomFields = []

            # Prepare custom fields
            institution_field_map = {
                "FieldName": "Owning Institution",
                "FieldType": "S",
                "FieldValue": data_pair['institution']['PK']
            }
            document_url_field_map = {
                "FieldName": "Document URL",
                "FieldType": "S",
                "FieldValue": s3ObjectUrl
            }
            CustomFields.append(institution_field_map)
            CustomFields.append(document_url_field_map)

            for key, value in data_pair['inputValues'].items():
                if key != 'Estimated Value':
                    field_map = {
                        "FieldName": key,
                        "FieldType": "S",
                        "FieldValue": value
                    }
                    CustomFields.append(field_map)

            # Prepare the item to be saved in DynamoDB
            item = {
                "PK": asset_pk,
                "SK": " ",
                "Type": data_pair['accountType'],
                "Value": data_pair['inputValues']['Estimated Value'],
                "Team": " ",
                "MatterId": " ",
                "CreationDate": current_date_time,
                "Owner": {},
                "CustomFields": CustomFields
            }

            try:
                # Put the item into DynamoDB table
                response = table.put_item(Item=item)
                print("PutItem succeeded:", response)
            except ClientError as e:
                print("Error putting item:", e)


        # Send data to institutions' emails using SES
        source_email = 'sender@example.com'

        for data_pair in data_pairs:
            institution_email = data_pair['institution']['Contact']['Email']

            # Constructing email subject
            subject = f"Notification: Asset Collection for {data_pair['institution']['InstitutionName']} Account"

            # Iterate through inputValues and construct Account Information dynamically
            account_info = "\nAccount Information:\n"
            for key, value in data_pair['inputValues'].items():
                account_info += f" - {key}: {value}\n"

            # Constructing email message
            message = f"Dear {data_pair['institution']['InstitutionName']} Team,\n\n" \
                    f"We are writing to inform you about the passing of our relative. As part of the process, " \
                    f"we need to collect the assets currently held in the {data_pair['accountType']} with your institution.\n\n" \
                    f"Institution Details:\n" \
                    f" - Name: {data_pair['institution']['InstitutionName']}\n" \
                    f" - ABN: {data_pair['institution']['Identity']['Abn']}\n" \
                    f"{account_info}" \
                    f"\nWe kindly request your assistance in facilitating the transfer of these assets. " \
                    f"Please let us know the necessary steps and documentation required from our end.\n\n" \
                    f"Thank you for your cooperation."
            
            try:
                response = ses.send_email(
                    Source=source_email,
                    Destination={'ToAddresses': [institution_email]},
                    Message={
                        'Subject': {'Data': subject},
                        'Body': {'Text': {'Data': message}}
                    }
                )
            except ClientError as e:
                print(f"Error sending email: {e.response['Error']['Message']}")

        return {
            'statusCode': 200,
            'body': json.dumps('Data saved and emails sent successfully.')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error: {str(e)}')
        }
