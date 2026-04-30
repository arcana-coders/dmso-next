require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('Seeding categories...');
  
  const categories = [
    { slug: 'liquido', nombre: 'DMSO Líquido', descripcion: 'Soluciones de DMSO puro en diferentes concentraciones.' },
    { slug: 'gel', nombre: 'DMSO en Gel', descripcion: 'DMSO en formulación de gel para fácil aplicación tópica.' },
    { slug: 'crema', nombre: 'Cremas con DMSO', descripcion: 'Cremas hidratantes y terapéuticas enriquecidas con DMSO.' }
  ];

  for (const cat of categories) {
    try {
      await sql`
        INSERT INTO categorias (slug, nombre, descripcion)
        VALUES (${cat.slug}, ${cat.nombre}, ${cat.descripcion})
        ON CONFLICT (slug) DO NOTHING
      `;
      console.log(`Category ${cat.slug} seeded.`);
    } catch (err) {
      console.error(`Error seeding category ${cat.slug}:`, err);
    }
  }
}

seed().then(() => console.log('Done!'));
