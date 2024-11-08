const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  async rewrites() {
    return [
      {
        source: '/nft.jpg',
        destination: '/api/nft.jpg',
      },
      {
        source: '/ethcc-2022-nft-:id.jpg',
        destination: '/api/ethcc-2022-nft.jpg?id=:id',
      },
      {
        source: '/ethcc-2022-nft-:id.svg',
        destination: '/api/ethcc-2022-nft.svg?id=:id',
      },
      {
        source: '/demo-nft-:id.jpg',
        destination: '/api/demo-nft.jpg?id=:id',
      },
      {
        source: '/demo-nft-:id.svg',
        destination: '/api/demo-nft.svg?id=:id',
      },
      {
        source: '/demo-nft.jpg',
        destination: '/api/demo-nft.jpg?id=demo',
      },
      {
        source: '/demo-nft.svg',
        destination: '/api/demo-nft.svg?id=demo',
      },
      // {
      //   source: '/:path*',
      //   destination: '/api/nft.jpg',
      // },
    ]
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: "public/modules/geoip-lite-2024-07-19/data/geoip-country.dat",
              to: "data/geoip-country.dat",
            },
            {
              from: "public/modules/geoip-lite-2024-07-19/data/geoip-country6.dat",
              to: "data/geoip-country6.dat",
            },
            {
              from: "public/modules/geoip-lite-2024-07-19/data/geoip-city-names.dat",
              to: "data/geoip-city-names.dat",
            },
          ],
        }),
      );
    }
    return config;
  },
}