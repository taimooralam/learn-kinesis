'use strict'

const AWS = require('aws-sdk');
const ses = new AWS.SES({
    region: process.env.region
});

const CAKE_PRODUCER_EMAIL = process.env.cakeProducerEmail;
const ORDERING_SYSTEM_EMAIL = process.env.orderingSystemEmail;

module.exports.handlePlacedOrders = ordersPlaced => {
    var ordersPlacedPromises = [];

    for (let order of ordersPlaced) {
        const temp = notifyCakeProducerByEmail(order);
        
        ordersPlacedPromises.push(temp);
    }

    return Promise.all(ordersPlacedPromises);
}

function notifyCakeProducerByEmail(order) {
    console.log('***', 'about to notify about', order, CAKE_PRODUCER_EMAIL);
    const params = {
        Destination: {
            ToAddresses: [CAKE_PRODUCER_EMAIL]
        },
        Message: {
            Body: {
                Text: {
                    Data: JSON.stringify(order)
                }
            },
            Subject: {
                Data: 'New cake order'
            }
        },
        Source: ORDERING_SYSTEM_EMAIL
    };

    return ses.sendEmail(params).promise().then((data) => {
        console.log('***', 'notification email sent data', data);
        return data;
    }).catch((error) => {
        console.log('***', 'error while sending email data', data);
        return error;
    });
}