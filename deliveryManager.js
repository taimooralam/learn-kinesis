'use strict'

module.exports.deliveryOrder = ordersFulfilled => {
    console.log('Delivert order was called');

    return Promise((resolve) => {
        setTimeout(() => {
            console.log('foo');
            resolve('foo');
        }, 300);
    })
};