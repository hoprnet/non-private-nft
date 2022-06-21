// pages/api/index.ts
import getSvg from "../../components/svgGenerator";

export default async function handler(
  req,
  res
) {
  const svg = getSvg(req.query.title, req.query.footer);
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
  );
  return res.end(svg);
}