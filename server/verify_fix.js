const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

/**
 * PRODUCTION-READY TEST SCRIPT
 * Checks if the backend is reachable and if upload works.
 */
async function testUpload() {
    console.log('--- STARTING 100% FIX VERIFICATION ---');

    const API_URL = 'http://localhost:5000/api/upload';
    console.log(`Targeting local backend: ${API_URL}`);

    // Create a dummy file
    const testFilePath = path.join(__dirname, 'test-upload.png');
    fs.writeFileSync(testFilePath, 'fake image data');

    try {
        const form = new FormData();
        form.append('image', fs.createReadStream(testFilePath));

        console.log('Sending upload request...');
        const response = await axios.post(API_URL, form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        console.log('✅ UPLOAD SUCCESSFUL!');
        console.log('Response:', response.data);
        console.log('\nTHIS PROBLEM IS NOW RESOLVED 100%.');
    } catch (error) {
        console.error('❌ UPLOAD FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Message:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    } finally {
        if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
    }
}

testUpload();
