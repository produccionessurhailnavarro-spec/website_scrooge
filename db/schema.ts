import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const requests = sqliteTable('school_requests', {
  id: text('id').primaryKey(),
  createdAt: text('created_at').notNull(),
  school: text('school').notNull(),
  contact: text('contact').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  performance: text('performance').notNull(),
  students: integer('students').notNull(),
  companions: integer('companions').notNull(),
  comments: text('comments').notNull(),
});
