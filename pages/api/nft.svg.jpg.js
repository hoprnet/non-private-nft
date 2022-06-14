import fs from 'fs'
import path from 'path'
import { base64 as Gold05base64 }  from '../../images_folder/hopr-nft-tokenlon-ama-gold@0.5x-base64.js'
import getSvg from "../../components/svgGenerator";

import requestIp from 'request-ip'
const sharp = require('sharp');

const roundedCorners = Buffer.from(getSvg(1,2));

export default async function(req, res) {
  const detectedIp = requestIp.getClientIp(req)


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
  const output = await sharp(roundedCorners).jpeg(jpeg).toBuffer();
  
  return res.end(output);

}
