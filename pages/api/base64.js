const imageToBase64 = require('image-to-base64');
//or
//import imageToBase64 from 'image-to-base64/browser';


    
export default async function handler(req, res) {

    let base64 = "a"
    let b = await imageToBase64("images_folder/hopr-nft-tokenlon-ama-gold@0.5x.jpg");
    console.log('b', b)
    res.status(200).json({ name: 'John Doe', base64, b })
}
  