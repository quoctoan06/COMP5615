import json
import pytest
from unittest import mock
from lambda_handler import saveAssetInputData

# Mocked event and context objects
event = {
    'body': json.dumps({
        'dataPairs': [
            {
                'institution': {
                    'PK': '1',
                    'InstitutionName': 'Test Institution',
                    'Contact': {
                        'Email': 'test@example.com'
                    },
                    'Identity': {
                        'Abn': '1234567890'
                    }
                },
                'accountType': 'Savings Account',
                'inputValues': {
                    'Estimated Value': 1000,
                    'Account Number': '123456789'
                }
            }
        ]
    })
}

context = None

@mock.patch('boto3.client')
@mock.patch('boto3.resource')
def test_saveAssetInputData(mock_dynamodb_resource, mock_ses_client):
    # Mock DynamoDB resource and client
    mock_dynamodb = mock.Mock()
    mock_dynamodb_resource.return_value = mock_dynamodb

    # Mock SES client
    mock_ses = mock.Mock()
    mock_ses_client.return_value = mock_ses

    # Mock DynamoDB Table
    mock_table = mock.Mock()
    mock_dynamodb.Table.return_value = mock_table

    # Mock SES send_email response
    mock_ses.send_email.return_value = {'MessageId': '1234567890'}

    # Invoke the Lambda function
    result = saveAssetInputData(event, context)

    # Assert that the function returns a 200 status code
    assert result['statusCode'] == 200

    # Assert that DynamoDB put_item was called with the expected arguments
    mock_table.put_item.assert_called_once_with(Item=mock.ANY)

    # Assert that SES send_email was called with the expected arguments
    mock_ses.send_email.assert_called_once_with(
        Source=mock.ANY,
        Destination={'ToAddresses': ['test@example.com']},
        Message={
            'Subject': {'Data': mock.ANY},
            'Body': {'Text': {'Data': mock.ANY}}
        }
    )

    # Additional assertions can be added as needed based on your specific requirements
