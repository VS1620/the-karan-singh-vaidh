const express = require('express');
const router = express.Router();
const ImageKit = require('imagekit');

// Using your provided credentials as safe defaults to prevent server crash
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'public_4c8twCaRhq67pmSzubBwraeuJvQ=',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_0pkhFxRVnKrUh5A+/uIwyCKzX0c=',
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/wjmididvj'
});

// Authentication endpoint for frontend
router.get('/auth', (req, res) => {
    try {
        const result = imagekit.getAuthenticationParameters();
        res.send(result);
    } catch (error) {
        console.error("ImageKit Auth Error:", error.message);
        res.status(500).send({ error: "Failed to authenticate with ImageKit" });
    }
});

module.exports = router;
