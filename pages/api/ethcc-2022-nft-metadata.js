export default async function(req, res) {
  var id = req.query.id;
  if(!/^\d+$/.test(id)) {
    return res.status(404).end();
  }
 
  const metadata = {
    "name": "Non-private NFT for the ethCC 5 - 2022 Paris",
    "image": `https://non-private-nft.hoprnet.org/ethcc-2022-nft-${id}.jpg`,
    "external_url": "https://hoprnet.org/",
    "description": "Educational NFT to highlight network privacy issues of NFTs"
  }

  res.statusCode = 200;
  return res.json(metadata);
}
