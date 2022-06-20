const imageToBase64 = require('image-to-base64');
//or
//import imageToBase64 from 'image-to-base64/browser';


    
export default async function handler(req, res) {

    let b = await imageToBase64("images_folder/Non-private-NFT-100.jpg");
    res.status(200).json({ b })

}
  