# Start Project Instructions

## Frontend
- Install dependencies: `npm install`
- Start NodeJS app: `npm start`


## Backend
- Create Python virtual environment
    + Run: `python3 -m venv venv`
    + Activate the virtual environment: `source venv/bin/activate`
    + Install required libraries in the virtual environment: `pip install -r backend/requirements.txt`

- Install Serverless Framework and its plugins
    + Run: `npm i -g serverless serverless-offline serverless-offline-ses-v2 serverless-s3-local`

- Start serverless offline plugin
    + Run: `sls offline start`

- Local SES service
    + Open [localhost:8005](http://localhost:8005/) to see the emails being sent

## Data Model
- [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Configure AWS CLI: `aws configure`
- [Download DynamoDB local for Docker](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
    + Start Docker container: `docker-compose up -d`
- [Download NoSQL Workbench for DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)
    + **Don't install Local DynamoDB through this installer**
    + [How to use NoSQL Workbench for a Local DynamoDB](https://blog.phillipninan.com/using-nosql-workbench-for-a-local-dynamodb)
- Import the data model using NoSQL Workbench GUI and file `dynamodb-datamodel-vale-data-model.json`
- Import some data into DynamoDB: `python3 database/import_data.py`
- Some commands related to DynamoDB
    + Show list of tables: `aws dynamodb list-tables --endpoint-url http://localhost:8000`
    + Delete a table: `aws dynamodb delete-table --table-name TABLE_NAME --endpoint-url http://localhost:8000`
