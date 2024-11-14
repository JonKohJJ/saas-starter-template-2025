// npm i drizzle-orm postgres
// npm i -D drizzle-kit

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/data/env/server';
import * as schema from "./schema"

// Connecting with Supabase
const client = postgres(env.DATABASE_URL, { prepare: false })
export const db = drizzle({ client, schema });

// npx drizzle-kit generate
// npx drizzle-kit migrate
// npx drizzle-kit drop