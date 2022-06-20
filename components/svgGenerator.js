// import { base64 } from '../images_folder/hopr-nft-tokenlon-ama-gold@0.5x-base64'
//import { base64 } from '../images_folder/Non-private-NFT-40'
// import { base64 } from '../images_folder/Non-private-NFT-75'
import { base64 } from '../images_folder/Non-private-NFT-100'
import { base64 as hoprLogoBase64 } from '../images_folder/hopr-logo'
import { flags } from '../images_folder/flags-128x128'

export default function svgGenerator(requesterIp, requesterCountry, topIPs){

    // Your IP
    let yourIp = '';
 //   if(requesterIp === "::1"){
 //       yourIp = 'local';
 //   } else {
        yourIp = requesterIp;
 //   }


    const yourFlag = flags[requesterCountry];

    // All IPs
    let svgTopIPs = '';
    let svgTopIPsFlags = '';
    let svgTopIPsCount = '';

    const x = 295;
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
        if (flag) {svgTopIPsFlags = svgTopIPsFlags +  `<image href="${flag}" x="1055" y="${y-72}" width="96" height="96" />`}

        let count = topIPs[i].count;

        let countXBase = 1200;
     //   count = 53850000
        if(count < 10) {
            countXBase = 1245;
        } else if(count < 100) {
            countXBase = 1229;
        } else if(count < 1000) {
            countXBase = 1215;
        } else if(count > 9999 && count <= 99999) {
            countXBase = 1215;
            count = Math.floor(count/1000) + 'k'
        } else if(count > 99999 && count <= 999999) {
            count = Math.floor(count/1000) + 'k'
        } else if(count > 999999 && count <= 9999999) {
            countXBase = 1229;
            count = Math.floor(count/1000000) + 'M'
        } else if(count > 9999999 && count <= 99999999) {
            countXBase = 1215;
            count = Math.floor(count/1000000) + 'M'
        } else if(count > 99999999) {
            count = '99M+';
        }

        svgTopIPsCount = svgTopIPsCount +  `<g>
            <ellipse cx="1230" cy="${y-25}" rx="40" ry="40" class="count-container"/>
            <rect x="1227" y="${y-65}" width="60" height="80" class="count-container"/>
            <ellipse cx="1290" cy="${y-25}" rx="40" ry="40" class="count-container"/>
            <text x="${countXBase}" y="${y-11}" class="count" >${count}</text>
            </g>`;

        y = y + 100;
    }

    let svgYourIP = '';
    if (yourIp.length < 16) {
        svgYourIP = svgYourIP + `<text x="${x}" y="1785" class="ip">${yourIp}</text>`
    } else if (yourIp.length < 21) {
        svgYourIP = svgYourIP + `<text x="${x}" y="${1785-7}" class="ipv6">${yourIp}</text>`
    } else {
        svgYourIP = svgYourIP + `<text x="${x}" y="${1785-30}" class="ipv6">${yourIp.substr(0,20)}</text>
        <text x="${x}" y="${1785+20}" class="ipv6">${yourIp.substr(20)}</text>`
    }



    const hoprLogo = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 249.3 113.4" style="enable-background:new 0 0 249.3 113.4;" xml:space="preserve"
            x="285" y="340" width="230" height="150" >
        <style type="text/css">
            .st0{fill:#FFFFFF;}
            .st1{fill:#1D1D1B;}
            .st2{fill:url(#SVGID_1_);}
            .st3{fill:url(#SVGID_2_);}
            .st4{fill:url(#SVGID_3_);}
            .st5{fill:url(#SVGID_4_);}
        </style>
        <g>
        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="38.1501" y1="84.9116" x2="38.1501" y2="22.0279">
            <stop  offset="0" style="stop-color:#0000B4"/>
            <stop  offset="9.090910e-03" style="stop-color:#0000B4"/>
            <stop  offset="1" style="stop-color:#000050"/>
        </linearGradient>
        <path class="st2" d="M46.4,24.6c-0.7-0.1-1.3-0.1-2-0.1c-4.9,0-9.7,2-14,5.8c-2,1.8-3.9,4-5.6,6.4c-0.3-9.3-0.8-19.2-1.8-29.3H10.5
            c2.7,28.4,2.4,53.2,1.9,75h0c0,0,0,0.1,0,0.1h12.5c0.4-21.8,5.8-35.8,13.9-43c2.2-1.9,4.3-2.8,6.2-2.6c9.9,1.1,8.3,31.9,7.6,45.6
            h12.5c0.5-10.1,1.1-22.4-0.3-33C62.8,34,56.5,25.7,46.4,24.6z"/>
        <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="158.5772" y1="84.9116" x2="158.5772" y2="22.0279">
            <stop  offset="0" style="stop-color:#0000B4"/>
            <stop  offset="9.090910e-03" style="stop-color:#0000B4"/>
            <stop  offset="1" style="stop-color:#000050"/>
        </linearGradient>
        <path class="st3" d="M174.2,26.5c-3-1.4-6.2-2.1-9.4-2.1c-3.3,0-6.6,0.7-9.9,2.2c-9,4.1-16.5,13.5-20,25.2c-5.4,18-5.1,39.6-5,53.9
            c0,0.4,0,0.7,0,1.1h12.5c0-0.4,0-0.8,0-1.2c-0.1-13.5-0.4-34,4.5-50.2c2.4-8.2,7.5-14.8,13.2-17.4c3.1-1.4,6.1-1.4,8.8-0.2
            c2.9,1.4,4.4,4.3,5,6.6c1.6,5.2,0.8,11.5-2.1,16c-4.5,7.3-10.7,9.9-22.1,9.6l0,12.4c12,0.1,25.1-2.7,32.8-15.5
            c4.6-7.6,6-17.6,3.4-26.2C184,34.2,179.8,29.1,174.2,26.5z"/>
        <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="99.3556" y1="84.9116" x2="99.3556" y2="22.0279">
            <stop  offset="0" style="stop-color:#0000B4"/>
            <stop  offset="9.090910e-03" style="stop-color:#0000B4"/>
            <stop  offset="1" style="stop-color:#000050"/>
        </linearGradient>
        <path class="st4" d="M99.4,24.1c-16.1,0-29.1,13.4-29.1,29.9c0,16.5,13.1,29.9,29.1,29.9c16.1,0,29.1-13.4,29.1-29.9
            C128.5,37.5,115.4,24.1,99.4,24.1z M99.4,71.4c-9.2,0-16.6-7.8-16.6-17.4c0-9.6,7.4-17.4,16.6-17.4c9.2,0,16.6,7.8,16.6,17.4
            C116,63.6,108.5,71.4,99.4,71.4z"/>
        <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="215.3602" y1="84.9116" x2="215.3602" y2="22.0279">
            <stop  offset="0" style="stop-color:#0000B4"/>
            <stop  offset="9.090910e-03" style="stop-color:#0000B4"/>
            <stop  offset="1" style="stop-color:#000050"/>
        </linearGradient>
        <path class="st5" d="M220.5,24.1c-4.6,0-8.8,1.7-12.5,5.1c-1.4,1.3-2.7,2.8-3.9,4.4c-0.3-2.6-0.6-5.3-0.9-8.1h-12.6
            c3,22.3,2.7,40.7,2.5,52c0,1.7-0.1,3.2-0.1,4.5c0,0.1,0,0.2,0,0.4h0h12.5c0.1-8.4,0.4-15.1,2.3-25.3C209.7,47,215.3,36,221,36.6
            c4.5,0.4,6,5.8,6.5,10.8h12.6C239.4,32.4,230.9,24.1,220.5,24.1z"/>
        </g>
    </svg>`

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
            .count-container {
              /*   fill: rgba(0,0,0,0.4); */
              fill: rgb(153,153,96);
            }
            .count {
                font-family: "Source Code Pro";
                font-weight: 400;
                font-size: 50px; 
                fill: black 
            }
        </style>
        <image href="data:image/jpeg;charset=utf-8;base64,${base64}"  x="0" y="0" width="1601" height="2264" />
        <rect x="250" y="410" width="1100" height="1440" fill="rgb(255,255,160)"></rect>
        <polygon points="250,340 540,340 660,465 250,465" style="fill:rgb(255,255,160)" />
        ${hoprLogo}
        <g>
            <text x="${x}" y="535" class="title">Top IPs loading this NFT:</text>
            ${svgTopIPs}
            <text x="${x}" y="1690" class="title">Your IP:</text>
            ${svgYourIP}
        </g>
        <g>
            ${svgTopIPsFlags}
            ${yourFlag ? `<image href="${yourFlag}" x="1130" y="1663" width="96" height="96" />` : '' }
        </g>
        <g>
            ${svgTopIPsCount}
        </g>
        </svg>`;


    return svg;
}