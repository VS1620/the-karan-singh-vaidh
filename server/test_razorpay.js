const Razorpay = require('razorpay');

const key_id = 'rzp_live_SDApTPGDY3ioLj';
const key_secret = 'Pb3Iu4xuWHN6Uby2uq1BScpH';

console.log("Testing Razorpay Keys...");
console.log("Key ID:", key_id);
// console.log("Key Secret:", key_secret);

const razorpay = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
});

async function testConnection() {
    try {
        const options = {
            amount: 50000, // 500 INR
            currency: 'INR',
            receipt: `receipt_test_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        console.log("✅ SUCCESS: Order created successfully!");
        console.log("Order ID:", order.id);
    } catch (error) {
        console.error("❌ FAILED: Could not create order.");
        console.error("Error:", error);
    }
}

testConnection();
