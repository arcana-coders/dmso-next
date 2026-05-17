import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  console.log('Testing Resend with key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
  try {
    const data = await resend.emails.send({
      from: 'Sistema DMSO <pedidos@dmso.com.mx>',
      to: ['ryscarrillo@gmail.com'],
      subject: 'Prueba de Diagnóstico',
      html: '<strong>Si lees esto, Resend está funcionando correctamente en DMSO.</strong>'
    });
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
