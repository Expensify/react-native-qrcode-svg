const { readFileSync } = require('fs');
const semver = require('semver');

const fileToTransform = 'node_modules/react-native-qrcode-svg/src/index.js';

const upstreamTransformer = (() => {
    try {
      return require("@expo/metro-config/babel-transformer");
    } catch (error) {
      try {
        return require("@react-native/metro-babel-transformer");
      } catch (error) {
        return require("metro-react-native-babel-transformer");
      }
    }
  })();

function createTransformer(transformer) {
    return async ({src, filename, ...rest}) => {
      if (filename === fileToTransform) {
        const packageJsonPath = require.resolve('react-native/package.json');
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        const ReactNativeVersion = packageJson.version;

        // React Native versions below 0.75 do not include a global TextEncoder implementation.
        // To ensure compatibility with these older versions, we add a polyfill using the 'text-encoding' library.
        if (semver.lt(ReactNativeVersion, '0.75.0')) {
            return transformer.transform({
                src: `global.TextEncoder = require('text-encoding').TextEncoder;\n${src}`, 
                filename, 
                ...rest
            });
        }
      }
      return transformer.transform({src, filename, ...rest});
    };
}

module.exports = {
    transform: createTransformer(upstreamTransformer),
};
