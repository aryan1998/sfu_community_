'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let status_code = 0;

    const { id } = event.pathParameters;

    const params = {
        TableName: 'USERS',
        Key: {
            id: id
        }
    };

    try {
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data.Item);
        status_code = 200;
    }
    catch(err) {
        responseBody = `Unable to get User Info: ${err}`;
        status_code = 403;
    }

    let response = {
        statusCode: status_code,
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,GET,PATCH",
        },
        body: responseBody
    };

    return response;
};

