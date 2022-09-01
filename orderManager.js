'use strict'

const uuidv1 = require('uuid/v1');
const AWS = require('aws-sdk');
const dymano = new AWS.DynamoDB.DocumentClient();
const kinesis = new AWS.Kinesis();

const TABLE_NAME = process.env.orderTableName;
const STREAM_NAME = process.env.orderStreamName;

module.export.createOrder = body => {
    const order = {
        orderId: uuidv1(),
        name: body.name,
        address: body.address,
        productId: body.productId,
        quantity: body.quantity,
        orderDate: Date.now(),
        eventType: 'order_placed'
    };

    return order;
};

module.export.placeNewOrder = order => {
    // save the order in the dynamoDB database
    saveNewOrder(order).then(() => {
        // what to put here
    });
    // put the order in the kinesis stream
};

function saveNewOrder(order) {
    const params = {
        TableName: TABLE_NAME,
        Item: order
    };

    return dynamo.put(params).promise();
}

