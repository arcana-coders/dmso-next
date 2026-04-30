import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const categorias = pgTable('categorias', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  nombre: text('nombre').notNull(),
  descripcion: text('descripcion'),
  orden: integer('orden').default(0),
  activa: boolean('activa').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productos = pgTable('productos', {
  id: serial('id').primaryKey(),
  asin: text('asin').unique(),
  slug: text('slug').notNull().unique(),
  titulo: text('titulo').notNull(),
  descripcion: text('descripcion'),
  precio: decimal('precio', { precision: 10, scale: 2 }).notNull(),
  imagenes: jsonb('imagenes').default([]), // Array of image URLs
  categoriaId: integer('categoria_id').references(() => categorias.id),
  stock: integer('stock').default(0),
  activo: boolean('activo').default(true),
  destacado: boolean('destacado').default(false),
  detalles: jsonb('detalles').default({}),
  reviews: jsonb('reviews').default([]), // Array of review objects
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productosRelations = relations(productos, ({ one }) => ({
  categoria: one(categorias, {
    fields: [productos.categoriaId],
    references: [categorias.id],
  }),
}));

export const categoriasRelations = relations(categorias, ({ many }) => ({
  productos: many(productos),
}));

export const ordenes = pgTable('ordenes', {
  id: text('id').primaryKey(), // Formato: DMSO-123456
  paypalOrderId: text('paypal_order_id').unique(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  estado: text('estado').default('PENDING'), // PENDING, COMPLETED, CANCELLED
  cliente: jsonb('cliente').notNull(), // Nombre, email, telefono
  direccion: jsonb('direccion').notNull(),
  items: jsonb('items').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const contactos = pgTable('contactos', {
  id: serial('id').primaryKey(),
  nombre: text('nombre').notNull(),
  email: text('email').notNull(),
  telefono: text('telefono'),
  mensaje: text('mensaje').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const newsletter = pgTable('newsletter', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  activo: boolean('activo').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});
