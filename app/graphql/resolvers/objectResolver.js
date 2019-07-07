'use strict';

let secretKey;
if(!process.env.NODE_ENV)
    secretKey = require('../../../config').secretKey;
else
    secretKey = require('../../../config').testKey;


module.exports = {
    getObject: (params) => {
        if(params.id)
            return {
                id: '1111',
                paramA: 'hello',
                paramB: 'goodbye'
            }
    }
}