const path = require('path')
const blacklist = require('metro/src/blacklist') // eslint-disable-line
const escape = require('escape-string-regexp') // eslint-disable-line

module.exports = {
  getProjectRoots () {
    return [__dirname, path.resolve(__dirname, '..')]
  },
  getProvidesModuleNodeModules () {
    return ['react-native', 'react', 'prop-types', 'react-native-svg', 'qrcode']
  },
  getBlacklistRE () {
    return blacklist([
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`
      )
    ])
  }
}
