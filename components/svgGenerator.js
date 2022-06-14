import { base64 } from '../images_folder/hopr-nft-tokenlon-ama-gold@0.5x-base64'

export default function svgGenerator(title, footer){

    const svg = `<svg width="1601" height="2264" viewBox="0 0 1601 2264" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
            .ip { font: 100px sans-serif; fill: black }
        </style>
        <image href="data:image/jpeg;charset=utf-8;base64,${base64}"  x="0" y="0" width="1601" height="2264" />
        <rect x="350" y="450" width="900" height="1364" fill="rgba(255,255,255,0.8)"></rect>
        <g>
            <text x="420" y="580" class="ip">255.255.255.254</text>
        </g>
        </svg>`;


    return svg;
}


