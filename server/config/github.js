const DEBUG_MODE = true
const REGISTER_URL = DEBUG_MODE?'http://localhost:7000/oauthregister': 'http://hellomrbigbigshot.xyz/oauthregister'
const MAIN_URL = DEBUG_MODE?'http://localhost:7000': 'http://hellomrbigbigshot.xyz'
const client_id = DEBUG_MODE?'88b51271b2e833021ed9':'fd595c760780dca1977d'
const client_secret = DEBUG_MODE?'d061ce765184993a8d9d394bab713e022d9945ad':'c2ce58f6904854e48f23c932eb49886b2acc22c4'
module.exports = {
    client_id: client_id,
    client_secret: client_secret,
    scope: ['user'],
    register_url: REGISTER_URL,
    main_url: MAIN_URL
}