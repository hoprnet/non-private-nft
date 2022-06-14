import fs from 'fs'
import path from 'path'

const filePath = path.resolve('.', 'images_folder/hopr-nft-tokenlon-ama-gold@0.5x.jpg')
const imageBuffer = fs.readFileSync(filePath)

export default function(req, res) {
  res.setHeader('Content-Type', 'image/jpg')
  res.send(imageBuffer)
}
