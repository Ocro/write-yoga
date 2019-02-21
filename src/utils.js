const jwt = require('jsonwebtoken')
const APP_SECRET = 'ina4Asd3iuGasd87hknuDUAd7'

function getUserId(context) {
    const Authorization = context.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId
    }

    throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}
