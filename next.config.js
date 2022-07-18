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
      // {
      //   source: '/:path*',
      //   destination: '/api/nft.jpg',
      // },
    ]
  },
}