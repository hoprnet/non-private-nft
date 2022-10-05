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
}