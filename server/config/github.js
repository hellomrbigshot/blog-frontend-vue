const config = require('./config')
const DEBUG_MODE = config.DEBUG_MODE
const client_id = DEBUG_MODE?'88b51271b2e833021ed9':'fd595c760780dca1977d'
const client_secret = DEBUG_MODE?'d061ce765184993a8d9d394bab713e022d9945ad':'c2ce58f6904854e48f23c932eb49886b2acc22c4'
module.exports = {
    client_id: client_id,
    client_secret: client_secret,
    scope: ['user']
}