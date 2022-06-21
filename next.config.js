module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/api/nft.jpg',
      },
    ]
  },
}