var {expressjwt   : jwt} = require('express-jwt')

function exceptionJWTS()
{
    return jwt({secret:'secureKey', algorithms : ["RS256","HS256"]}).unless({
        path: ["/company/check_company_login"]
    })
}
module.exports = exceptionJWTS