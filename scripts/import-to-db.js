require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const CSV_PATH = 'D:/proyectos-web/dmso2/Productos-Export-2025-December-28-1548.csv';
const MEDIA_DIR = 'D:/proyectos-web/dmso2/media_library_export-dmso_mexico-2025_12_28_15_49_06';
const DEST_IMG_DIR = 'D:/proyectos-web/dmso2/dmso-next/public/images/products';

const sql = neon(process.env.DATABASE_URL);

// Robust CSV Line Reader
function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentCell += '"'; i++;
            } else { inQuotes = !inQuotes; }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentCell); currentCell = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            if (currentRow.length > 0 || currentCell) {
                currentRow.push(currentCell); rows.push(currentRow); currentRow = []; currentCell = '';
            }
        } else { currentCell += char; }
    }
    if (currentRow.length > 0) rows.push(currentRow);
    const headers = rows[0].map(h => h.trim());
    return rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((h, index) => { obj[h] = row[index] || ''; });
        return obj;
    });
}

function slugify(text) {
    return text.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

function determineCategory(title, content) {
    const t = title.toLowerCase();
    const c = content.toLowerCase();
    if (t.includes('crema') || t.includes('cream') || t.includes('bálsamo') || t.includes('balsamo')) return 'crema';
    if (t.includes('gel')) return 'gel';
    if (t.includes('liquido') || t.includes('líquido') || t.includes('liquid') || t.includes('gotas') || t.includes('solución') || t.includes('solucion')) return 'liquido';
    return 'liquido';
}

async function importProducts() {
    console.log('Fetching category IDs...');
    const dbCats = await sql`SELECT id, slug FROM categorias`;
    const catMap = {};
    dbCats.forEach(c => catMap[c.slug] = c.id);

    console.log('Reading CSV...');
    const content = fs.readFileSync(CSV_PATH, 'utf8');
    const productsRaw = parseCSV(content);
    const mediaFiles = fs.readdirSync(MEDIA_DIR);

    if (!fs.existsSync(DEST_IMG_DIR)) fs.mkdirSync(DEST_IMG_DIR, { recursive: true });

    console.log(`Processing ${productsRaw.length} rows...`);
    let count = 0;

    for (const p of productsRaw) {
        if (!p['Title'] || !p['Regular Price']) continue;

        const title = p['Title'];
        const price = parseFloat(p['Regular Price']);
        const description = p['Unfiltered Content'] || p['Content'] || p['Short Description'] || '';
        const imagesVal = p['Image URL'];
        const asin = p['ID']; // Using ID as ASIN for now if not present

        let rawUrls = imagesVal.includes('|') ? imagesVal.split('|') : imagesVal.split(',');
        const processedImages = [];

        rawUrls.forEach(url => {
            const cleanUrl = url.trim();
            if (!cleanUrl) return;
            const imgFilename = path.basename(cleanUrl.split('?')[0]);
            let match = mediaFiles.find(f => f === imgFilename || decodeURIComponent(imgFilename) === f);
            if (match) {
                try {
                  fs.copyFileSync(path.join(MEDIA_DIR, match), path.join(DEST_IMG_DIR, match));
                  processedImages.push(`/images/products/${match}`);
                } catch (e) {}
            }
        });

        if (processedImages.length === 0) processedImages.push('/images/products/placeholder.jpg');

        const slug = slugify(title) + '-' + p['ID'];
        const categorySlug = determineCategory(title, description);
        const categoriaId = catMap[categorySlug];

        try {
            await sql`
                INSERT INTO productos (asin, slug, titulo, descripcion, precio, imagenes, categoria_id, stock, activo)
                VALUES (${asin}, ${slug}, ${title}, ${description.replace(/<[^>]*>/g, '').substring(0, 1000)}, ${price}, ${JSON.stringify(processedImages)}, ${categoriaId}, 100, true)
                ON CONFLICT (slug) DO UPDATE SET
                titulo = EXCLUDED.titulo,
                precio = EXCLUDED.precio,
                imagenes = EXCLUDED.imagenes,
                descripcion = EXCLUDED.descripcion
            `;
            count++;
            if (count % 10 === 0) console.log(`Imported ${count} products...`);
        } catch (err) {
            console.error(`Error importing product ${title}:`, err);
        }
    }

    console.log(`Successfully imported ${count} products to database.`);
}

importProducts().then(() => console.log('Done!'));
