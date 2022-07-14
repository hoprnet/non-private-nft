import path from 'path'
import getSvg from "../../components/svgGenerators/scoreboard-nft";
import { insertIpToScoreboard, getTop10Ips } from "../../components/mysql";

path.resolve(process.cwd(), 'fonts', 'fonts.conf');
path.resolve(process.cwd(), 'fonts', 'SourceCodePro-Regular.ttf');

import geoip from 'geoip-lite';
import requestIp from 'request-ip'
const sharp = require('sharp');

export default async function(req, res) {
  let start = Date.now();
  var detectedIp = requestIp.getClientIp(req)
  const geo = geoip.lookup(detectedIp);
  var country = geo?.country.toLowerCase(); 

  insertIpToScoreboard(detectedIp, country);
  const topIPs = await getTop10Ips();

  const buffer = Buffer.from(getSvg(detectedIp, country, topIPs));

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/jpg");
  const jpeg = {
    mozjpeg: false, //true: 1400ms false: 536.8ms
    quality: 80, //90: 827.6ms 70: 600ms 50: 521ms // 100:445.6 80:406.4
    optimiseCoding: false, //true: 536.8ms false: 411ms
  }
  const output = await sharp(buffer).resize({ width: 1000 }).jpeg(jpeg).toBuffer();
  

  console.log(Date.now()-start);
  return res.end(output);

}
