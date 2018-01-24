var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_SHIPMENTS_URL: '"http://api.cratejoy.com/v1/shipments/"',
  API_AUTH: '"Basic dGVhX3J1bm5lcnM6TjBxeHFMcHRqRnFNMTdrMg=="'
})
