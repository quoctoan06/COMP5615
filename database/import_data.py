import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb',
                        aws_access_key_id="randomstring",
                        aws_secret_access_key="randomstring",
                        region_name="ap-southeast-2",
                        endpoint_url="http://localhost:8000")

# Insert dummy data into Institution table
table = dynamodb.Table('Institution')


response = table.put_item(
    Item={
        "PK": "1",
        "SK": " ",
        "Contact": {
            "Email": "qdan7703@uni.sydney.edu.au",
            "Website": "https://www.commbank.com.au/"
        },
        "Display": {
            "InstitutionSearchName": "commonwealth bank of australia",
            "logo": "https://1000logos.net/wp-content/uploads/2020/10/Commonwealth-Bank-Logo-1024x640.png"
        },
        "InstitutionName": "Commonwealth Bank of Australia",
        "Identity": {
            "Abn": "48123123124"
        },
        "Functionality": {
            "SupportedAssetClasses": ["Transaction Account", "Savings Account", "Term Deposit", "Securities"],
            "CommonInstitution": True
        }
    }
)

status_code = response['ResponseMetadata']['HTTPStatusCode']
print(status_code)


response = table.put_item(
    Item={
        "PK": "2",
        "SK": " ",
        "Contact": {
            "Email": "qdan7703@uni.sydney.edu.au",
            "Website": "https://www.westpac.com.au/"
        },
        "Display": {
            "InstitutionSearchName": "westpac banking corporation",
            "logo": "https://1000logos.net/wp-content/uploads/2019/10/Westpac-Logo-768x432.png"
        },
        "InstitutionName": "Westpac Banking Corporation",
        "Identity": {
            "Abn": "33007457141"
        },
        "Functionality": {
            "SupportedAssetClasses": ["Transaction Account", "Savings Account", "Term Deposit", "Securities"],
            "CommonInstitution": True      
        }
    }
)

status_code = response['ResponseMetadata']['HTTPStatusCode']
print(status_code)


response = table.put_item(
    Item={
        "PK": "3",
        "SK": " ",
        "Contact": {
            "Email": "qdan7703@uni.sydney.edu.au",
            "Website": "https://www.nab.com.au/"
        },
        "Display": {
            "InstitutionSearchName": "national australia bank",
            "logo": "https://1000logos.net/wp-content/uploads/2021/06/NAB-National-Australia-Bank-logo-768x432.png"
        },
        "InstitutionName": "National Australia Bank",
        "Identity": {
            "Abn": "12004044937"
        },
        "Functionality": {
            "SupportedAssetClasses": ["Transaction Account", "Savings Account", "Term Deposit", "Securities"],
            "CommonInstitution": False       
        }
    }
)


status_code = response['ResponseMetadata']['HTTPStatusCode']
print(status_code)



# Insert dummy data into AssetClass table
table = dynamodb.Table('AssetClass')


response = table.put_item(
    Item={
        "PK": "1",
        "SK": " ",
        "Type": "Transaction Account",
        "RequiredFields": [
            {
                "FieldName": "BSB",
                "FieldType": "S"
            },
            {
                "FieldName": "Account Number",
                "FieldType": "S"
            },
            {
                "FieldName": "Estimated Value",
                "FieldType": "S"
            }
        ],
        "OptionalFields": [
            {
                "FieldName": "Account Name",
                "FieldType": "S"
            }
        ]
    }
)

status_code = response['ResponseMetadata']['HTTPStatusCode']
print(status_code)


response = table.put_item(
    Item={
        "PK": "2",
        "SK": " ",
        "Type": "Savings Account",
        "RequiredFields": [
            {
                "FieldName": "BSB",
                "FieldType": "S"
            },
            {
                "FieldName": "Account Number",
                "FieldType": "S"
            },
            {
                "FieldName": "Estimated Value",
                "FieldType": "S"
            }
        ],
        "OptionalFields": [
            {
                "FieldName": "Account Name",
                "FieldType": "S"
            }
        ]
    }
)

status_code = response['ResponseMetadata']['HTTPStatusCode']
print(status_code)


response = table.put_item(
    Item={
        "PK": "3",
        "SK": " ",
        "Type": "Term Deposit",
        "RequiredFields": [
            {
                "FieldName": "BSB",
                "FieldType": "S"
            },
            {
                "FieldName": "Account Number",
                "FieldType": "S"
            },
            {
                "FieldName": "Estimated Value",
                "FieldType": "S"
            }
        ],
        "OptionalFields": [
            {
                "FieldName": "Account Name",
                "FieldType": "S"
            }
        ]
    }
)

status_code = response['ResponseMetadata']['HTTPStatusCode']
print(status_code)


response = table.put_item(
    Item={
        "PK": "4",
        "SK": " ",
        "Type": "Securities",
        "RequiredFields": [
            {
                "FieldName": "SRN/HIN",
                "FieldType": "S"
            },
            {
                "FieldName": "Number of Shares",
                "FieldType": "S"
            },
            {
                "FieldName": "Estimated Value",
                "FieldType": "S"
            }
        ],
        "OptionalFields": [
            {
                "FieldName": "Account Name",
                "FieldType": "S"
            }
        ]
    }
)

status_code = response['ResponseMetadata']['HTTPStatusCode']
print(status_code)
