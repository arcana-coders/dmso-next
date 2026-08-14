const fs = require('fs');
const path = require('path');

const CSV_PATH = 'D:/proyectos-web/dmso2/Productos-Export-2025-December-28-1548.csv';
const MEDIA_DIR = 'D:/proyectos-web/dmso2/media_library_export-dmso_mexico-2025_12_28_15_49_06';
const DEST_IMG_DIR = 'D:/proyectos-web/dmso2/dmso-next/public/images/products';
const OUTPUT_FILE = 'D:/proyectos-web/dmso2/dmso-next/src/data/products.ts';

// Robust CSV Line Reader (handles multi-line quoted fields)
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
                // Escaped quote
                currentCell += '"';
                i++;
            } else {
                // Toggle quote
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            // End of cell
            currentRow.push(currentCell);
            currentCell = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            // End of row (handle CRLF or LF)
            if (char === '\r' && nextChar === '\n') i++;
            if (currentRow.length > 0 || currentCell) {
                currentRow.push(currentCell);
                rows.push(currentRow);
                currentRow = [];
                currentCell = '';
            }
        } else {
            currentCell += char;
        }
    }
    if (currentRow.length > 0) rows.push(currentRow); // Last row

    const headers = rows[0].map(h => h.trim());
    const results = rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((h, index) => {
            // Handle case where row might be shorter than headers
            obj[h] = row[index] || '';
        });
        return obj;
    });

    return results;
}

function slugify(text) {
    return text.toString().toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

function determineCategory(title, content) {
    const t = title.toLowerCase();
    const c = content.toLowerCase();

    // 1. Check Title First (High Confidence)
    if (t.includes('crema') || t.includes('cream') || t.includes('bálsamo') || t.includes('balsamo')) return 'dmso-crema';
    if (t.includes('gel')) return 'dmso-gel';
    if (t.includes('liquido') || t.includes('líquido') || t.includes('liquid') || t.includes('gotas') || t.includes('solución') || t.includes('solucion')) return 'dmso-liquido';

    // 2. Fallback to Content (Lower Confidence) - but be careful
    if (c.includes('crema ') || c.includes('cream ')) return 'dmso-crema';
    // Only classify as Gel via content if it DOESN'T say liquid in content
    if (c.includes(' gel ') && !c.includes('liquido') && !c.includes('líquido')) return 'dmso-gel';

    // Default to liquid for everything else (kits usually liquid, etc)
    return 'dmso-liquido';
}

// Prepare directories
if (!fs.existsSync(DEST_IMG_DIR)) {
    fs.mkdirSync(DEST_IMG_DIR, { recursive: true });
}

// Read and Parse
const content = fs.readFileSync(CSV_PATH, 'utf8');
const productsRaw = parseCSV(content);
const mediaFiles = fs.readdirSync(MEDIA_DIR);

console.log(`Found ${productsRaw.length} raw rows.`);

const validProducts = [];
const processedIds = new Set();

productsRaw.forEach(p => {
    // Filter out parent products if they are variations (sometimes they list parent and child)
    // Or filter out empty titles
    if (!p['Title'] || !p['Regular Price']) return;

    // Deduplication check
    if (processedIds.has(p['ID'])) return;
    processedIds.add(p['ID']);

    const title = p['Title'];
    const price = p['Regular Price'];
    const description = p['Unfiltered Content'] || p['Content'] || p['Short Description'] || ''; // Content is usually HTML
    const imagesVal = p['Image URL'];

    // Process Images
    // Check multiple delimiters. Typically CSV export uses | or ,
    // If it contains |, split by |, otherwise ,
    let rawUrls = [];
    if (imagesVal.includes('|')) {
        rawUrls = imagesVal.split('|');
    } else {
        // Fallback to comma, but be careful if comma is in URL (unlikely)
        rawUrls = imagesVal.split(',');
    }

    const processedImages = [];

    rawUrls.forEach(url => {
        const cleanUrl = url.trim();
        if (!cleanUrl) return;

        const imgFilename = path.basename(cleanUrl.split('?')[0]);
        let match = mediaFiles.find(f => f === imgFilename || decodeURIComponent(imgFilename) === f);

        if (match) {
            fs.copyFileSync(path.join(MEDIA_DIR, match), path.join(DEST_IMG_DIR, match));
            processedImages.push(`/images/products/${match}`);
        }
    });

    if (processedImages.length === 0) {
        processedImages.push('/images/products/placeholder.jpg'); // Fallback
    }

    validProducts.push({
        id: p['ID'],
        title: title,
        slug: slugify(title) + '-' + p['ID'],
        category: determineCategory(title, description),
        price: '$' + parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        images: processedImages, // Now an array
        image: processedImages[0], // Keep for backward compatibility mostly, or main image
        description: description.replace(/<[^>]*>/g, '').substring(0, 300) + '...'
    });
});

console.log(`Processed ${validProducts.length} valid products.`);

// Generate TS Content
const tsContent = `export interface Product {
    id: string;
    title: string;
    slug: string;
    category: 'dmso-liquido' | 'dmso-gel' | 'dmso-crema';
    price: string;
    image: string; // Helper for main image
    images: string[]; // Full gallery
    description?: string;
}

export const products: Product[] = ${JSON.stringify(validProducts, null, 4)};
`;

fs.writeFileSync(OUTPUT_FILE, tsContent);
console.log(`Successfully wrote to ${OUTPUT_FILE}`);
