import { base64 } from '../../assets/images/Non-private-NFT-100';
import { flags } from '../../assets/images/flags-128x128';
import { hoprLogo } from '../../assets/images/hopr-logo-svg-string';
import { worldMap } from '../../assets/maps/world-HighRez-Mercator-svg-string.js';
import worldViewBoxes from '../../assets/precalculated/world-HighRez-Mercator-viewboxes.json'
import languages from '../../assets/precalculated/languages.json'

function cropMap(country, offsetY){
    if (!country) return worldMap();
    country = country.toUpperCase();
    let viewBox = worldViewBoxes[country];

    let biggerNumber = Math.max(viewBox.width, viewBox.height);
    let widthIsBigger = viewBox.width > viewBox.height;

    let offet = biggerNumber * 0.1;
    let x2, y2, width2, height2;
    if(widthIsBigger){
        x2 = viewBox.x - offet;
        width2 = biggerNumber + 2 * offet;
        y2 = viewBox.y - ((width2 - viewBox.height)/2);
        height2 = width2;
    } else {
        y2 = viewBox.y - offet;
        height2 = biggerNumber + 2 * offet;
        x2 = viewBox.x - ((height2 - viewBox.width)/2);
        width2 = height2;
    }

    const new_viewBox = `${x2} ${y2} ${width2} ${height2}`;
    let map = worldMap(new_viewBox, offsetY+160);
    return map;
}

function deviceString(device, ua, cpu_arch){
    let os = ua.os.name + ' ' + ua.os.version;
    if (os === 'Windows 10') os = 'Windows 10 or later'
    let string = `${device ?`${device}, ` : ''}${os}${cpu_arch ?`, ${cpu_arch}` : ''}`;
    string = string.substr(0,34);
    return string;
}

function stringifyId(id) {
    if (id === Number.MAX_SAFE_INTEGER) return 'demo';
    if (id < 10000) return id;
    return '10k+';
}

function stringifyCounter(id) {
    if (id < 10) return '000' + id;
    if (id < 100) return '00' + id;
    if (id < 1000) return '0' + id;
    if (id < 10000) return id;
    return '10k+';
}

export default function svgGenerator(requesterIp, geo, ua, lang, id, count){

    const requesterCountry = geo?.country;
    const yourIp = requesterIp;
    const yourFlag = flags[requesterCountry.toLowerCase()];
    const browser = ua.browser.name + ' ' + ua.browser.major;
    const cpu_arch = ua.cpu.architecture;
    const device = (ua.device.vendor || ua.device.model) && `${ua.device.vendor ? ua.device.vendor + ' ' : ''}${ua.device.model ? ua.device.model : ''}`
    const city = geo?.city;
  //  const date = `${new Date()}`.substr(0,33);
    var language = "English"
    try {
        language = languages[lang.toLowerCase()]
    } catch (e) {
        console.warn('Warning: Unusual langualge:', lang, 'Error:', e);
    }
     


    const folderOffsetY = 385;
    const x = 295;

    let svgYourIP = '';
    const ipY = folderOffsetY + 1375;
    if (yourIp.length < 16) {
        svgYourIP = svgYourIP + `<text x="${x}" y="${ipY}" class="ip">${yourIp}</text>`
    } else if (yourIp.length < 21) {
        svgYourIP = svgYourIP + `<text x="${x}" y="${ipY-7}" class="ipv6">${yourIp}</text>`
    } else {
        svgYourIP = svgYourIP + `<text x="${x}" y="${ipY-30}" class="ipv6">${yourIp.substr(0,20)}</text>
        <text x="${x}" y="${ipY+20}" class="ipv6">${yourIp.substr(20)}</text>`
    }




    const svg = `<svg width="1601" height="2264" viewBox="0 0 1601 2264" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
            .nft-title { 
                font-family: "Segoe UI";
                font-family: "Source Code Pro";
                font-weight: bold;
                font-size: 58px; 
                fill: rgb(33,38,44);
            }
            .title { 
                font-family: "Segoe UI";
                font-family: "Source Code Pro";
                font-weight: bold;
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
            .date { 
                font-family: "Segoe UI";
                font-family: "Source Code Pro";
                font-weight: 400;
                font-size: 50px; 
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
              fill: rgba(107,122,134);
              /*  fill: rgb(153,153,96); */
              fill: rgb(255, 255, 160);
            }
            .count {
                font-family: "Source Code Pro";
                font-weight: bolder;
                font-size: 36px; 
                fill: black 
            }
        </style>
        <image href="data:image/jpeg;charset=utf-8;base64,${base64}"  x="0" y="0" width="1601" height="2264" />

        <g>
            <rect x="46" y="95" width="483" height="120" style="fill: rgb(255, 255, 160)"></rect>
            <rect x="540" y="95" width="100" height="10" style="fill: rgb(255, 255, 160)"></rect>
            <polygon points="540,115 640,115 540,215" style="fill: rgb(255, 255, 160)"></polygon>
            <text class="nft-title" x="70" y="147">EthCC 5</text>
            <text class="nft-title" x="70" y="202">2022 Paris</text>
        </g>

        <polygon points="250,${folderOffsetY} 540,${folderOffsetY} 605,${folderOffsetY+70} 1350,${folderOffsetY+70} 1350,${folderOffsetY+1440} 250,${folderOffsetY+1440} 250,${folderOffsetY+125}" style="fill:rgba(255,255,255,0.5)" />
        ${hoprLogo(folderOffsetY)}
        ${cropMap(requesterCountry, folderOffsetY)}

        <g>
            <text class="title" x="295" y="${folderOffsetY+210}">Country:</text>
            <text class="date" x="405" y="${folderOffsetY+280}">${requesterCountry}</text>
            ${yourFlag ? `<image href="${yourFlag}" x="295" y="${folderOffsetY+219}" width="96" height="96" />` : '' }
        </g>
        
        <g>
            <text class="title" x="295" y="${folderOffsetY+390}">City:</text>
            <text class="date" x="295" y="${folderOffsetY+460}">${city ? city.substr(0,14) : '-'}</text>
        </g>

        <g>
            <text class="title" x="295" y="${folderOffsetY+570}">Coordinates:</text>
            <text class="date" x="295" y="${folderOffsetY+640}">${geo.ll[0]}</text>
            <text class="date" x="295" y="${folderOffsetY+710}">${geo.ll[1]}</text>
        </g>

        <g>
            <text class="title" x="295" y="${folderOffsetY+800}">Preferred language:</text>
            <text class="date" x="295" y="${folderOffsetY+870}">${language}</text>
        </g>

        <g>
            <text x="${x}" y="${folderOffsetY+960}" class="title">Browser:</text>
            <text x="${x}" y="${folderOffsetY+1030}" class="date">${browser.substr(0,34)}</text>
        </g>

        <g>
            <text x="${x}" y="${folderOffsetY+1120}" class="title">${device ? 'Device and OS:' : 'OS and Device:'}</text>
            <text x="${x}" y="${folderOffsetY+1190}" class="date">${deviceString(device, ua, cpu_arch)}</text>
        </g>

        <g>
            <text x="${x}" y="${folderOffsetY+1280}" class="title">Your IP:</text>
            ${svgYourIP}
        </g>

        <g>
            <text x="40" y="59" class="count">id:${stringifyId(id)}</text>
            <polygon points="1285,2235 1335,2185 1580,2185 1580,2235" style="fill: rgb(255, 255, 160)"></polygon>
            <text x="1330" y="2222" class="count">visits:${stringifyCounter(count)}</text>
        </g>
       
        </svg>`;


    return svg;
}