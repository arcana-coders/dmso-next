import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

type Database = ReturnType<typeof drizzle<typeof schema>>;

let dbInstance: Database | null = null;

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured');
  }

  return databaseUrl;
}

function getDb() {
  if (!dbInstance) {
    dbInstance = drizzle({ client: neon(getDatabaseUrl()), schema });
  }

  return dbInstance;
}

export const db = new Proxy({} as Database, {
  get(_target, property) {
    const value = Reflect.get(getDb() as object, property);
    return typeof value === 'function' ? value.bind(getDb()) : value;
  },
});
