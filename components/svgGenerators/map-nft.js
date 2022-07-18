import { base64 } from '../../assets/images/Non-private-NFT-100';
import { flags } from '../../assets/images/flags-128x128';
import { hoprLogo } from '../../assets/images/hopr-logo-svg-string';
import { worldMap } from '../../assets/maps/world-HighRez-Mercator-svg-string.js';
import { mapPin } from '../../assets/images/Google_Maps_Pin';
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

function degrees_to_radians(degrees) {
  return degrees * (Math.PI/180);
}

function pin(ll, country) {
    const latitude = ll[0];  //svg y
    const longitude = ll[1]; //svg x


    const svgHeight = 580;
    const svgWidth = 580;

    const xCoef = 2.805341798;
    const xMin = 1.15;
    const xMax = 1010.26898193359;
    const longMin = -169.116597;
    const longMax = 179.632529;

    var x, y;

    //counting x on map
    x = (-longMin + longitude) * xCoef + xMin;
    if (x < 0) x = x + xMax;

    //counting y on map

    function degreesToSVG( degrees ) {
        return convertRange(
            GudermannianInv(degrees), 
            [Math.PI, - Math.PI], 
            [-20.7, 925.40] // y: 0 and y: max on svg
        );
    }

    function convertRange( value, r1, r2 ) {
        return ( value - r1[0] )
             * ( r2[1] - r2[0] )
             / ( r1[1] - r1[0] )
             +   r2[0];
    }

    function Gudermannian(y) {
        return Math.atan(Math.sinh(y)) * (180 / Math.PI)
    }
    
    function GudermannianInv(latitude)
    {
        var sign = Math.sign(latitude);
        var sin  = Math.sin(
                              latitude 
                            * (Math.PI / 180) 
                            * sign
        );
        return sign * (
            Math.log(
                (1 + sin) / (1 - sin)
            ) / 2
        );
    }

    y = degreesToSVG(latitude)

    console.log ('x', x)
    console.log ('y', y)

    if (!country) return '';
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


    console.log({
        x2,
        y2,
        x2max: x2+width2,
        y2max: y2+width2,
        width2,
        height2
    })


    const step = svgHeight / width2;
    x = x - x2;
    x = x * step;

    y = y - y2;
    y = y * step;


    console.log ('x', x)
    console.log ('y', y)




    // x = 512.5513305664062
    // y = 275.1697998046875

    // x = y = 0;

    // x2: 512.5513305664062,
    // y2: 275.1697998046875,
    // x2max: 546.1519165039062,
    // y2max: 308.7703857421875,
    // width2: 33.6005859375,
    // height2: 33.6005859375

    // Place pins  on the spot
    // x = x + 730;
    // y = y + 545;

    // Place pins pointy end on the spot
    x = x + 681;
    y = y + 392;
    return mapPin(x,y);
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


//        ${geo.ll && pin(geo.ll, requesterCountry)}


    const svg = `<svg width="1601" height="2264" viewBox="0 0 1601 2264" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
            .nft-title { 
                font-family: "Source Code Pro Bold";
                font-size: 58px; 
                fill: rgb(33,38,44);
            }
            .title { 
                font-family: "Source Code Pro Bold";
                font-size: 58px; 
                fill: black 
            }
            .ip { 
                font-family: "Source Code Pro";
                font-weight: 400;
                font-size: 75px; 
                fill: black 
            }
            .date { 
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
            @font-face {
                font-family: "SourceCodePro-SemiBold";
                src: './fonts/SourceCodePro-SemiBold.ttf'';
            }
            @font-face {
                font-family: "Source Code Pro";
                src: './fonts/SourceCodePro-SemiBold.ttf'';
            }
            .count {
                font-family: "SourceCodePro-SemiBold";
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