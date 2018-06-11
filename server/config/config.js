const DEBUG_MODE = true
const REGISTER_URL = DEBUG_MODE?'http://localhost:7000/oauthregister': 'http://hellomrbigbigshot.xyz/oauthregister'
const MAIN_URL = DEBUG_MODE?'http://localhost:7000': 'http://hellomrbigbigshot.xyz'
module.exports = {
    client_id: '88b51271b2e833021ed9',
    client_secret: 'd061ce765184993a8d9d394bab713e022d9945ad',
    scope: ['user'],
    register_url: REGISTER_URL,
    main_url: MAIN_URL
}