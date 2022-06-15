import { base64 } from '../images_folder/hopr-nft-tokenlon-ama-gold@0.5x-base64'
import { flags } from '../images_folder/flags-128x128'

export default function svgGenerator(requesterIp, requesterCountry, topIPs){

    // Your IP
    let yourIp = '';
    if(requesterIp === "::1"){
        yourIp = 'local';
    } else {
        yourIp = requesterIp;
    }

    const yourFlag = flags[requesterCountry];

    // All IPs
    let svgTopIPs = '';
    let svgTopIPsFlags = '';

    const x = 360;
    let y = 640;
    for (let i = 0; i <topIPs.length; i++ ){
        let ip = topIPs[i].ip;
        if (ip.length < 16) {
            svgTopIPs = svgTopIPs + `<text x="${x}" y="${y}" class="ip">${ip}</text>`
        } else if (ip.length < 21) {
            svgTopIPs = svgTopIPs + `<text x="${x}" y="${y-7}" class="ipv6">${ip}</text>`
        } else {
            svgTopIPs = svgTopIPs + `<text x="${x}" y="${y-30}" class="ipv6">${ip.substr(0,20)}</text>
            <text x="${x}" y="${y+20}" class="ipv6">${ip.substr(20)}</text>`
        }
        let flag = flags[topIPs[i].country]
        if (flag) {svgTopIPsFlags = svgTopIPsFlags +  `<image href="${flag}" x="1130" y="${y-72}" width="96" height="96" />`}
        y = y + 100;
    }


    
    const svg = `<svg width="1601" height="2264" viewBox="0 0 1601 2264" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
            .title { 
                font-family: "Segoe UI";
                font-family: "Source Code Pro";
                font-weight: 700;
                font-size: 58px; 
                fill: black 
            }
            .ip { 
                font-family: "Segoe UI";
                font-family: "Source Code Pro";
                font-weight: 400;
                font-size: 75px; 
                fill: black 
            }
            .ipv6 { 
                font-family: "Source Code Pro";
                font-weight: 400;
                font-size: 47px; 
                fill: black 
            }
        </style>
        <image href="data:image/jpeg;charset=utf-8;base64,${base64}"  x="0" y="0" width="1601" height="2264" />
        <rect x="325" y="450" width="950" height="1364" fill="rgba(255,255,255,0.8)"></rect>
        <g>
            <text x="${x}" y="535" class="title">Top IPs:</text>
            ${svgTopIPs}
            <text x="${x}" y="1640" class="title">Your IP:</text>
            <text x="${x}" y="1735" class="ip">${yourIp}</text>
        </g>
        <g>
            ${svgTopIPsFlags}
            <image href="${yourFlag}" x="1130" y="1663" width="96" height="96" />
        </g>
        </svg>`;


    return svg;
}

{/* <text x="385" y="640" class="ip">255.255.255.254</text>
<text x="385" y="740" class="ip">255.255.255.254</text>
<text x="385" y="805" class="ipv6">0000:0000:0000:0000:</text>
<text x="385" y="850" class="ipv6">0000:0000:c0a8:64e4</text>
<text x="385" y="905" class="ipv6">0000:0000:0000:0000:</text>
<text x="385" y="950" class="ipv6">0000:0000:192.168.100.228</text>
<text x="385" y="1040" class="ip">255.255.255.254</text>
<text x="385" y="1140" class="ip">255.255.255.254</text>
<text x="385" y="1240" class="ip">255.255.255.254</text>
<text x="385" y="1340" class="ip">255.255.255.254</text>
<text x="385" y="1440" class="ip">255.255.255.254</text>
<text x="385" y="1540" class="ip">255.255.255.254</text> */}
