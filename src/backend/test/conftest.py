import boto3
import pytest
import os
# from moto import mock_s3, mock_sqs


@pytest.fixture

def aws_credentials():
    os.environ["AWS_ACCESS_KEY_ID"] = "randomstring"
    os.environ["AWS_SECRET_ACCESS_KEY"]="randomstring"

@pytest.fixture
def ses_client(aws_credentials):
    conn=boto3.client("ses",region_name="ap-southeast-2",endpoint_url="http://localhost:8005")
    yield conn

@pytest.fixture
def setDb(aws_credentials):
    conn=boto3.resource('dynamodb',region_name="ap-southeast-2",endpoint_url="http://localhost:8000")
    yield conn
