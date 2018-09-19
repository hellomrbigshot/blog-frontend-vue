const config = require('./config')
const DEBUG_MODE = config.DEBUG_MODE
const client_key = DEBUG_MODE?'3549067552':'2403415683'
const client_secret = DEBUG_MODE?'4a20fa84008cf0566f7f4de9fe6575b7':'6e581850a9eb30e13e34860aa218aa82'
module.exports = {
    client_id: client_key,
    client_secret: client_secret
}