import fs from 'fs'
import path from 'path'
import { base64 as Gold05base64 }  from '../../images_folder/hopr-nft-tokenlon-ama-gold@0.5x-base64.js'
import getSvg from "../../components/svgGenerator";

path.resolve(process.cwd(), 'fonts', 'fonts.conf');
path.resolve(process.cwd(), 'fonts', 'SourceCodePro-Regular.ttf');

import requestIp from 'request-ip'
const sharp = require('sharp');

const buffer = Buffer.from(getSvg(1,2));

export default async function(req, res) {
  const detectedIp = requestIp.getClientIp(req)

  //console.log('req nft', req)
  console.log('req nft geo', req.geo)

  if(detectedIp === "::1"){
    console.log('local')
  } else {
    console.log(detectedIp)
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/jpg");
  const jpeg = {
    mozjpeg: true,
    quality: 100,
  }
  const output = await sharp(buffer).jpeg(jpeg).toBuffer();
  
  return res.end(output);

}
