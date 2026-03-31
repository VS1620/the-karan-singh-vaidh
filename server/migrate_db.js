const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

const migrate = async () => {
    try {
        const sourceURI = process.env.MONGO_URI.replace('karansinghvaidh', 'test');
        const targetURI = process.env.MONGO_URI;

        console.log('--- DB MIGRATION START ---');
        console.log(`Source: test`);
        console.log(`Target: karansinghvaidh`);

        // 1. Connect to Source
        const sourceConn = await mongoose.createConnection(sourceURI).asPromise();
        console.log('✅ Connected to source (test)');

        // 2. Connect to Target
        const targetConn = await mongoose.createConnection(targetURI).asPromise();
        console.log('✅ Connected to target (karansinghvaidh)');

        const collections = ['products', 'categories', 'users'];

        for (const colName of collections) {
            console.log(`\n📦 Migrating collection: ${colName}...`);
            const data = await sourceConn.db.collection(colName).find({}).toArray();
            console.log(`   Found ${data.length} documents.`);

            if (data.length > 0) {
                // Remove existing
                await targetConn.db.collection(colName).deleteMany({});
                // Insert new
                await targetConn.db.collection(colName).insertMany(data);
                console.log(`   Successfully migrated ${data.length} documents to target.`);
            } else {
                console.log(`   Skipping ${colName} (no data found).`);
            }
        }

        console.log('\n--- MIGRATION COMPLETE ---');
        process.exit();
    } catch (e) {
        console.error(`\n❌ Migration failed: ${e.message}`);
        process.exit(1);
    }
};

migrate();
