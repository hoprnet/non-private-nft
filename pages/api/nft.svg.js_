import geoip from 'geoip-lite';
import requestIp from 'request-ip'
import getSvg from "../../components/svgGenerator";
import { getTop10Ips } from "../../components/mysql"

export default async function(req, res) {

  var detectedIp = requestIp.getClientIp(req)
  const geo = geoip.lookup(detectedIp);
  var country = geo?.country.toLowerCase(); 
  const topIPs = await getTop10Ips();


  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
  );
  return res.end(getSvg(detectedIp, country, topIPs));
}
