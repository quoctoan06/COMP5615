import json
import pytest
from unittest.mock import Mock
from lambda_handler import getAssetClassList


@pytest.fixture
def dynamodb_table():
    return Mock()

@pytest.fixture
def lambda_event_context():
    return ({}, {})

def test_getAssetClassList_success(dynamodb_table, lambda_event_context):
    dynamodb_table.scan.return_value = {'Items': [{'class': 'Class1'}, {'class': 'Class2'}]}

    result = getAssetClassList(*lambda_event_context)

    assert result['statusCode'] == 200
    assert json.loads(result['body']) == [{'class': 'Class1'}, {'class': 'Class2'}]

def test_getAssetClassList_error(dynamodb_table, lambda_event_context):
    
    dynamodb_table.scan.side_effect = Exception("Test error")

    result = getAssetClassList(*lambda_event_context)

    assert result['statusCode'] == 500
    assert json.loads(result['body']) == {'message': 'Error retrieving asset class'}
