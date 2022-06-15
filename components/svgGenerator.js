import { base64 } from '../images_folder/hopr-nft-tokenlon-ama-gold@0.5x-base64'

export default function svgGenerator(title, footer){
                // font-family: "Source Code Pro";
                // font-style: normal;
    const svg = `<svg width="1601" height="2264" viewBox="0 0 1601 2264" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
            .ip { 
                font-family: "Segoe UI";
                font-family: "Source Code Pro";
                font-weight: 400;
                font-size: 92px; 
                sans-serif; 
                fill: black 
            }
            .ipv6 { 
                font-family: "Source Code Pro";
                font-weight: 400;
                font-size: 54px; 
                sans-serif; 
                fill: black 
            }
        </style>
        <image href="data:image/jpeg;charset=utf-8;base64,${base64}"  x="0" y="0" width="1601" height="2264" />
        <rect x="350" y="450" width="900" height="1364" fill="rgba(255,255,255,0.8)"></rect>
        <g>
            <text x="420" y="580" class="ip">Top IPs:</text>
            <text x="420" y="690" class="ip">255.255.255.254</text>
            <text x="420" y="790" class="ip">255.255.255.254</text>
            <text x="420" y="845" class="ipv6">0000:0000:0000:</text>
            <text x="420" y="900" class="ipv6">0000:0000:0000:c0a8:64e4</text>
            <text x="420" y="955" class="ipv6">0000:0000:0000:</text>
            <text x="420" y="1005" class="ipv6">0000:0000:0000:192.168.100.228</text>
            <text x="420" y="1090" class="ip">255.255.255.254</text>
            <text x="420" y="1190" class="ip">255.255.255.254</text>
            <text x="420" y="1290" class="ip">255.255.255.254</text>
            <text x="420" y="1390" class="ip">255.255.255.254</text>
            <text x="420" y="1490" class="ip">255.255.255.254</text>
            <text x="420" y="1590" class="ip">255.255.255.254</text>
        </g>
        </svg>`;


    return svg;
}


