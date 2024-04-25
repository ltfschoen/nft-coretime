const withPlugins = require("next-compose-plugins")
const withImages = require("next-images")
module.exports = withPlugins([{transpilePackages: ['@nextjs-lerna/shared']}, withImages], {
  webpack: (config) => {
    // custom webpack config
    return config
  },
  images: {},
})
