import path from 'path'
import getSvg from "../../components/svgGenerators/map-nft-demo";
import uaparser from 'ua-parser-js';
import Negotiator from 'negotiator';
import { insertIpToDemoAndGetCount } from "../../components/mysql";

path.resolve(process.cwd(), 'fonts', 'fonts.conf');
path.resolve(process.cwd(), 'fonts', 'SourceCodePro-Regular.ttf');

import geoip from 'geoip-lite';
import requestIp from 'request-ip'
const sharp = require('sharp');

export default async function(req, res) {
  let start = Date.now();
  var id = req.query.id;
  if (req.query.id === 'demo'){
    id = Number.MAX_SAFE_INTEGER;
  } else if(!/^\d+$/.test(id)) {
    return res.status(404).end();
  }

  var detectedIp = requestIp.getClientIp(req);
  id = parseInt(id);

  if (detectedIp === '::1' || detectedIp === '::ffff:') {
    detectedIp = '79.184.237.6';
  }

  //  detectedIp = '78.184.238.42';
  // detectedIp = '78.184.238.42';
  //  detectedIp = '2a01:110f:4407:a200:5c9e:9146:a935:a05d';
  const count = await insertIpToDemoAndGetCount(id, detectedIp);

  const geo = geoip.lookup(detectedIp);
  var ua = uaparser(req.headers['user-agent']);
  const lang = new Negotiator(req).language();

  // ua = {
  //   ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/101.0.4951.58 Mobile/15E148 Safari/604.1',
  //   browser: { name: 'Chrome', version: '101.0.4951.58', major: '101' },
  //   engine: { name: 'WebKit', version: '605.1.15' },
  //   os: { name: 'iOS', version: '15.4' },
  //   device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
  //   cpu: { architecture: undefined }
  // };
  
  const buffer = Buffer.from(getSvg(detectedIp, geo, ua, lang, id, count));

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
