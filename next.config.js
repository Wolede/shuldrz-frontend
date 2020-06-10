const path = require('path')

require('dotenv').config()

module.exports = {
    env : {
        API_URL: process.env.API_URL
    },
    webpack: config => {
        config.resolve.alias['components'] = path.join(__dirname, 'src/components')
        config.resolve.alias['public'] = path.join(__dirname, 'public')
        config.resolve.alias['styles'] = path.join(__dirname, 'src/styles')
        config.resolve.alias['contexts'] = path.join(__dirname, 'src/contexts')

        return config
    }
}