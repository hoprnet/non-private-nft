import path from 'path'
import getSvg from "../../components/svgGenerator";
import { insertIp, getTop10Ips } from "../../components/mysql"

path.resolve(process.cwd(), 'fonts', 'fonts.conf');
path.resolve(process.cwd(), 'fonts', 'SourceCodePro-Regular.ttf');

import geoip from 'geoip-lite';
import requestIp from 'request-ip'
const sharp = require('sharp');

export default async function(req, res) {

  var detectedIp = requestIp.getClientIp(req)
  if(detectedIp === "::1") detectedIp = '79.184.238.42'// '2a01:110f:4407:a200:6017:ea42:fa3b:e9bf'
  const geo = geoip.lookup(detectedIp);
  var country = geo?.country.toLowerCase(); 

  insertIp(detectedIp, country);
  const topIPs = await getTop10Ips();

  const buffer = Buffer.from(getSvg(detectedIp, country, topIPs));

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/jpg");
  const jpeg = {
    mozjpeg: true,
    quality: 100,
  }
  const output = await sharp(buffer).jpeg(jpeg).toBuffer();
  
  return res.end(output);

}
