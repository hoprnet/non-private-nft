import fs from 'fs'
import path from 'path'
import { base64 as Gold05base64 }  from '../../images_folder/hopr-nft-tokenlon-ama-gold@0.5x-base64.js'

import getSvg from "../../components/svgGenerator";

export default function(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
  );
  return res.end(getSvg(1,2));


}
