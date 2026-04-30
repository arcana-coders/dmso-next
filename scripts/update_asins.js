const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

// Load .env
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k && v.length) process.env[k.trim()] = v.join('=').trim();
  });
}

const sql = neon(process.env.DATABASE_URL);

async function updateAsins() {
  console.log('Updating product ASINs with real Amazon data...');
  
  const updates = [
    { id: 2, newAsin: 'B0CV26NVGT' }, // Dmso Líquido 473ml
    { id: 3, newAsin: 'B09HN9S5C5' }, // 3 Botes de Dmso Líquido 237 ml
    { id: 5, newAsin: 'B0CMN243FQ' }  // Crema DMSO Dr. Robaina
  ];

  for (const update of updates) {
    try {
      await sql`UPDATE productos SET asin = ${update.newAsin} WHERE id = ${update.id}`;
      console.log(`✅ Updated ID ${update.id} to ASIN ${update.newAsin}`);
    } catch (err) {
      console.error(`❌ Error updating ID ${update.id}: ${err.message}`);
    }
  }
}

updateAsins();
