import geoip from 'geoip-lite';
import requestIp from 'request-ip'
import uaparser from 'ua-parser-js';
import getSvg from "../../components/svgGenerators/map-nft-demo"
import Negotiator from 'negotiator';
import { insertIpToDemoAndGetCount } from "../../components/mysql";

export default async function(req, res) {
  var id = req.query.id;
  if (req.query.id === 'demo'){
    id = Number.MAX_SAFE_INTEGER;
  } else if(!/^\d+$/.test(id)) {
    return res.status(404).end();
  }
  const start = Date.now();
  var detectedIp = requestIp.getClientIp(req);
  id = parseInt(id);

  if (detectedIp === '::1' || detectedIp === '::ffff:') {
    detectedIp = '79.184.237.6';
  }

  // detectedIp = '146.112.128.150'; // Paris
  // detectedIp = '161.116.109.141'; // Barcelona
  // detectedIp = '161.116.109.141'; // Barcelona
  // detectedIp = '78.184.238.42'; // Istanbul
  // detectedIp = '103.107.198.211'; // Singapore
  // detectedIp = '51.154.129.107'; // 
  //detectedIp = '2a01:110f:4407:a200:5c9e:9146:a935:a05d'; // Warsaw
  const count = await insertIpToDemoAndGetCount(id, detectedIp);

  var ua = uaparser(req.headers['user-agent']);
  const geo = geoip.lookup(detectedIp);
  const lang = new Negotiator(req).language();

  // ua = {
  //   ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/101.0.4951.58 Mobile/15E148 Safari/604.1',
  //   browser: { name: 'Chrome', version: '101.0.4951.58', major: '101' },
  //   engine: { name: 'WebKit', version: '605.1.15' },
  //   os: { name: 'iOS', version: '15.4' },
  //   device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
  //   cpu: { architecture: undefined }
  // };

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
  );
  console.log(Date.now()-start);
  return res.end(getSvg(detectedIp, geo, ua, lang, id, count));
}
